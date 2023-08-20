import React,{useEffect,useState} from 'react'
import { NavLink,useLocation } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'

import {changeSongsMsg} from '../../rudux/actions/songsMsg'
import { changePlayerState } from '../../rudux/actions/playerState'

import './index.css'


export default function SearchSongs() {

  const playerState = useSelector(state => state).playerState
  const {searchWords} = useLocation().state
  const [songsList,setSongsList] = useState(
    {
      result:{songCount:0,songs:[]}
    }
  )
  const [pageNav,setPageNav] = useState([])
  const [songsTime,setSongsTime] = useState([])

  const dispatch = useDispatch()

  useEffect(
    ()=>{
      axios.get(`/api1/cloudsearch?keywords=${searchWords}`).then(
        res => {
          setPageNav([])
          for(let i=0;i<res.data.result.songCount/30;i++){
            setPageNav(preValue => [...preValue,i+1])
          }
          setSongsList(res.data)
          
          let songsList = []
          let songsTimeList = []
          for(let i = 0 ; i < res.data.result.songs.length; i++) {
            songsList.push(res.data.result.songs[i].id)
          }
          axios.get(`/api1/song/detail?ids=${songsList.join(',')}`).then(
            res => {
              console.log(res);
              for(let i = 0; i < res.data.songs.length; i++) {
                songsTimeList.push(res.data.songs[i].dt)
              }
              setSongsTime(songsTimeList)
            },
            err => {console.log(err)}
          )
        },
        error => {
          alert('发送请求失败')
          console.log(error)}
      )
      if(playerState.ended) {
        for(let i = 0; i < songsList.result.songs.length;i++ ){
          if(songsList.result.songs[i].id === playerState.songId){
            if (i < songsList.result.songs.length-1) {
              axios.get(`/api1/song/url/v1?id=${songsList.result.songs[i+1].id}&level=exhigh`).then(
                res => {
                  dispatch(changeSongsMsg(res.data))
                  dispatch(changePlayerState({ended:false,songId:songsList.result.songs[i+1].id}))
                },
                err => {
                  console.log(err)
                }
              )
            }else{
              dispatch(changePlayerState({ended:false,songId:playerState.songId}))
            }
          }
        }
      }
    },
    [searchWords,playerState.ended] //eslint-disable-line react-hooks/exhaustive-deps
  )

  function toPage(value){
    return (
      () => {
        axios.get(`/api1/cloudsearch?keywords=${searchWords}&offset=${(value-1)*30}`).then(
          res => {
            setSongsList(res.data)
            let songsList = []
            let songsTimeList = []
            for(let i = 0 ; i < res.data.result.songs.length; i++) {
              songsList.push(res.data.result.songs[i].id)
            }
            axios.get(`/api1/song/detail?ids=${songsList.join(',')}`).then(
              res => {
                console.log(res);
                for(let i = 0; i < res.data.songs.length; i++) {
                  songsTimeList.push(res.data.songs[i].dt)
                }
                setSongsTime(songsTimeList)
              },
              err => {console.log(err)}
            )
          },
          error => {
            alert('发送请求失败')
            console.log(error)
          },
          error => {
            alert('发送请求失败')
            console.log(error)}
        )
      }
    )
  }

  const time  = 200
  let timeOut = null

  function oneClick(e) {
    clearTimeout(timeOut)
    timeOut = setTimeout(()=>{
      console.log('你单击的目标是',e)
    },time)
  }

  function doubleClick(id) {
    clearTimeout(timeOut)
    axios.get(`/api1/song/url/v1?id=${id}&level=exhigh`).then(
      res => {
        dispatch(changeSongsMsg(res.data))
      },
      err => {
        console.log(err)
      }
    )
  }
  return (
    <div className='searchSongs'>
        <h1>搜索 {searchWords}</h1>
        <ul className='nav'>
            <li> <NavLink to='/content'>单曲</NavLink> </li>
            <li> <NavLink to='/content'>歌手</NavLink> </li>
            <li> <NavLink to='/content'>专辑</NavLink> </li>
            <li> <NavLink to='/content'>视频</NavLink> </li>
            <li> <NavLink to='/content'>歌单</NavLink> </li>
            <li> <NavLink to='/content'>歌词</NavLink> </li>
            <li> <NavLink to='/content'>播客</NavLink> </li>
            <li> <NavLink to='/content'>声音</NavLink> </li>
            <li> <NavLink to='/content'>用户</NavLink> </li>
            <li>找到 {songsList.result.songCount}首单曲</li>
        </ul>
        <span className='playAll'><span className='iconfont'>&#xe600;</span> 播放全部<span className='iconfont'>&#xeaf3;</span></span>
        <span className='loadAll'><span className='iconfont'>&#xe72d;</span>下载全部</span>
        <table className='songsMsg'>
          <thead>
            <tr className='title'>
              <td>音乐标题</td>
              <td>歌手</td>
              <td>专辑</td>
              <td>时长</td>
              <td>热度</td>  
            </tr>
          </thead>

          <tbody>
            {
              songsList.result.songs.map(
                (songsObj,index)=>{
                  return (
                    <tr key={songsObj.id} onClick={(e)=>oneClick(e)} onDoubleClick={() => doubleClick(songsObj.id)}>
                      <td>{songsObj.name}</td>
                      <td>{songsObj.ar[0].name}{songsObj.ar[1]?'&'+songsObj.ar[1].name:''}</td>
                      <td>{songsObj.al.name}</td>
                      <td>{songsTime[index]?parseInt(songsTime[index]/1000/60)+':'+(parseInt(songsTime[index]/1000%60)<10?'0'+parseInt(songsTime[index]/1000%60):parseInt(songsTime[index]/1000%60)):'0:00'}</td>
                      <td>null</td>
                    </tr>
                  )
                }
              )
            }
          </tbody>
        </table>
        <div className='buttonList'>
          <button className='last'>{'<'}</button>
          {
            pageNav.map(
              (value)=>{
                return (
                <button key={value} onClick={toPage(value)}>{value}</button>
                )
              }
            )
          }
          <button className='next'>{'>'}</button>
        </div>

    </div>
  ) 
}

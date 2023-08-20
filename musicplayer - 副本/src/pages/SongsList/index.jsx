import axios from 'axios';
import React,{useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

import { changeSongsMsg } from '../../rudux/actions/songsMsg'
import {changePlayerState} from '../../rudux/actions/playerState'
import './index.css'

export default function SongsList() {

  const songsListMsg = useLocation().state
  const [songsListSongsMsg,setSongsListSongsMsg] = useState({songs:[]})
  const [pageNav,setPageNav] = useState([])
  const [songsTime,setSongsTime] = useState([])
  const playerState = useSelector(state => state).playerState


  useEffect(
    ()=>{
      axios.get(`/api1/playlist/track/all?id=${songsListMsg.id}`).then(
        res => {
          setPageNav([])
          for(let i=0;i<res.data.songs.length/20;i++){
            setPageNav(preValue => [...preValue,i+1])
          }
        }
      ).catch(
        err => console.log(err)
      )

      axios.get(`/api1/playlist/track/all?id=${songsListMsg.id}&limit=20`).then(
        res => {
          setSongsListSongsMsg(res.data)
          let songsList = []
          let songsTimeList = []
          for(let i = 0 ; i < res.data.songs.length; i++) {
            songsList.push(res.data.songs[i].id)
          }
          axios.get(`/api1/song/detail?ids=${songsList.join(',')}`).then(
            res => {
              for(let i = 0; i < res.data.songs.length; i++) {
                songsTimeList.push(res.data.songs[i].dt)
              }
              setSongsTime(songsTimeList)
            },
            err => {console.log(err)}
          )
        }
      ).catch(
        err => console.log(err)
      )

      if(playerState.ended) {
        for(let i = 0; i < songsListSongsMsg.songs.length;i++ ){
          if(songsListSongsMsg.songs[i].id === playerState.songId){
            if (i < songsListSongsMsg.songs.length-1) {
              axios.get(`/api1/song/url/v1?id=${songsListSongsMsg.songs[i+1].id}&level=exhigh`).then(
                res => {
                  dispatch(changeSongsMsg(res.data))
                  dispatch(changePlayerState({ended:false,songId:songsListSongsMsg.songs[i+1].id}))
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
      
    },[songsListMsg.id,playerState.ended] //eslint-disable-line react-hooks/exhaustive-deps
  )

  function toPage(value){
    return (
      () => {
        axios.get(`/api1/playlist/track/all?id=${songsListMsg.id}&limit=20&offset=${(value-1)*20}`).then(
          res => {
            setSongsListSongsMsg(res.data)
            let songsList = []
            let songsTimeList = []
            for(let i = 0 ; i < res.data.songs.length; i++) {
              songsList.push(res.data.songs[i].id)
            }
            axios.get(`/api1/song/detail?ids=${songsList.join(',')}`).then(
              res => {
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
      }
    )
  }

  const time  = 200
  let timeOut = null
  const dispatch = useDispatch()

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
        return res.data
      },
      err => {
        console.log(err)
        return err
      }
    )
  }

  return (
    <div className='songsList'>
        <div className="head">
            <img className='songsListCover' src={songsListMsg.coverImgUrl} alt="" />

            <div className='songsListMsg'>
              <span className='songsListName'>歌单</span> <h1>{songsListMsg.name}</h1>
              <br />
              <img className='authorHeadPic' src={songsListMsg.creator.avatarUrl} alt="" /> <span className='authorName'>{songsListMsg.creator.nickname}</span>
              <br />
              <button className='playButton'>播放全部</button> <button>{`已收藏(${songsListMsg.subscribed?songsListMsg.subscribed:0})`}</button> <button>分享</button> <button>下载全部</button>
              <br />
              <span className='songsListLabel'>标签：{songsListMsg.tags}</span>
              <br />
              <span>歌曲：{songsListMsg.trackCount}</span> <span>播放：{songsListMsg.playCount}</span>
              <br />
              <span className='songsSynopsis'>简介：{songsListMsg.description}</span>
            </div>
        </div>

        <div className="nav">
            <span>歌曲列表</span> <span>评论(129)</span> <span>收藏者</span>
            <input type="text" placeholder='搜索歌单音乐' /><span className='iconfont'></span>
        </div>

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
              songsListSongsMsg.songs.map(
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

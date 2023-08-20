import React,{useEffect,useState} from 'react'
import {NavLink,Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from '../../../api'

import './index.css'



export default function Body() {

  const userMsg = useSelector(state => state )

  let [playList,setPlayList] = useState([])

  useEffect(
    ()=>{
      if(userMsg.userMsg.userId) {
        axios.get(`/api1/user/playlist?uid=${userMsg.userMsg.userId}`).then(
            res => {
                setPlayList(res.data.playlist)
            }
        ).catch(
            err => console.log(err)
        )
      }
    },[userMsg.userMsg.userId]
  )

  return (
    <div className='Body'>
        <div className="navList">
            <ul className='bigNav'>
                <li><NavLink to='/content/findMusic'><h3>发现音乐</h3></NavLink></li>
                <li><NavLink to='/index'>播客</NavLink></li>
                <li><NavLink to='/index'>关注</NavLink></li>
                <li><NavLink to='/index'>直播</NavLink></li>
                <li><NavLink to='/index'>私人FM</NavLink></li>
            </ul>
            <ul className='myMusic'>
                <li><NavLink to='/content/findMusic'><h3>我的音乐</h3></NavLink></li>
                <li><NavLink to='/index'>本地与下载</NavLink></li>
                <li><NavLink to='/index'>最近播放</NavLink></li>
                <li><NavLink to='/index'>我的音乐云盘</NavLink></li>
                <li><NavLink to='/index'>我的播客</NavLink></li>
                <li><NavLink to='/index'>我的收藏</NavLink></li>
            </ul>
            <ul className='myLoveMusic'>
                <li><NavLink to='/content/findMusic'><h3><span className='iconfont'>&#xeca1;</span> 创建的歌单<span className='iconfont'>&#xe771;</span></h3></NavLink></li>
                {
                    playList.filter(
                        (playListObj) => {
                            return playListObj.creator.userId === userMsg.userMsg.userId
                        }
                    ).map(
                        (playListObj)=>{
                            return <li key={playListObj.id}><NavLink to={`/content/songsList/songsMsg`} state={playListObj} >{playListObj.name}</NavLink></li>
                        }
                    )
                }
            </ul>

            <ul className='myLoveMusic'>
                <li><NavLink to='/content/findMusic'><h3><span className='iconfont'>&#xeca1;</span> 收藏的歌单<span className='iconfont'>&#xe771;</span></h3></NavLink></li>
                {
                    playList.filter(
                        (playListObj) => {
                            return playListObj.creator.userId !== userMsg.userMsg.userId
                        }
                    ).map(
                        (playListObj)=>{
                            return <li key={playListObj.id}><NavLink to={`/content/songsList/songsMsg`} state={playListObj} >{playListObj.name}</NavLink></li>
                        }
                    )
                }
            </ul>
        </div>
        <div className="showPart">
            <Outlet />
        </div>
    </div>
  )
}

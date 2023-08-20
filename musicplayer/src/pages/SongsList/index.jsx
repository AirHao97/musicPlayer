import axios from '../../api';
import React,{useEffect,useState} from 'react'
import {NavLink, useLocation,Outlet} from 'react-router-dom'
import './index.css'

export default function SongsList() {

  const songsListMsg = useLocation().state
  const [songsListDiscuss,setSongsListDiscuss] = useState({total:0})

  useEffect(
    ()=>{
      axios.get(`/api1/comment/playlist?id=${songsListMsg.id}`).then(
        res => {
          setSongsListDiscuss(res.data)
        }
      ).catch(
        err => console.log(err)
      )
    },[songsListMsg.id] //eslint-disable-line react-hooks/exhaustive-deps
  )


  return (
    <div className='songsList'>
        <div className="head">
            <img className='songsListCover' src={songsListMsg.coverImgUrl} alt="" />

            <div className='songsListMsg'>
              <span className='songsListName'>歌单</span> <h1>{songsListMsg.name}</h1>
              <br />
              <img className='authorHeadPic' src={songsListMsg.creator.avatarUrl} alt="" /> <span className='authorName'>{songsListMsg.creator.nickname}</span>
              <br />
              <button className='playButton'>播放全部</button> <button>{`已收藏(${songsListMsg.subscribedCount?songsListMsg.subscribedCount:0})`}</button> <button>分享</button> <button>下载全部</button>
              <br />
              <span className='songsListLabel'>标签：{songsListMsg.tags}</span>
              <br />
              <span>歌曲：{songsListMsg.trackCount}</span> <span>播放：{songsListMsg.playCount}</span>
              <br />
              <span className='songsSynopsis'>简介：{songsListMsg.description}</span>
            </div>
        </div>

        <div className="nav">
            <NavLink to='/content/songsList/songsMsg' state={songsListMsg}>歌曲列表</NavLink> 
            <NavLink to='/content/songsList/discuss' state={songsListMsg} >评论({songsListDiscuss.total})</NavLink> 
            <NavLink to='/content/collector'>收藏者</NavLink>
            <input type="text" placeholder='搜索歌单音乐' /><span className='iconfont'></span>
        </div>

        <Outlet />
    </div>
  )
}

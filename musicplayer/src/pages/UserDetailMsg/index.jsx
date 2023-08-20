import React,{ useEffect,useState } from 'react'
import axios from '../../api'
import {useSelector} from 'react-redux'
import {NavLink,Outlet} from 'react-router-dom'

import './index.css'



export default function UserDetailMsg() {
  
    const store = useSelector(state=>state)
    const [mySongsList,setMySongsList] = useState([]) 
    console.log(store);

    useEffect(
        ()=>{
            if(store.userMsg.userId){ 
                axios.get(`/api1/user/playlist?uid=${store.userMsg.userId}`).then(
                    res => {
                        console.log(res);
                        setMySongsList(res.data.playlist)
                    },
                    err => {console.log(err)}
                )
            }
        },
        [store.userMsg.userId] //eslint-disable-line react-hooks/exhaustive-deps
    )
  
    return (
    <div className='userDetailMsg'>

        <div className='userMsgShow'>
            <img src={store.userMsg.avatarUrl} alt="" />

            <div className='wordMsg'>
                <h2>{store.userMsg.nickname}</h2>
                <hr />
                <ul>
                    <li><span className='number'>4</span> <br /> <span className='label'>动态</span></li>
                    <li><span className='number'>5</span> <br /> <span className='label'>关注</span></li>
                    <li><span className='number'>8</span> <br /> <span className='label'>粉丝</span></li>
                </ul>
                <span>所在地区：省份代码&lt;{store.userMsg.province}&gt; 市区代码：&lt;{store.userMsg.city}&gt;</span>
                <br />
                <span>社交网络：微博</span>
                <br />
                <span>个人介绍： {store.userMsg.signature}</span>
                <br />
                <span>上次登录ip地址：{store.userMsg.lastLoginIP}</span>
            </div>
        </div>

        <ul className='nav'>
            <li><NavLink to='./myMusicList' state={mySongsList}>创建的歌单</NavLink></li>
            <li><NavLink to='./myCollectMusicList' state={mySongsList}>收藏的歌单</NavLink></li>
        </ul>

        <Outlet />
        
    </div>
  )
}

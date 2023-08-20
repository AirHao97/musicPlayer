/* import {useState} from 'react' */
import axios from '../../api'
import {useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import './index.css'


export default function FindMusic() {

  useEffect(
    ()=>{
      axios.get(`/api1/`).then(
        res => console.log(res)
      ).catch(
        err => console.log(err)
      )
    },[]
  )

  return (
    <div className='findMusic'>
      <ul className='titleNav'>
        <li><NavLink to='/findMusic/recommendation'>个性推荐</NavLink></li>
        <li><NavLink to='/findMusic/recommendation'>专属定制</NavLink></li>
        <li><NavLink to='/findMusic/recommendation'>歌单</NavLink></li>
        <li><NavLink to='/findMusic/recommendation'>排行榜</NavLink></li>
        <li><NavLink to='/findMusic/recommendation'>歌手</NavLink></li>
        <li><NavLink to='/findMusic/recommendation'>最新音乐</NavLink></li>
      </ul>
      <div className='showPic'>
        <img src={process.env.PUBLIC_URL + '/pic.jpg'} alt="轮播图" />
      </div>
      <div className='recommendPlayList'>
        <h2>推荐歌单 <span className='iconfont'>&#xe625;</span></h2>
        <ul className='picNav'>
          <li>
            <img src={process.env.PUBLIC_URL + '/pic.jpg'} alt="" />
            <br />
            <NavLink to='/findMusic/recommendation'>每日歌曲推荐</NavLink>
          </li>
          <li>
            <img src={process.env.PUBLIC_URL + '/pic.jpg'} alt="" />
            <br />
            <NavLink to='/findMusic/recommendation'>每日歌曲推荐</NavLink>
          </li>
          <li>
            <img src={process.env.PUBLIC_URL + '/pic.jpg'} alt="" />
            <br />
            <NavLink to='/findMusic/recommendation'>每日歌曲推荐</NavLink>
          </li>
          <li>
            <img src={process.env.PUBLIC_URL + '/pic.jpg'} alt="" />
            <br />
            <NavLink to='/findMusic/recommendation'>每日歌曲推荐</NavLink>
          </li>
          <li>
            <img src={process.env.PUBLIC_URL + '/pic.jpg'} alt="" />
            <br />
            <NavLink to='/findMusic/recommendation'>每日歌曲推荐</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

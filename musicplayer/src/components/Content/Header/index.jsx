import React,{useRef,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import axios from '../../../api'
import { useNavigate } from 'react-router-dom'

import {changeMsg} from '../../../redux/actions/userMsg'
import {changeLoginStatus} from '../../../redux/actions/loginStatus'
import './index.css'

export default function Header() {

  const searchWordsNode = useRef()
  const store = useSelector(state => state)
  const {nickname,avatarUrl} = store.userMsg
  const navigate = useNavigate()

  function searchSongs(e) {
    if(e.key === 'Enter') {
      const searchWords = searchWordsNode.current.value
      navigate(
        '/content/searchSongs',
        {
          replace:false,
          state:{
            searchWords
          }
        }
      )
    }
  }

  function toSetting() {
    navigate(
      './setting',
      {
        replace:false,
        state:{}
      }
    )
  }

  function toUserDetailMsg() {
    navigate(
      '/content/userDetailMsg',
      {
        replace:false,
        state:{}
      }
    )
  }

  const dispatch = useDispatch()

  useEffect(
    ()=>{
      axios.get('/api1/user/account').then(
      res => {
        dispatch(changeMsg(res.data.profile))
        dispatch(changeLoginStatus({id:res.data.account.id}))
      },
      err => console.log(err)
      )
    },[dispatch]
  )

  return (
    <div className='header'>
        <span className='logoPart'><img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" /></span>
        <span className='searchPart'>
            <span className='iconfont'>&#xe601;</span>
            <span className='iconfont'>&#xe600;</span>
            <input ref={searchWordsNode} onKeyUp={(e)=>searchSongs(e)} type="text" placeholder='法老 最近很火哦'/>
            <span className='iconfont'>&#xe71d;</span>
        </span>
        <span className='userMessage'>
            <span className='headPic'>
              <img onClick={toUserDetailMsg} src={avatarUrl} alt="头像" />
            </span>
            &nbsp;&nbsp;
            <span onClick={toUserDetailMsg} className='name'>{nickname}</span>
            &nbsp;&nbsp;
            <span className='vipGrede'>等级</span>
            <span className='iconfont'>&#xe771;</span>
            &nbsp;&nbsp;
            <span className='iconfont'>&#xe8c7;</span>
            &nbsp;&nbsp;
            <span className='iconfont' onClick={toSetting}>&#xe62a;</span>
            &nbsp;&nbsp;
            <span className='iconfont'>&#xe647;</span>
        </span>
        <span className="controlPart">
            <span className='iconfont'>&#xe60a;</span>
            &nbsp;&nbsp;&nbsp;
            <span className='iconfont'>&#xea98;</span>
            &nbsp;&nbsp;&nbsp;
            <span className='iconfont'>&#xe60e;</span>
        </span>
    </div>
  )
}

Header.defaultProps = {
  nickname:'未登录',
  avatarUrl:`${process.env.PUBLIC_URL}/pic.jpg`
}



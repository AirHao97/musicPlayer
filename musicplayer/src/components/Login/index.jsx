import axios from '../../api'
import React, {useRef,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Outlet} from 'react-router-dom'

import './index.css'

export default function Login() {
  const navigate = useNavigate()
  const select = useRef()
  const [selectValue,setSelectValue] = useState('网易云音乐')

  function qrLogin() {
    navigate(
      '/login/qrLogin',
      {
        replace:false,
        state:{}
      }
    )
  }

  function passwordLogin() {
    navigate(
      '/login/passwordLogin',
      {
        replace:false,
        state:{}
      }
    )
  }

  function verificationcodeLogin() {
    navigate(
      '/login/verificationcodeLogin',
      {
        replace:false,
        state:{}
      }
    )
  }

  function touristsLogin() {
    axios.get('/api1/register/anonimous').then(
      res => {
        console.log(res)
        /* console.log('cookie:',res.data.cookie) */
        navigate(
          '/content/findMusic',
          {
            replace:false,
            state:{}
          }
        )
      },
      err => {console.log(err);}
    )
  }

  function changeTitle() {
    setSelectValue(select.current.value)
  }

  return (
    <div className='login'>
      <h2>{selectValue} 账号登录</h2>
      <div className="loginWay">
        <button onClick={passwordLogin}>账号登录</button>
        <button onClick={verificationcodeLogin}>验证码登录</button>
        <button onClick={qrLogin}>二维码登录</button>
        <button onClick={touristsLogin}>游客登录</button>
        <select ref={select} onChange={changeTitle}>
          <option value="网易云音乐">网易云音乐</option>
          <option value="酷狗音乐">酷狗音乐</option>
        </select>
      </div>
      <Outlet />
      <div className='bearMove'>
        <div className='bear'></div>
        <div className='whiteHill'></div>
        <div className='blackHill'></div>
      </div>
    </div>
  )
}

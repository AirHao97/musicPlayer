import React,{useRef} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {changeMsg} from '../../rudux/actions/userMsg' 
import {changeLoginStatus} from '../../rudux/actions/loginStatus'

import './index.css'

export default function Login() {
  axios.defaults.withCredentials = true
  /* const baseUrl = 'http://localhost:3000' */
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const phoneNumber = useRef()
  const passWord = useRef()

  function loginIn() {
    if ((phoneNumber.current.value==='')||(passWord.current.value==='')) {
      alert('账号密码不能为空')
      return 0
    }
    axios.get(`/api1/login/cellphone?phone=${phoneNumber.current.value}&password=${passWord.current.value}`).then(
      response => {
        /* const {nickname,signature,avatarUrl,backgroundUrl,birthday,playlistCount,follows,followeds} = response.data.profile */
        console.log(response)
        const userMsg = response.data.profile
        if (response.data.code !== 200) {
          response.data.msg?alert(response.data.msg):alert(`登录失败,错误${response.data.code}`)
          return 0
        }
        alert('登录成功!')
        dispatch(changeMsg(userMsg))

        axios.get('/api1/login/status').then(
          res => {
            if(res.data.profile.userId){
              dispatch(changeLoginStatus(true))
            }
          },
          err => {console.log(err)}
        )
        
        navigate(
          '/content',
          {
            replace:false,
            state:{}
          }
        )

      },
      error => {console.log('发送失败，失败结果为',error)})
  }

  return (
    <div className='login'>

      <h2>账号登录</h2>

      <div className="userMsg">
        手机号：<input ref={phoneNumber} type="text" placeholder='请输入你的手机号码'/>
        <br />
        密码：<input ref={passWord} type="password" placeholder='请输入你的密码' />
      </div>

      <div className="loginWay">
        <button>手机登录</button>
        <button>邮箱登录</button>
        <button>二维码登录</button>
        <select >
          <option value="网易云音乐">网易云音乐</option>
          <option value="网易云音乐">酷狗音乐</option>
        </select>
      </div>

      <div className="loginIn">
        <button onClick={loginIn} >登录</button> &nbsp; &nbsp; 
        <button>注册</button>
      </div>
    </div>
  )
}

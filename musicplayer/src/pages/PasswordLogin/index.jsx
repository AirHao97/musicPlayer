import React,{useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import axios from '../../api'
import {changeMsg} from '../../redux/actions/userMsg' 
import {changeLoginStatus} from '../../redux/actions/loginStatus'


import './index.css'

export default function PasswordLogin() {
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
              console.log(res);
              if(res.data.profile.userId){
                dispatch(changeLoginStatus({state:true}))
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
        <div>
            <div className="passwordLogin">
                手机号：<input ref={phoneNumber} type="text" placeholder='请输入你的手机号码'/>
                <br />
                密&nbsp;&nbsp;&nbsp;码：<input ref={passWord} type="password" placeholder='请输入你的密码' />
            </div>
            <div className="loginIn">
                <button onClick={loginIn} >登录</button> &nbsp; &nbsp; 
                <button>注册</button>
            </div>
        </div>
    )
}

import React,{useRef} from 'react'
import axios from '../../api'
import { useNavigate } from 'react-router-dom'

import './index.css'

export default function VerificationcodeLogin() {

  const phoneNumber = useRef()
  const verificationcode = useRef()
  const navigate = useNavigate()

  function loginIn() {
    if(phoneNumber.current.value){
      if(verificationcode.current.value){
        axios.get(`/api1/captcha/verify?phone=${phoneNumber.current.value}&captcha=${verificationcode.current.value}`).then(
          res =>{
            console.log(res)
            if (res.data.data) {
              alert('登录成功！')
              navigate(
                '/content/findMusic',
                {
                  replace:false,
                  state:{}
                }
              )
            }else {
              alert(res.data.msg)
            }
          },
          err => {console.log(err)}
        )
      }
    }else {
      alert('手机号不能为空！')
    }
  }

  function getVerificationcode() {
    if(phoneNumber.current.value) {
      axios.get(`/api1/captcha/sent?phone=${phoneNumber.current.value}`).then(
        res => {
          console.log(res)
          alert('发送成功！')
        },
        err => {console.log(err)}
      )
    }else {
      alert('手机号不能为空!')
    }
  }

  return (
    <div className='verificationcodeLogin'>
      手机号：<input ref={phoneNumber} type="text"  placeholder='请输入你的手机号码'/>
      <br />
      验证码：<input ref={verificationcode} type="text" placeholder='请输入验证码' />
      <br />
      <button onClick={getVerificationcode}>获取验证码</button> <button onClick={loginIn}>立即登录</button>
    </div>
  )
}

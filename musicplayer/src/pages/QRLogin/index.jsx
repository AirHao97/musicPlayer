import axios from '../../api'
import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'

import './index.css'

export default function QRLogin() {

  const [rqId,setRqId]  = useState('')
  const [rqPicBase64,setRqPicBase64] = useState('')
  const [cookie,setCookie] = useState('')
  const navigate = useNavigate()
  const time = new Date()

  useEffect(
    ()=>{
        axios.get(`/api1/login/qr/key?time=${time}`).then(
            (res) => {
                console.log(res.data.data.unikey);
                setRqId(res.data.data.unikey)
                axios.get(`/api1/login/qr/create?key=${res.data.data.unikey}&qrimg=true&?time=${time}`).then(
                    res => {
                        console.log(res)
                        setRqPicBase64(res.data.data.qrimg)
                    },
                    err => {console.log(err)}
                )
            },
            (err) => {console.log(err);}
        )
    },
    []  // eslint-disable-line react-hooks/exhaustive-deps
  )

  function isLogin() {
    axios.get(`/api1/login/qr/check?key=${rqId}&time=${time}`).then(
        res => {
            console.log(res);
            if(res.data.code === 801) {
                alert('二维码尚未过期，请及时扫码')
            } else if (res.data.code === 800) {
                alert('二维码已经过期，正在更新新码...')
                axios.get(`/api1/login/qr/key&time=${time}`).then(
                    (res) => {
                        console.log(res.data.data.unikey);
                        setRqId(res.data.data.unikey)
                        axios.get(`/api1/login/qr/create?key=${res.data.data.unikey}&qrimg=true&time=${time}`).then(
                            res => {
                                console.log(res)
                                setRqPicBase64(res.data.data.qrimg)
                            },
                            err => {console.log(err)}
                        )
                    },
                    (err) => {console.log(err);}
                )
            } else if (res.data.code === 802) {
                alert('扫码成功，请及时确认')
            }else if (res.data.code === 803) {
                alert('扫码成功！')
                console.log(res)
                setCookie(res.data.cookie)
                console.log(cookie)
                navigate(
                    '/content/findMusic',
                    {
                        replace:false,
                        state:{}
                    }
                )

            }
        }, 
        err => {console.log(err)}
    )
  }

  return (
    <div className='qrLoginIn'>
        <img src={rqPicBase64} alt="" />
        <br />
        <button onClick={isLogin}>我已扫码</button>
    </div>
  )
}

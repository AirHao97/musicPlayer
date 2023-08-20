import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import axios from '../../api'

import './index.css'


export default function SongsDiscuss() {

  const songsListMsg = useLocation().state
  const [fantasticDiscuss,setFantasticDiscuss] = useState([])
  const [commonDiscuss,setCommonDiscuss] = useState([])

  const [page,setPage] = useState([])

  function toPage(pageNumber) {
    return () => {
      axios.get(`/api1/comment/playlist?id=${songsListMsg.id}&offset=${(pageNumber-1)*20}`).then(
        res => {
          setCommonDiscuss(res.data.comments)
        }
      ).catch(
        err => console.log(err)
      )
    }
  }

  useEffect(
    ()=>{
      axios.get(`/api1/comment/playlist?id=${songsListMsg.id}`).then(
        res => {
          setFantasticDiscuss(res.data.hotComments)
          setCommonDiscuss(res.data.comments)
          let item = []
          for(let i = 1 ; i <= ((res.data.total)%20?(res.data.total/20):(res.data.total/20 + 1)); i++){
            item.push(i)
          }
          setPage(item)
        }
      ).catch(
        err => console.log(err)
      )
    },[songsListMsg.id] //eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div className='discuss'>
        <div className='getDiscuss'>
            <textarea cols="110" rows="5"></textarea>
            <br />
            <span className="iconfont"></span>
            <span className="iconfont"></span>
            <span className="iconfont"></span>
            <button>评论</button>
        </div>

        <div className="fantasticDiscuss">
            <h3>精彩评论</h3>
            {fantasticDiscuss.map(
              (item) => {
                return (
                  <div key={item.commentId} className='discussItem'>
                    <img src={item.user.avatarUrl} alt="" />
                    <div className='discussContentMsg'>
                      <span className='name'>{item.user.nickname}：<span className='discusserContent'>{item.content}</span></span>
                      <div className="discussLikes">
                        <span className='discussTime'>{new Date(item.time).toLocaleString()}</span>
                        <div className='iconPart'>
                          <span className="iconfont"></span><span>{item.likedCount}</span>
                          <span className="iconfont"></span>
                          <span className="iconfont"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            )}
        </div>

        <div className="commonDiscuss">
            <h3>最新评论</h3>
                {commonDiscuss.map(
                  (item) => {
                    return (
                      <div key={item.commentId} className='discussItem'>
                        <img src={item.user.avatarUrl} alt="" />
                        <div className='discussContentMsg'>
                        <span className='name'>{item.user.nickname}：<span className='discusserContent'>{item.content}</span></span>
                          <div className="discussLikes">
                            <span className='discussTime'>{new Date(item.time).toLocaleString()}</span>
                            <div className='iconPart'>
                              <span className="iconfont"></span><span>{item.likedCount}</span>
                              <span className="iconfont"></span>
                              <span className="iconfont"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                )}
        </div>

        <div className='pageButton'>
          <button>&lt;</button>
          {page.map(
                (item) => {
                  return <button onClick={toPage(item)} key={item}>{item}</button>
                }
              )}
          <button>&gt;</button>
        </div>
    
    </div>
  )
}

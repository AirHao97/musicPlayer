import axios from '../../../api'
import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { changeSongsMsg } from '../../../redux/actions/songsMsg'


import './index.css'


export default function Foot() {

  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const { songsMsg } = store
  const songsPlayer = useRef({ current: { currentTime: '0:00', ended: false } })
  const [playedTime, setPlayedTime] = useState('0:00')

  let timer = null

  function playOrPause() {
    if (songsPlayer.current.paused) {
      songsPlayer.current.play()
      timer = setInterval(
        () => { setPlayedTime(songsPlayer.current.currentTime) }, 1000
      )
    } else {
      songsPlayer.current.pause()
      clearInterval(timer)
    }
  }

  /* console.log(store); */

  const [songsAuthorNameAndPic, setSongsAuthorNameAndPic] = useState({ al: { picUrl: process.env.PUBLIC_URL + '/pic.jpg' }, ar: [{ name: '作者名' }], name: '歌名' })

  let timer2 = null

  useEffect(
    () => {
      if (songsMsg.data[0].id !== 123456) {
        axios.get(`/api1/song/detail?ids=${songsMsg.data[0].id}`).then(
          res => {
            setSongsAuthorNameAndPic(res.data.songs[0])
            playOrPause()
          }
        ).catch(
          err => { console.log(err) }
        )
        clearInterval(timer2)
      }
      return () => {
        clearInterval(timer2)
        clearInterval(timer)
      }
    }, [songsMsg.data]// eslint-disable-line react-hooks/exhaustive-deps
  )

  function playLastSong() {
    for (let i = 0; i < songsMsg.willPlayedList.length; i++) {
      if (songsMsg.data[0].id === songsMsg.willPlayedList[i].id) {
        if (i !== 0) {
          axios.get(`/api1/song/url/v1?id=${songsMsg.willPlayedList[i - 1].id}&level=exhigh`).then(
            res => {
              dispatch(changeSongsMsg(res.data))
              return res.data
            },
            err => {
              console.log(err)
              return err
            }
          )
          break
        } else {
          alert('这才是第一首歌，亲')
        }
      }
    }
  }

  function playNextSong() {
    for (let i = 0; i < songsMsg.willPlayedList.length; i++) {
      if (songsMsg.data[0].id === songsMsg.willPlayedList[i].id) {
        if (i !== songsMsg.willPlayedList.length - 1) {
          axios.get(`/api1/song/url/v1?id=${songsMsg.willPlayedList[i + 1].id}&level=exhigh`).then(
            res => {
              dispatch(changeSongsMsg(res.data))
              return res.data
            },
            err => {
              console.log(err)
              return err
            }
          )
          break
        } else {
          alert('已经是最后一首了')
        }
      }
    }
  }

  function playRandomSong() {
    //
  }



  return (
    <div className='foot'>
      <div className='nowPlayPicAndMsg'>
        <img src={songsAuthorNameAndPic.al.picUrl} alt='' />
        <div className='songsMsg'>
          <span>{songsAuthorNameAndPic.name}</span>
          <br />
          <span>{songsAuthorNameAndPic.ar[1] ? songsAuthorNameAndPic.ar[0].name + '&' + songsAuthorNameAndPic.ar[1].name : songsAuthorNameAndPic.ar[0].name}</span>
        </div>
      </div>

      <div className='contorlPart2'>
        <span className='iconfont'>&#xe8b8;</span>
        <span className='iconfont'>&#xe6b0;</span>
        <span className='iconfont'>&#xe602;</span>
      </div>

      <div className='contorlPart'>
        <div>
          <button onClick={playRandomSong} className='iconfont'>&#xe603;</button>
          <button onClick={playLastSong} className='iconfont'>&#xe722;</button>
          <button onClick={playOrPause} className='iconfont'>&#xea98;</button>
          <button onClick={playNextSong} className='iconfont'>&#xe72a;</button>
        </div>

        <div>
          <span>{playedTime === '0:00' ? '0:00' : `${parseInt(playedTime / 60)}:${parseInt(playedTime % 60) < 10 ? '0' + parseInt(playedTime % 60) : parseInt(playedTime % 60)}`}</span>
          <span className='progressBar'></span>
          <span>{songsMsg.data[0].time === '0:00' ? '0:00' : `${parseInt(songsMsg.data[0].time / 1000 / 60)}:${parseInt(songsMsg.data[0].time / 1000 % 60) < 10 ? '0' + parseInt(songsMsg.data[0].time / 1000 % 60) : parseInt(songsMsg.data[0].time / 1000 % 60)}`}</span>
        </div>
      </div>

      <div className='player'>
        <audio onEnded={playNextSong} ref={songsPlayer} src={songsMsg.data[0].url} controls></audio>
      </div>
    </div>
  )
}

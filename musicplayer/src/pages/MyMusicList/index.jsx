import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

import './index.css'

export default function MyMusicList() {

  const mySongsList = useLocation().state
  const store = useSelector(state=>state)
  const navigate = useNavigate()

  function toSongsList(j){
    return () => {
        navigate(
            `/content/songsList?id=${j.id}`,
            {
                replace:false,
                state:j
            }
        )
    }
  }
    
  return (
    <div className='songsLists'>
        {mySongsList.filter(
            (i)=>{
                return i.userId === store.userMsg.userId
            }
        ).map(
            (j) => {
                return (
                    <div onClick={toSongsList(j)} key={j.id} className='mysongsList'>
                        <img src={j.coverImgUrl} alt="" />
                        <br />
                        <span className='songsName'>{j.name}</span>
                        <br />
                        <span>{j.trackCount}首</span>
                    </div>
                )
            }
        )
        }
    </div>
  )
}

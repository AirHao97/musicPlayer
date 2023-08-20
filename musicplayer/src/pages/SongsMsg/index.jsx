import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { changeSongsMsg } from '../../redux/actions/songsMsg'
import { useDispatch } from 'react-redux'
import axios from '../../api'

import './index.css'

export default function SongsMsg() {

    const songsListMsg = useLocation().state
    const [songsListSongsMsg, setSongsListSongsMsg] = useState({ songs: [] })
    const [pageNav, setPageNav] = useState([])
    const [songsTime, setSongsTime] = useState([])

    useEffect(
        () => {
            axios.get(`/api1/playlist/track/all?id=${songsListMsg.id}`).then(
                res => {
                    setPageNav([])
                    for (let i = 0; i < res.data.songs.length / 20; i++) {
                        setPageNav(preValue => [...preValue, i + 1])
                    }
                }
            ).catch(
                err => console.log(err)
            )

            axios.get(`/api1/playlist/track/all?id=${songsListMsg.id}&limit=20`).then(
                res => {
                    setSongsListSongsMsg(res.data)

                    let songsList = []
                    let songsTimeList = []
                    
                    for (let i = 0; i < res.data.songs.length; i++) {
                        songsList.push(res.data.songs[i].id)
                    }
                    axios.get(`/api1/song/detail?ids=${songsList.join(',')}`).then(
                        res => {
                            for (let i = 0; i < res.data.songs.length; i++) {
                                songsTimeList.push(res.data.songs[i].dt)
                            }
                            setSongsTime(songsTimeList)
                        },
                        err => { console.log(err) }
                    )
                }
            ).catch(
                err => console.log(err)
            )
        },
        [songsListMsg.id] //eslint-disable-line react-hooks/exhaustive-deps
    )

    function toPage(value) {
        return (
            () => {
                axios.get(`/api1/playlist/track/all?id=${songsListMsg.id}&limit=20&offset=${(value - 1) * 20}`).then(
                    res => {
                        setSongsListSongsMsg(res.data)
                        let songsList = []
                        let songsTimeList = []
                        for (let i = 0; i < res.data.songs.length; i++) {
                            songsList.push(res.data.songs[i].id)
                        }
                        axios.get(`/api1/song/detail?ids=${songsList.join(',')}`).then(
                            res => {
                                for (let i = 0; i < res.data.songs.length; i++) {
                                    songsTimeList.push(res.data.songs[i].dt)
                                }
                                setSongsTime(songsTimeList)
                            },
                            err => { console.log(err) }
                        )
                    },
                    error => {
                        alert('发送请求失败')
                        console.log(error)
                    }
                )
            }
        )
    }

    const time = 200
    let timeOut = null
    const dispatch = useDispatch()

    function oneClick(e) {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            console.log('你单击的目标是',e)
        }, time)
    }

    function doubleClick(id) {
        clearTimeout(timeOut)
        
        axios.get(`/api1/playlist/track/all?id=${songsListMsg.id}`).then(
            res => {
                dispatch(changeSongsMsg({willPlayedList:res.data.songs}))
            },
            err => { console.log(err) }
        )

        axios.get(`/api1/song/url/v1?id=${id}&level=exhigh`).then(
            res => {
                dispatch(changeSongsMsg(res.data))
                return res.data
            },
            err => {
                console.log(err)
                return err
            }
        )
    }

    return (
        <div>
            <table className='songsMsg'>
                <thead>
                    <tr className='title'>
                        <td>音乐标题</td>
                        <td>歌手</td>
                        <td>专辑</td>
                        <td>时长</td>
                        <td>热度</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        songsListSongsMsg.songs.map(
                            (songsObj, index) => {
                                return (
                                    <tr key={songsObj.id} onClick={(e) => oneClick(e)} onDoubleClick={() => doubleClick(songsObj.id)}>
                                        <td>{songsObj.name}</td>
                                        <td>{songsObj.ar[0].name}{songsObj.ar[1] ? '&' + songsObj.ar[1].name : ''}</td>
                                        <td>{songsObj.al.name}</td>
                                        <td>{songsTime[index] ? parseInt(songsTime[index] / 1000 / 60) + ':' + (parseInt(songsTime[index] / 1000 % 60) < 10 ? '0' + parseInt(songsTime[index] / 1000 % 60) : parseInt(songsTime[index] / 1000 % 60)) : '0:00'}</td>
                                        <td>null</td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
            <div className='buttonList'>
                <button className='last'>{'<'}</button>
                {
                    pageNav.map(
                        (value) => {
                            return (
                                <button key={value} onClick={toPage(value)}>{value}</button>
                            )
                        }
                    )
                }
                <button className='next'>{'>'}</button>
            </div>
        </div>
    )
}

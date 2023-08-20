import React from 'react'

import './index.css'

export default function Setting() {
  
  let hourList = []
  let minuteList = []

  for(let i = 1; i <= 60 ; i++){
    if(i <= 12) {
        hourList.push(i)
        minuteList.push(i)
    }else {
        minuteList.push(i)
    }
  }

  return (
    <div className='setting'>
        <h2>设置</h2>
        <ul className='nav'>
            <li>账号设置</li>
            <li>常规设置</li>
            <li>下载设置</li>
        </ul>
        <hr />

        <div className='accountSet'>
            <h3>账号设置</h3>
            <span className="iconfont">微博</span>
            <span className="iconfont">微信</span>
            <span className="iconfont">QQ</span>
            <span>绑定账号 &gt;</span>
            <br />
            <button>修改个人信息</button>
        </div>
        <hr />

        <div className='normalSet'>
            <h3>常规设置</h3>
            <div className='X'>
                <span>关闭主面板</span>
                <br />
                <input type="radio" name='x' id='minimize' defaultChecked /> <label htmlFor="minimize">最小化到系统托盘</label>
                <br />
                <input type="radio" name='x' id='quit' /> <label htmlFor="quit">退出</label>
            </div>

            <div className='timedShutdownSet'>
                <input type="checkbox" id="timedShutdown" /> <label htmlFor="timedShutdown">开启定时关机</label>
                <br />
                <span>关机时间</span>
                <select>
                    {hourList.map((i)=>{
                        return <option key={'hour'+i} value="i">{i}</option> 
                    })}
                </select>
                <span>时</span>
                <select>
                    {minuteList.map((i)=>{
                        return <option key={'minute'+i} value="i">{i}</option> 
                    })}
                </select>
                <span>分</span>
                <br />
                <button>开始运行</button>
            </div>
        </div>
        <hr />

        <div className="downloadSet">
            <h3>下载设置</h3>
            <div>
                <span>音质选择:</span>
                <br />
                <span>试听:</span> 
                <input type="radio" name='Listen' id="ListenNormal" defaultChecked /> <label htmlFor="ListenNormal">标准</label>
                <input type="radio" name='Listen' id="ListenHigh" /> <label htmlFor="ListenHigh">极高</label>
                <input type="radio" name='Listen' id="ListenLossless" /> <label htmlFor="ListenLossless">无损·VIP</label>
                <input type="radio" name='Listen' id="ListenHi-Res" /> <label htmlFor="Hi-ListenHi">Hi-Res音质·VIP</label>
                <br />
                <span>下载:</span> 
                <input type="radio" name='download' id="downloadNormal" defaultChecked /> <label htmlFor="downloadNormal">标准</label>
                <input type="radio" name='download' id="downloadHigh" /> <label htmlFor="downloadHigh">极高</label>
                <input type="radio" name='download' id="downloadLossless" /> <label htmlFor="downloadLossless">无损·VIP</label>
                <input type="radio" name='download' id="downloadHi-Res" /> <label htmlFor="downloadHi-Res">Hi-Res音质·VIP</label>
            </div>

            <div className="namedSet">
                <span>音乐格式设置:</span>
                <input type="radio" name='namedway' id="way1" defaultChecked /> <label htmlFor="way1">歌曲名</label>
                <input type="radio" name='namedway' id="way2" /> <label htmlFor="way2">歌手-歌曲名</label>
                <input type="radio" name='namedway' id="way3" /> <label htmlFor="way3">歌曲名-歌手</label>
            </div>
        </div>
        <hr />

    </div>
  )
}

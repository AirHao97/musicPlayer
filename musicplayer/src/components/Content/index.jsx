import React from 'react'
/* import {useLocation} from 'react-router-dom' */

import './index.css'
import Header from './Header'
import Body from './Body'
import Foot from './Foot'

export default function Content(props) {
  
  return (
    <div className='content'>
        <Header/>
        <Body />
        <Foot />
    </div>
  )
}
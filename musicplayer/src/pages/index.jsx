import {Navigate} from 'react-router-dom'

import Login from '../components/Login'
import PasswordLogin from './PasswordLogin'
import QRLogin from './QRLogin'
import Content from '../components/Content'
import FindMusic from './FindMusic'
import SearchSongs from './SearchSongs'
import SongsList from './SongsList'
import VerificationcodeLogin from './VerificationcodeLogin'
import Setting from './Setting'
import UserDetailMsg from './UserDetailMsg'
import MyMusicList from './MyMusicList'
import MyCollectMusicList from './MyCollectMusicList'
import SongsMsg from './SongsMsg'
import SongsDiscuss from './SongsDiscuss'
 
const a = [
    {
        path:'/login',
        element: <Login/>,
        children:[
            {
                path:'/login/passwordLogin',
                element: <PasswordLogin/>
            },
            {
                path:'/login/qrLogin',
                element: <QRLogin/>
            },
            {
                path:'/login/verificationcodeLogin',
                element: <VerificationcodeLogin />
            }
        ]
    },
    {
        path:'/content',
        element:<Content/>,
        children:[
            {
                path:'/content/findMusic',
                element:<FindMusic/>
            },
            {
                path:'/content/searchSongs',
                element: <SearchSongs />
            },
            {
                path:'/content/songsList',
                element: <SongsList />,
                children:[
                    {
                        path:'/content/songsList/songsMsg',
                        element: <SongsMsg />
                    },
                    {
                        path:'/content/songsList/discuss',
                        element: <SongsDiscuss />
                    }
                ]
            },
            {
                path:'/content/userDetailMsg',
                element: <UserDetailMsg />,
                children:[
                    {
                        path:'/content/userDetailMsg/myMusicList',
                        element: <MyMusicList />
                    },
                    {
                        path:'/content/userDetailMsg/myCollectMusicList',
                        element: <MyCollectMusicList />
                    }
                ]
            },
            {
                path:'/content/setting',
                element: <Setting />
            }
        ]
    },
    {
        path:'/',
        element:<Navigate to='/login/verificationcodeLogin'/>
    }
] 

export default a
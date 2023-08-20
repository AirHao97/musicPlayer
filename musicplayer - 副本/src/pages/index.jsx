import {Navigate} from 'react-router-dom'

import Login from '../components/Login'
import Content from '../components/Content'
import FindMusic from './FindMusic'
import SearchSongs from './SearchSongs'
import SongsList from './SongsList'
 
const a = [
    {
        path:'/login',
        element: <Login />
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
                element: <SongsList />
            }
        ]
    },
    {
        path:'/',
        element:<Navigate to='/login'/>
    }
] 

export default a
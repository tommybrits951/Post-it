import {useState, useContext} from 'react'
import {Routes, Route} from 'react-router'
import PostContext from '../context/PostContext'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'
import Layout from './Layout'
import Boards from './Boards'
import Posts from './Posts'
export default function Home() {
    const {auth} = useContext(PostContext)

    const content = auth === null ? (
        <Routes>
            <Route element={<Login />} index />
            <Route element={<Register />} path='/register' /> 
        </Routes>
    ) : (
<Routes>
        <Route element={<Layout />} >
            <Route element={<Boards />} index />
            <Route element={<Posts />} path={`/post/:board_id`} />
        </Route>
</Routes>
    )
    return content
}

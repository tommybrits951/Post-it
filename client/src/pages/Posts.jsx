import { useEffect, useContext, useState } from 'react'
import PostContext from '../context/PostContext'
import { useParams } from 'react-router'
import axios from '../api/axios'
import PostForm from '../components/post/PostForm'
import PostList from "../components/post/PostList"

export default function Posts() {
    const { auth, user } = useContext(PostContext)
    const { board_id } = useParams("")
    const [posts, setPosts] = useState([])
    const [board, setBoard] = useState(null)

    useEffect(() => {
        
        if (auth) {
            axios.get(`/post/${board_id}`, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                }
            })
                .then(res => {
                    
                    setPosts(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [])
    useEffect(() => {
        if (auth) {
            axios.get(`/board/${board_id}`, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                }
            })
            .then(res => {
                setBoard(res.data)
            })
            .catch(err => console.log(err))
        }
    }, [])
    return (
        <div>
            <h2 className='absolute border-4 border-white p-3 top-15 left-1/5 text-4xl text-stone-300 font-mono font-bold'>"{board ? board.subject : null}"</h2>
            <div>
                <PostList posts={posts} />
            </div>
            <footer className='fixed w-10/12 left-1/12 bottom-4'>
                <PostForm />
            </footer>
        </div>
    )
}

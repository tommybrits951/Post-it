import { useEffect, useState } from 'react'
import axios from '../api/axios'
export default function usePosts(board_id, auth) {
    const [posts, setPosts] = useState(null)
    useEffect(() => {

        board_id ? axios.get(`/post/${parseInt(board_id)}`, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
        .then(res => {
            setPosts(res.data)
        })
        .catch(err => console.log(err)) : null
    }, [auth, board_id])

    return [posts, setPosts]
}


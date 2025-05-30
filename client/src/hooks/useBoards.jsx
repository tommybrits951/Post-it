import {useState, useEffect} from 'react'
import axios from '../api/axios'
export default function useBoards(auth) {
    const [boards, setBoards] = useState(null)
    
useEffect(() => {

    auth !== null ? axios.get("/board", {
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
    .then(res => setBoards(res.data))
    .catch(err => console.error(err)) : null
}, [auth])

    return [boards, setBoards]
}
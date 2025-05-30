import {useState, useEffect, useContext, use} from 'react'
import PostContext from '../../context/PostContext'
import axios from "../../api/axios"
import {format} from 'date-fns'
export default function PostTab({post}) {
    const [author, setAuthor] = useState(null)
    const {auth} = useContext(PostContext)
    useEffect(() => {
        if (auth) {
            axios.get(`/user/${post.author_id}`, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                }
            })
            .then(res => {
                setAuthor(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [])
    const content = author !== null ? (
        <li className='border-white border-2 p-1 h-46 m-5 grid grid-cols-8'>
            <div className='h-16 w-14 rounded-2xl mt-3 ml-3 col-start-1 col-end-2'>
                <img className='h-full rounded-2xl' src={`http://localhost:9000/images/profile/${author.pic}`} />
            </div>
            <div className='flex flex-col col-start-3 col-end-9'>

                <h3 className='text-cyan-200'>{author.username}</h3>
            <div className='border-white w-4/5 h-24 bg-sky-500 m-2 p-2 overflow-y-scroll'>
            <p>"{post.text}"</p>
            </div>
            <p className='text-sm text-right mt-3'>{format(new Date(post.posted), "MM-dd-yyyy hh:mm aaa")}</p>
            </div>
        </li>
    ) : <p>Loading...</p>
    return content
}

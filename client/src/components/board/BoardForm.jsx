import {useState, useContext} from 'react'
import axios from '../../api/axios'
import PostContext from '../../context/PostContext'


const initForm = {
    subject: "",
    post: ""
}


export default function BoardForm({handleForm, closeForm}) {
    const [formData, setFormData] = useState(initForm)
    const [img, setImg] = useState(null)
    const [postImg, setPostImg] = useState(null)
    const {auth} = useContext(PostContext)

    function change(e) {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    function submit(e) {
        e.preventDefault()
        const pkg = new FormData()
        pkg.append("subject", formData.subject)
        pkg.append("post", formData.post)
        if (img !== null) {
            pkg.append("img", img)
        }
        if (postImg !== null) {
            pkg.append("postImg", postImg)
        }

        {!auth ? null : axios.post('/board', pkg, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
        .finally(() => {
            closeForm()
        })
    }
    }
    function changeBoardImage(e) {
        const file = e.targer.files[0]
        console.log(e.targe)
        setImg(file)
    }

    function closeForm(e) {
        e.preventDefault()
        handleForm(e)
    }

    return (
    <form encType='multipart/form-data' className='absolute text-center rounded-lg bg-gray-500 w-full sm:w-1/2 sm:left-1/4'>
        <h3 className='text-white text-3xl text-center'>New Post Board</h3>
        <label className='text-white'>Subject/Topic
            <br />
            <input className='bg-white text-black' type='text' name='subject' value={formData.subject} onChange={change} />
        </label>
        <br />
        <label className='text-white'>Image for Board
            <br />
            <input className='bg-white text-black' type='file' accept='image/*' onChange={changeBoardImage} />
        </label>
        <br />
        <label className='text-white'>
            Introduction
            <br />
            <input className='bg-white text-black' type='text' name='post' value={formData.post} onChange={change} />
        </label>
        <br />
        <div className='flex justify-around m-5'>
            <button title='close' className='text-white bg-gray-900 rounded-lg p-2 shadow-2xl hover:scale-95 cursor-pointer' onClick={closeForm}>Cancel</button>
            <button className='text-white bg-cyan-500 rounded-lg p-2 shadow-2xl hover:scale-95 cursor-pointer' onClick={submit}>Submit</button>
        </div>
    </form>
  )
}

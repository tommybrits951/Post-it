import { useContext, useState } from 'react'
import PostContext from '../../context/PostContext'
import {Link} from 'react-router'
import axios from '../../api/axios'
const initForm = {
    email: "",
    password: ""
}

export default function Login() {
    const { auth, setAuth } = useContext(PostContext)
    const [err, setErr] = useState("")
    const [formData, setFormData] = useState(initForm)



    function handleAuth(str) {
        setAuth(str)
    }

    function submit(e) {
        e.preventDefault()
        const pkg = new FormData()
        pkg.append("email", formData.email)
        pkg.append("password", formData.password)
        axios.post("/auth", pkg)
        .then(res => {
            handleAuth(res.data.accessToken)
        })
        .catch(err => console.log(err))
    }


    function change(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }


    return (
        <section className='absolute w-full h-full'>
            <div className='absolute mt-32 left-1/4 rounded-lg bg-sky-900 border-2 w-1/2 shadow-2xl'>
                <h3 className='text-white text-3xl text-center m-5'>Login</h3>
                <p>{err}</p>
                <form encType='multipart/form-data' onSubmit={submit} className='bg-sky-300 text-center rounded-lg'>
                    <label className='text-white text-lg mt-3'>
                        Email
                        <br />
                        <input className='w-3/4 rounded p-1' type='email' name='email' value={formData.email} onChange={change} required />
                    </label>
                    <br />
                    <label className='text-white text-lg mt-3'>
                        Password
                        <br />
                        <input className='w-3/4 rounded p-1' type='password' name='password' value={formData.password} onChange={change} required />
                    </label>
                    <br />
                    <div className='p-5 flex justify-around'>
                        <Link className='text-white bg-green-500 rounded shadow-2xl p-2 hover:scale-95 cursor-pointer' to={"/register"}>Create New Profile</Link>
                        <button className='text-white bg-cyan-500 shadow-2xl rounded hover:scale-95 cursor-pointer p-2'>Submit</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

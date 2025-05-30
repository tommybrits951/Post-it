import { useState, useRef } from 'react'
import axios from "../../api/axios"
import Cropper from 'react-easy-crop'
const initForm = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirm: "",
}
export default function RegisterForm({change, changePage, clear, formData}) {
    

    
    function changeHandle(e) {
        change(e)
    }
    function pageHandle(e) {
        changePage(e)
    }

    return (
        <section className='absolute w-full h-full'>
            <div className='absolute w-1/2 bg-sky-300 top-20 rounded-xl shadow-xl left-1/4'>
                <h3 className='text-center text-3xl mt-5'>Register User</h3>
                
                <form encType='multipart/form-data' className='text-center pt-3 bg-black mt-5'>
                <label className='text-white'>First Name
                    <br />
                    <input className='bg-white w-3/4 text-black p-1 rounded' type='text' name='firstName' value={formData.firstName} onChange={changeHandle} required />
                </label>
                <br />
                <label className='text-white'>Last Name
                    <br />
                    <input className='bg-white w-3/4 text-black p-1 rounded' type='text' name='lastName' value={formData.lastName} onChange={changeHandle} required />
                </label>
                <br />
                <label className='text-white'>Phone
                    <br />
                    <input className='bg-white w-3/4 text-black p-1 rounded' type='number' name='phone' value={formData.phone} min={1111111111} max={9999999999} onChange={changeHandle} required />
                </label>
                <br />
                <label className='text-white'>Email
                    <br />
                    <input className='bg-white w-3/4 text-black p-1 rounded' type='email' name='email' value={formData.email} onChange={changeHandle} required />
                </label>
                <br />
                <label className='text-white'>Username
                    <br />
                    <input className='bg-white w-3/4 text-black p-1 rounded' type='text' name='username' value={formData.username} onChange={changeHandle} required />
                </label>
                <br />
                <label className='text-white'>Password
                    <br />
                    <input className='bg-white w-3/4 text-black p-1 rounded' type='password' name='password' value={formData.password} onChange={changeHandle} required />
                </label>
                <br />
                <label className='text-white'>Confirm Password
                    <br />
                    <input className='bg-white w-3/4 text-black p-1 rounded' type='password' name='confirm' value={formData.confirm} onChange={changeHandle} required />
                </label>
                <br />
                <div className='flex justify-around mt-5 p-5'>
                    <button className='text-white bg-gray-500 w-1/4 rounded-lg hover:scale-95 cursor-pointer p-2' onClick={() => clear()}>Clear</button>
                    <button className='text-white bg-cyan-500 w-1/4 rounded-lg hover:scale-95 cursor-pointer p-2' value={"next"} onClick={pageHandle}>Next</button>
                </div>
                </form>
            </div>
        </section>
    )
}

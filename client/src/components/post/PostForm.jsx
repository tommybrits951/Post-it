import { useState, useContext } from 'react'
import PostContext from '../../context/PostContext'
import axios from '../../api/axios'
import fileIcon from '../../assets/paperclip.png'
import sendIcon from '../../assets/send.png'


export default function PostForm({ change, submit, changeImg, formData}) {
  
  function changeHandle(e) {
    change(e)
  }
  function handleImg(e) {
    changeImg(e)
  }
  function submitHandle(e) {
    
    submit(e)
  }
  function openFile(e) {
    e.preventDefault()
    document.getElementById("ipt").click()
  }
  return (
    <form className='h-10 w-full flex justify-center bottom-0' encType='multipart/form-data' onSubmit={submit}>
      
        <input type='text' placeholder='Post text here...' className='bg-white w-full text-black p-1' name='txt' value={formData.txt} onChange={changeHandle} />
        <input type='file' id='ipt' onChange={handleImg} placeholder="Select image for upload." className='hidden' accept='image/*' />
        <button type="submit" onClick={submitHandle} className='mr-3 cursor-pointer hover:scale-95  bg-white h-full'>
          <img src={sendIcon} className='h-full' onClick={submitHandle} />
        </button>
        <button onClick={openFile} className='h-full'>
          <img src={fileIcon} className='h-full' />
        </button>
      

    </form>
  )
}

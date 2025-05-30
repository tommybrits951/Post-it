import { useState, useContext } from 'react'
import PostContext from '../../context/PostContext'
import axios from '../../api/axios'
import fileIcon from '../../assets/paperclip.png'
import sendIcon from '../../assets/send.png'


export default function PostForm({ board_id }) {
  const { auth } = useContext(PostContext)
  const [txt, setTxt] = useState("")
  const [img, setImg] = useState(null)

  function handleImg(e) {
    const file = e.target.files[0]
    setImg(file)
  }
  function submit(e) {
    e.preventDefault()
    const pkg = new FormData()
    if (txt !== "") {
      pkg.append("txt", txt)
    }
    if (img !== null) {
      pkg.append("img", img)
    }
    if (auth && board_id) {
      axios.post("/post", pkg, {
        headers: {
          Authorization: `Bearer ${auth}`,
        }
      })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => console.log(err))
    }
  }
  function openFile(e) {
    e.preventDefault()
    document.getElementById("ipt").click()
  }
  return (
    <form encType='multipart/form-data' onSubmit={submit}>
      <div className='h-10 w-full flex justify-center bottom-0'>
        <input type='text' placeholder='Post text here...' className='bg-white w-full text-black p-1' onChange={(e) => setTxt(e.target.value)} />
        <input type='file' id='ipt' onChange={handleImg} placeholder="Select image for upload." className='hidden' accept='image/*' />
        <button type="submit" className='mr-3 bg-white h-full'>
          <img src={sendIcon} className='h-full' />
        </button>
        <button onClick={openFile} className='h-full'>
          <img src={fileIcon} className='h-full' />
        </button>
      </div>

    </form>
  )
}

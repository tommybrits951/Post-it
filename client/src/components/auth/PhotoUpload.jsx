import { useState } from 'react'
import Cropper from 'react-easy-crop'
import axios from '../../api/axios'
import { useNavigate } from 'react-router'

export default function PhotoUpload({ formData, changePage }) {
    const navigate = useNavigate()
    const [img, setImg] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [zoom, setZoom] = useState(1)
    const [url, setUrl] = useState(null)
    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }

    function onCropComplete(croppedArea, croppedAreaPixels) {
        console.log(croppedAreaPixels)
        setCroppedAreaPixels(croppedAreaPixels)
    }
    async function changeImg(e) {
        const file = e.target.files[0]
        const imgUrl = await readFile(file)
        setImg(file)
        setUrl(imgUrl)
    }

    function submit(e) {
        e.preventDefault()
        const pkg = new FormData()
        if (formData.password === formData.confirm) {
            Object.keys(formData).map(key => {
                if (key !== "confirm") {
                    pkg.append(key, formData[key])
                }
            })
            Object.keys(croppedAreaPixels).map(key => pkg.append(key, croppedAreaPixels[key]))
            pkg.append("img", img)
            axios.post("/user", pkg)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => console.log(err))
                .finally(() => navigate("/"))
        } else {

        }
    }
    return (
        <section className='absolute h-full w-full grid grid-rows-2'>
            <div className='absolute left-0 w-full h-1/2 border-2 row-start-1'>
                <Cropper
                    image={url}
                    crop={crop}
                    zoom={zoom}
                    aspect={5 / 6}
                    cropShape='round'
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    className="border-2"
                />
            </div>
            <form onSubmit={submit} className='row-start-2 text-center grid grid-cols-4'>
                <label className='col-start-2 col-end-4 mt-20 w-full'>Zoom
                    <br />
                    <input className='w-full' type="range" value={zoom} min={1} max={3} step={0.1} aria-labelledby='Zoom' onChange={(e) => setZoom(e.target.value)} />
                </label>
                <br />
                <label className='col-start-2 col-end-4'>Choose Picture
                    <br />
                    <input type="file" name='img' onChange={changeImg} className='bg-white rounded' accept='image/*' />
                </label>
                <div className='col-start-2 col-end-4 '>
                    <button className='text-white bg-gray-500 p-2 shadow-xl rounded hover:scale-95 cursor-pointer mx-5' onClick={(e) => changePage(e)}>Back</button>
                    <button className='text-white bg-cyan-500 p-2 shadow-xl rounded hover:scale-95 cursor-pointer mx-5' onClick={submit}>Submit</button>
                </div>
            </form>

        </section >
    )
}

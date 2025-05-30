import { useState, useRef } from 'react'
import axios from "../../api/axios"
import PhotoUpload from "./PhotoUpload"
import RegisterForm from "./RegisterForm"
const initForm = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirm: "",
}
export default function Register() {
    const [formData, setFormData] = useState(initForm)
    const [err, setErr] = useState('')
    const [page, setPage] = useState(0)

    function change(e) {
        setErr("")
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    function clear(e) {
        e.preventDefault()
        setFormData(initForm)
    }
    
    function submit(e) {
        e.preventDefault()
        const pkg = new FormData()
        if (formData.password !== formData.confirm) {
            setErr("Passwords must match!")
        } else {
            Object.keys(formData).map(key => {
                pkg.append(key, formData[key])
            })
            axios.post("/user", pkg)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                    setErr(err.response.data.message)
                })
        }
    }

    function changePage(e) {
        const { value } = e.target
        
        if (page === 0 && value === "next" && formData.password === formData.confirm) {
            setPage(1)
        } else if (formData.password === formData.confirm) {
            setPage(0)
        }
    }
    return (
        <>
            {page === 0 ? <RegisterForm
                change={change}
                changePage={changePage}
                initForm={initForm}
                clear={clear}
                formData={formData}
            /> : <PhotoUpload formData={formData} changePage={changePage} />}
        </>
    )
}

import { useState, useContext } from 'react'
import PostContext from '../context/PostContext'
import BoardList from '../components/board/BoardList'
import BoardForm from "../components/board/BoardForm"

export default function Boards() {
    const { boards } = useContext(PostContext)
    const [openForm, setOpenForm] = useState(false)


    function handleForm(e) {
        const { title } = e.target;
        if (title === "formBtn") {
            setOpenForm(true)
        } else if (title === "close") {
            setOpenForm(false)
        }
    }

    return (
        <section className='pt-16 z-1'>
            {openForm ? <BoardForm closeForm={handleForm} handleForm={handleForm} /> : (
                <>
                    <button title="formBtn" className='absolute bg-gray-500 w-10/12 top-20 left-1/12 p-2 text-white rounded shadow-2xl hover:scale-95 cursor-pointer' onClick={handleForm}>New Board</button>
                    <BoardList boards={boards} /> 
                </>
            )}

        </section>
    )
}

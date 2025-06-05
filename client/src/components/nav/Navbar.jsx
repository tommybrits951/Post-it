import { Link, useNavigate } from 'react-router'
import { useContext, useEffect } from 'react'
import PostContext from '../../context/PostContext'
import axios from '../../api/axios'


const navItems = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "Contacts",
        path: "/contacts"
    },
    {
        title: "Boards",
        path: "/boards"
    },
    
]

export default function Navbar() {
    const { openNav, auth, setAuth, openMenu } = useContext(PostContext)
    const navigate = useNavigate()
    function logout() {
        axios.get("/auth/logout", {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
        .then(res => {
            setAuth(res.data.data)
        })
        .catch(() => {
            navigate("")
        })
        .finally(() => {
            navigate()
        })
    }
    useEffect(() => {
        
    }, [])
    return (    
        <header className='fixed-top bg-black w-full text-white'>
            <div className='dropdown'>
                <button title='menu' onClick={(e) => openMenu(e)} className='p-3 hover:bg-white hover:text-black cursor-pointer'>Menu</button>
                {
                    openNav === true ?
                    <ul className="dropdown-menu">
                        {navItems.map((itm, idx) => {
                            return (
                                <li key={idx} className='p-2 hover:bg-white hover:text-black'>
                                    <Link to={itm.path}>{itm.title}</Link>
                                </li>
                            )
                        })}
                        <li>
                            <button className='p-2 hover:bg-white hover:text-black cursor-pointer'  onClick={logout}>Logout</button>
                        </li>
                    </ul> : null
                    }
                
            </div>
        </header>
    )
}

import { Link } from 'react-router'
import { useContext } from 'react'
import PostContext from '../../context/PostContext'

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
    }
]

export default function Navbar() {
    const { openNav, openMenu } = useContext(PostContext)
    

    return (
        <header className='fixed top-0 bg-black w-full text-white'>
            <div className='relative'>
                <button title='menu' onClick={(e) => openMenu(e)} className='p-3 hover:bg-white hover:text-black cursor-pointer'>Menu</button>
                {
                    openNav === true ?
                    <ul className="absolute bg-black p-2 ">
                        {navItems.map((itm, idx) => {
                            return (
                                <li key={idx} className='p-2 hover:bg-white hover:text-black'>
                                    <Link to={itm.path}>{itm.title}</Link>
                                </li>
                            )
                        })}
                    </ul> : null
                    }
                
            </div>
        </header>
    )
}

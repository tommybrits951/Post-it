import './App.css'
import { useState, useEffect } from 'react'
import PostContext from './context/PostContext'
import Home from './pages/Home'
import useBoards from './hooks/useBoards'
import useUser from './hooks/useUser'
import useRefresh from './hooks/useRefresh'



function App() {
  const [auth, setAuth] = useRefresh()
  const [openNav, setOpenNav] = useState(false)
  const [user, setUser] = useUser(auth)
  const [boards, setBoards] = useBoards(auth)
  
  
  


  function openMenu(e) {
    const {title} = e.target
    if (title === "menu") {
      setOpenNav(true)
    } else if (title !== "menu") {
      setOpenNav(false)
    }
  }

  

  
  
  

  return (
    <main onClick={openMenu} className='absolute w-full h-full m-0 p-0 bg-sky-100'>
      <PostContext.Provider value={{boards, setBoards, user, setUser, openNav, openMenu, auth, setAuth}}>
        <Home />
      </PostContext.Provider>
    </main>
  )


}

export default App

import notFavIcon from '../../assets/notfav.png'
import favIcon from "../../assets/fav.png"
import { useEffect, useContext } from 'react'
import PostContext from '../../context/PostContext'
import { Link } from 'react-router'
import axios from '../../api/axios'
import enterIcon from '../../assets/enter.png'
import usePosts from '../../hooks/usePosts'
import { format } from 'date-fns'



export default function BoardTab({ board }) {
  const { auth, user, setUser } = useContext(PostContext)
  const [posts] = usePosts(board.board_id, auth)
  const lastPost = board.last ? `${board.last.text}` : "Nothing Posted!"

  function addFav(e) {
    e.preventDefault()
    const { title } = e.target
    console.log(title)
    if (title === "notFav") {
      axios.post("/fav", { board_id: board.board_id, user_id: user.user_id }, {
        headers: {
          Authorization: `Bearer ${auth}`
        }
      })
        .then(res => {
          console.log(res.data)
          setUser({...user, favs: [...user.favs, res.data]})
        })
        .catch(err => console.log(err))

    } else if (title === "fav") {
      axios.delete(`/fav/${board.board_id}/${user.user_id}`)
        .then(res => {
          console.log(res.data)
            setUser(prevState => ({
            ...prevState,
            favs: prevState.favs.filter(fav => fav.fav_id === res.data)
          }))
          
        })
        .catch(err => console.log(err))

    }
  }

  useEffect(() => {
    
  }, [])
  const content = board ? (
    <li className='h-40 border-2 bg-white border-sky-700 p-5 grid grid-cols-8 grid-rows-6'>
      <div className='h-16 w-16 rounded-2xl border-3 col-start-1 col-end-2 row-start-1 row-end-4'>
        <img src={`http://localhost:9000/images/boards/${board.pic}`} className='h-full' />
      </div>
      <div className='col-start-3 col-end-9 row-start-1 row-end-2'>
        <h3 className='text-stone-800'>Subject: <span className='text-sky-900'>"{board.subject}"</span></h3>
        <h4 className='text-stone-800'>Posts: <span className='text-sky-900'>{posts !== null ? posts.length : null}</span></h4>
        <h4 className='text-stone-800'>Latest Post: <span className='text-sky-900 overflow-hidden whitespace-nowrap'>"{lastPost}"</span></h4>
        <h4 className='text-stone-800'>Created <span className='text-sky-900'>{format(new Date(board.started), "MM-dd-yyyy hh:mm aaa")}</span></h4>
      </div>
      <div className='col-start-7 col-end-9 row-start-6 row-end-7 h-8 w-full flex justify-around'>


        {user.favs.includes(board.board_id) ? (
          <button title='fav' value={{board_id: board.board_id}} className='h-9 p-1 cursor-pointer hover:scale-95' onClick={addFav}>
            <img src={favIcon} className='h-full' onClick={addFav} title='fav' />
          </button>
        ) : (
          <button title='notFav' className='h-8 p-1 cursor-pointer hover:scale-95' onClick={addFav}>
            <img src={notFavIcon} className='h-full' title="notFav" onClick={addFav} />
          </button>
        )}
        <Link className='h-8 pt-0.5 hover:scale-95' to={`/post/${board.board_id}`}>
          <img src={enterIcon} className='h-full hover:scale-95' />
        </Link>
      </div>

    </li>
  ) : null
  return content
}

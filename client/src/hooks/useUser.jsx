import {useState, useEffect} from 'react'
import axios from '../api/axios'



export default function useUser(auth) {
    const [user, setUser] = useState(null)
    
    
    useEffect(() => {

        auth !== null ? axios.get("/auth/user", {
            headers: {
                Authorization: `Bearer ${auth}`,
            }
        })
        .then(res => setUser(res.data))
        .catch(err => console.log(err)) : null
    }, [auth])      
    
    
        return [user, setUser]
}


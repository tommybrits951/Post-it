import { useEffect, useState } from "react";
import axios from '../api/axios'



export default function useRefresh() {
    const [auth, setAuth] = useState(null)


        
        axios.get("/auth")
        .then(res => {
            setAuth(res.data)
        })
        .catch(err => console.log(err)) 




    return [auth, setAuth]
    
}
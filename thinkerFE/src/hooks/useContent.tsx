import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent (){
const [ contentsData , setContentsData ] = useState([])
const [linkvalue, setLinkValue] = useState("");

function refresh (){
   axios.get(`${BACKEND_URL}/api/v1/content` , {
      headers : {
          "Token" : localStorage.getItem("token")
      }
     })
     .then((response) => {
        setContentsData(response.data.myContent)
     
     })
}
useEffect(() => {
   refresh()
   let interval = setInterval(() => {
      refresh()
   } , 500)

   return () => {
      clearInterval(interval)
   }
} , [])

return {contentsData , refresh ,linkvalue ,setLinkValue}
}


import React, {useEffect, useState} from 'react'
import Home from './Home'
import HomeLogin from './Login'
import { useParams } from 'react-router-dom'

const HomeWrapper = (props)=>{
    let params = useParams
    const [user, setuser] = useState()
    const [login, setlogin] = useState(false)

    const getLogin = async (data)=>{
        setlogin(data)
      }


    // deciding code for registered user
    useEffect(
        ()=>{
            getLoggedUser()
            //props.getLogin(login)
        }, []
    )

    const getLoggedUser = async ()=>{
        const auth_token = localStorage.getItem("auth_token")

        if(auth_token!=null)
    {
        console.log("we are set")
        console.log(auth_token)

        await getLoggedStatus(auth_token)
    }

    }

    

    const getLoggedStatus = async(token)=>
    {
        let response = await fetch("https://cencleanback.mtandauza.com/authuser",
                {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({"token":token})
                })
            if(response.status==200)
            {
                let data = await response.json()
                setuser(data)
                props.getuser(data)
                setlogin(true)
            }
    }

    if(login == true)
    {
        //setlogin(true)
        return (
            <div>
                <Home/>
            </div>
        )
    }

    else
    {
        return (
            <div>
                <HomeLogin hello={getLogin}/>
            </div>
         )
     }

 }

 export default HomeWrapper

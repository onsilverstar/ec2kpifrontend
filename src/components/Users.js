import { Button } from 'bootstrap';
import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import NavigationBar from "./Navbar"



const url_users = "https://cencleanback.mtandauza.com/"

const Users = (props) =>
{
    const [users, setusers] = useState([])
    const navigate = useNavigate()
    useEffect(
        ()=>{
           getUsers()
        }, []
    )
    let count = 1
    const getUsers = async ()=>
    {
        let response = await fetch(url_users)
        let result = await response.json()
        setusers(result)
    }

    function handleClick(key){
        navigate(`/users/${key}`) 

    }

    return(
        <div>
            <div style={{ marginBottom: '50px' }}>
                <NavigationBar/>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Title</th>
                        <th>Admin</th>
                    </tr>
                </thead>
                    <tbody>
                    
                        {
                            users.map
                            (
                                (item)=>
                                    <tr key={item["pk"]} onClick={(e)=>handleClick(item["pk"])}>
                                        <td>{count++}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.title}</td>
                                        <td>{item.admin}</td>
                                    </tr>
                                
                            )
                        }
                    </tbody>
            </Table>
    
        </div>
    )
}

export default Users

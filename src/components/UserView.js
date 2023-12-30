import React, {useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavigationBar from './Navbar';

const url_users = "https://kpiapi.mtandauza.com/"



const UserView = (props) =>
{
    let params = useParams()
    const [users, setusers] = useState([])
    const [user_id, setuser_id] = useState([])
    const [currData, setcurrData] = useState()


    useEffect(
        ()=>{
            setuser_id(params.id)
            getUsers()
            getUserData(params.id).then((data)=>{
                setcurrData(data)
            })
        }, []
    )
    
    const getUsers = async ()=>
    {
        let response = await fetch(url_users)
        let result = await response.json()
        setusers(result)
    }


    const getUserData = async (id)=>{
        let response = await fetch("https://kpiapi.mtandauza.com/searchuser",
                {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({"pk":id})
                })
        let data = await response.json()
        return data[0]
    }


    const handleChangeFirstName = (e)=> {
        e.preventDefault()
        setcurrData((data)=>{
            return {...data,"first_name":e.target.value }})
            }


    const handleChangeLastName = (e)=> {
        e.preventDefault()
        setcurrData( (data) =>{
            return {...data, "last_name":e.target.value}});
      }

      const handleChangeEmail = (e)=> {
        e.preventDefault()
        setcurrData((data)=>{return {...data, "email":e.target.value}});
      }

      const handleChangeTitle = (e)=> {
        e.preventDefault()
        setcurrData((data)=>{return {...data,"title":e.target.value}});
      }
    
      const handleChangeAdmin = (e)=> {
        e.preventDefault()
        setcurrData((data)=>{return {...data, "admin":e.target.value}});
      }
      const handleSubmit = (e) =>{
        e.preventDefault()
        const data = currData
        fetch("https://kpiapi.mtandauza.com/edituser",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        })
      }

    const currKPI = getUserData(params.id)

    console.log(currData)

    return(currData&&
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
                    
                        { currKPI &&
                            (
                                   <tr>
                                        <td>1</td>
                                        <td>{currData.first_name}</td>
                                        <td>{currData.last_name}</td>
                                        <td>{currData.email}</td>
                                        <td>{currData.title}</td>
                                        <td>{currData.admin}</td>
                                    </tr>
                            )
                        }
                    </tbody>
            </Table>
            <div> 
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text"  value= {currData["first_name"]} onChange={handleChangeFirstName} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" value= {currData["last_name"]} onChange={handleChangeLastName} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value= {currData["email"]} onChange={handleChangeEmail} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value= {currData["title"]} onChange={handleChangeTitle}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label>Admin</Form.Label>
                        <Form.Check type="checkbox" value= {currData["admin"]} onChange={handleChangeAdmin}/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
            </div>
    )
}

export default UserView

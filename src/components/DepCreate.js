import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React,{useState, useEffect } from 'react';
import Dashboard from './Dashboard'
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from "./Navbar"
import { useForm } from 'react-hook-form';

function DepCreate(props) {
  const [title, settitle] = useState()

  const { handleSubmit, register, formState: { errors } } = useForm()

  const navigate = useNavigate()

  useEffect(
    ()=>{
      //props.getLogin(login)
    }, []
  )
  const handleChangeTitle = (e)=> {
    e.preventDefault()
    settitle(e.target.value);
  }

  const handleOnSubmit = async(e) =>{
    // e.preventDefault()
    const data = {"title": title}
    let response = await fetch("https://kpiapi.mtandauza.com/createdep",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)})

        navigate("/home")
  }
    return (
    <div>
        <div style={{ marginBottom: '50px' }}>
            <NavigationBar/>
        </div>
        <div className='login'>
        <Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control {...register("title_dep", { required: true })} placeholder="Enter title" onChange={handleChangeTitle} />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        {errors.title_dep && <p>The title field is required.</p>}
        </Form>
        </div>
    </div>
  );
}

export default DepCreate;

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

function CreateUser() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [first_name, setFirst_name] = useState("")
  const [last_name, setLast_name] = useState("")

  const { handleSubmit, register, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const handleChangePassword = (e)=> {
    e.preventDefault()
    setPassword(e.target.value);
  }

  const handleChangeEmail = (e)=> {
    e.preventDefault()
    setEmail(e.target.value);
  }
  const handleChangeFirst_name = (e)=> {
    e.preventDefault()
    setFirst_name(e.target.value);
  }

  const handleChangeLast_name = (e)=> {
    e.preventDefault()
    setLast_name(e.target.value);
  }
  const handleOnSubmit = () =>{
    const data = {"first_name": first_name, "last_name": last_name, "email": email, "password": password}
    fetch("https://cencleanback.mtandauza.com/createuser",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
    console.log(data)
    navigate("/home")
  }
    return (
    <Form onSubmit={handleSubmit(handleOnSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First name</Form.Label>
        <Form.Control type="text" placeholder="Enter first name" {...register("first_name", { required: true })} onChange={handleChangeFirst_name} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last name</Form.Label>
        <Form.Control type="text" placeholder="Enter last name" {...register("last_name", { required: true })} onChange={handleChangeLast_name} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("email", { required: true })} onChange={handleChangeEmail} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register("password", { required: true })} onChange={handleChangePassword}/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
      {errors.first_name && <p>The reporting lead field is required.</p>}
      {errors.last_name && <p>The manager field is required.</p>}
      {errors.password && <p>The senior manager field is required.</p>}
      {errors.email && <p>The external field is required.</p>}
      {errors.director && <p>The director field is required.</p>}
    </Form>
  );
}

export default CreateUser;

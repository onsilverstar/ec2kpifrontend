import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React,{Login, useState, useEffect } from 'react';
import Dashboard from './Dashboard'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function HomeLogin(props) {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [res, setres] = useState("")
  const [login, setlogin] = useState(false)
  //const [user, setuser] = useState("")

  const { handleSubmit, register, formState: { errors } } = useForm()

  const navigate = useNavigate()

  useEffect(
    ()=>{
      //props.getLogin(login)
    }, [login]
  )
  const handleChangePassword = (e)=> {
    e.preventDefault()
    setPassword(e.target.value);
  }

  const handleChangeEmail = (e)=> {
    e.preventDefault()
    setEmail(e.target.value);
  }
  const handleOnSubmit = async(e) =>{
    // e.preventDefault()
    const data = {"email": email, "password": password}
    let response = await fetch("https://cencleanback.mtandauza.com/login",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
      config: {"credentials": true}})

      let json_data = await response.json()
      setres(json_data["msg"])
      if(json_data["msg"] == "Login Success")
        {
          localStorage.setItem("auth_token", json_data["access"])
          setlogin(true)
          console.log(props.hello)
          props.hello(true)
        }
        //console.log(props.getLogin)
        console.log(json_data)
        console.log(login)

      // if(json_data["msg"] == "Login Success")
      // {
         navigate("/home", {login})
      // }
  }
    return (
    <div className='login'>
    <Form onSubmit={handleSubmit(handleOnSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register("email", { required: true })} type="email" placeholder="Enter email" onChange={handleChangeEmail} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register("password", { required: true })} type="password" placeholder="Password" onChange={handleChangePassword}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      New user? <Link to={"/register"}>Register</Link>
      </Form.Group>
      {errors.password && <p>The senior manager field is required.</p>}
      {errors.email && <p>The external field is required.</p>}
    </Form>
    </div>
  );
}

export default HomeLogin;

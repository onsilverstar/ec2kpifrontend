import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import './components.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 
import React,{useState } from 'react';
import AlertStartYear from './AlertStartYear';
import 'react-toastify/dist/ReactToastify.css';
//import {ToastContainer, toast } from 'react-toastify';

const NavigationBar = (props) => {
const navigate = useNavigate()
const [search, setSearch] = useState()
const handleSubmit = (e)=>
  {
    if (e.key == "Enter")
    {
      e.preventDefault()
      navigate(`/search/${e.target.value}`)
    }
  }
  const handleChange = (e)=>
  {
      e.preventDefault()
      setSearch(e.target.value)
      
  }

  //const notify = () => {toast.success("Successfully Started Year")}

  const handleStartYear = (e)=>{
    e.preventDefault()
    fetch("https://cencleanback.mtandauza.com/createkpimeasuretodate")
    //notify(e)
  }

  const handleCreateDep = (e)=>{
    e.preventDefault()
    navigate("/createdep")
  }

  const handleCreateKPI = (e)=>{
    e.preventDefault()
    navigate("/createkpi")
  }
  console.log(JSON.stringify(props))

    return (
      <div>
        <Navbar Navbar fixed="top" bg="light" expand="lg">
          <Container>
            <Navbar.Brand><Link to={"/home"} style={{ textDecoration: 'none' }}><div style={{color:'var(--bs-navbar-color)'}}>Dashboard</div></Link></Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#startyear"><button style={{border:"0px"}} onClick={handleStartYear}>Start Year</button></Nav.Link>
              <Nav.Link href="createkpi"><button onClick={handleCreateKPI}>Create KPI</button></Nav.Link>
              <Nav.Link href="#createdep"><button style={{border:"0px"}} onClick={handleCreateDep}>Create Department</button></Nav.Link>

            </Nav>
          </Container>
        </Navbar>
      </div>
      
    )
}

export default NavigationBar;

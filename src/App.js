import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login'
import Register from './components/SignUp'
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './components/components.css'
import KPIView from './components/KPIView';
import KPIs from './components/KPIs';
import KPIMetricView from './components/KPIMetricView';
import Users from './components/Users';
import UserView from './components/UserView';
import WeeklyMetrics from './WeeklyMetrics';
import WeeklyMetricsView from './WeeklyMetricsView';
import Home from './components/Home';
import HomeWrapper from './components/HomeWrapper';
import React, {useEffect, useState } from 'react';
import KPICreate from './components/KPICreate';
import DepCreate from './components/DepCreate';


function App() {
const [user, setuser] = useState(false)
const getuser = async (data)=>{
  setuser(data)
}
let a = "hello"
  return (
    <div className='wrapper'>
      <Routes>
        {/* <Route path="/login" element={<Login getLogin={getLogin} hello={a}/> }/> */}
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<HomeWrapper getuser={getuser}/>}/>
        <Route path="/:id/:title" element={<KPIView user={user}/>}/>
        <Route path="/kpis/:id" element={<KPIs/>}/>
        <Route path="/kpi/:id/" element={<KPIMetricView user={user}/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/users/:id" element={<UserView user={user}/>}/>
        <Route path="/weeklymetrics" element={<WeeklyMetrics/>}/>
        <Route path="/weeklymetrics/:id" element={<WeeklyMetricsView user={user}/>}/>
        <Route path="/home" element={<HomeWrapper getuser={getuser}/>}/>
        <Route path="/createkpi" element={<KPICreate/>}/>
        <Route path="/createdep" element={<DepCreate/>}/>

      </Routes>
    </div>
  );
}

export default App;

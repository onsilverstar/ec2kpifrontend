import React, {useEffect, useState} from 'react'
import Tabs  from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Users from './Users'
import KPIs from './KPIs'
import KPIDashboard from './KPIDashboard'
import WeeklyMetrics from '../WeeklyMetrics'
import KPIMetricView from './KPIMetricView'
import Table from 'react-bootstrap/esm/Table'
import NavigationBar from './Navbar';
import { Navigate, useNavigate } from 'react-router-dom'


const Home = ()=>{
    const [filter, setfilter] = useState("reporting_lead")
    const [filtered, setfiltered] = useState()

    const [reporting_lead, setreporting_lead] = useState()
    const [manager, setmanager] = useState()
    const [senior_manager, setsenior_manager] = useState()
    const [external, setexternal] = useState()
    const [director, setdirector] = useState()
    const [completed, setcompleted] = useState()
    //const [summ, setsumm] = useState([])
    const navigate = useNavigate()

    useEffect(() => { // this hook will get called every time filter has changed
        // perform some action every time filter is updated
        //console.log('Updated State', filter)
        getSumm("Reporting Lead").then((data)=>{
            setfiltered(data)
        })
        getSumm("Reporting Lead").then((data)=>{
            setreporting_lead(data)
        })
        getSumm("Manager").then((data)=>{
            setmanager(data)
        })
        getSumm("Senior Manager").then((data)=>{
            setsenior_manager(data)
        })
        getSumm("External").then((data)=>{
            setexternal(data)
        })
        getSumm("Director").then((data)=>{
            setdirector(data)
        })
        getSumm("Completed").then((data)=>{
            setcompleted(data)
        })

     }, [])

     const getKPISDeps = async ()=>{
        let response = await fetch("https://kpiapi.mtandauza.com/kpibydepartment")
        let data = await response.json()
        return data
    }

    const getSumm = async(filter)=>{
        let response = await fetch("https://kpiapi.mtandauza.com/kpibydepartment")
        let data = await response.json()
        let result = []
        for (var entry in data)
        {
            let temp ={}
            let kpis = []
            temp["dept"] = entry
            temp["kpis"]= []
            if(data[entry].length!=0)
            {
                for(let i = 0; i<data[entry].length; i++)
                {
                    //console.log(temp["kpis"][i]["fields"])
                    if(data[entry][i]["fields"]["stage"]==filter)
                    {
                        temp["kpis"].push(data[entry][i])
                    }
                }
                result.push(temp)
            }
        }
        return result

    }
    // const getKPIS = async ()=>{
    //     let response = await fetch("https://kpiapi.mtandauza.com/kpimetrics")
    //     let data = await response.json()
    //     let result = []
    //     if(data)
    //     {
    //         for(let i =0; i<data.length; i++)
    //             {
    //                 if(data[i]["stage"] == filter)
    //                 {
    //                     result.push(data[i])
    //                 }
    //             }
    //             data = result

    //     }
        
    //     return data
    // }

     const handleSelectTab = (key)=> {
        //e.preventDefault()
        if (key == "Reporting Lead")
        {
            getSumm("Reporting Lead").then((data)=>{
                setfiltered(data)})
            //navigate("/kpis/reporting_lead")
            return
        }
        if (key == "Manager")
        {
            getSumm("Manager").then((data)=>{
                setfiltered(data)})
            //navigate("/kpis/manager")
            return

        }
        else if (key == "Senior Manager")
        {
            getSumm("Senior Manager").then((data)=>{
                setfiltered(data)})
            //navigate("/kpis/senior_manager")
            return

        }
        else if (key == "External")
        {
            getSumm("External").then((data)=>{
                setfiltered(data)})
            //navigate("/kpis/external")
            return

        }
        else if (key == "Director")
        {
            getSumm("Director").then((data)=>{
                setfiltered(data)})
            //navigate("/kpis/director")
            return

        }
         else if (key == "Completed")
        {
            getSumm("Completed").then((data)=>{
                setfiltered(data)})
            //navigate("/kpis/completed")
            return

        }

    

    }
   
    const handleReportingLead = (e)=> {
        //e.preventDefault()
        alert("hello")
        setfilter("reporting_lead")
        //navigate("/home")
        

    }

    const handleManager = (e)=> {
        e.preventDefault()
        setfilter("manager")

    }

    const handleSeniorManager = (e)=> {
        e.preventDefault()
        setfilter("senior_manager")

    }


    const handleExternal = (e)=> {
        e.preventDefault()
        setfilter("external")

    }

    const handleDirector = (e)=> {
        e.preventDefault()
        setfilter("director")

    }
    const handleCompleted = (e)=> {
        e.preventDefault()
        setfilter("completed")

    }



    return(reporting_lead&&
            <div style={{ display: 'block', padding: 30 }}>
                <div style={{ marginBottom: '50px' }}>
                <NavigationBar/>
            </div>
                <Tabs defaultActiveKey="KPI Summary" className="mb-3" justify>
                    <Tab eventKey="Users" title="Users"><Users/></Tab>
                    <Tab eventKey="Edit KPIs" title="Edit KPIs"><KPIs kpi="edit"/></Tab>
                    <Tab eventKey="KPI Summary" title="KPI Summary">
                        <Tabs onSelect={handleSelectTab}>
                            <Tab eventKey="Reporting Lead" title="Reporting Lead"><KPIs title_filter="Reporting Lead"/></Tab>
                            <Tab eventKey="Manager" title="Manager"><KPIs title_filter="Manager"/></Tab>
                            <Tab eventKey="Senior Manager" title="Senior Manager" ><KPIs title_filter="Senior Manager"/></Tab>
                            <Tab eventKey="External" title="External"><KPIs title_filter="External"/></Tab>
                            <Tab eventKey="Director" title="Director"><KPIs title_filter="Director"/></Tab>
                            <Tab eventKey="Completed" title="Completed"><KPIs title_filter="Completed"/></Tab>
                        </Tabs>
                    </Tab>
                    <Tab eventKey="Weekly Metrics" title="Weekly Metrics"><WeeklyMetrics/></Tab>
                </Tabs>
                {/* {
                    (filtered.map((element) => 
                        
                        <Table key={element.dept}>
                            {console.log(element)}
                            <thead>
                                <caption>{element.dept}</caption>
                                <tr>
                                    <td>#</td>
                                    <td>Quarter</td>
                                    <td>Year</td>
                                    <td>Description</td>
                                    <td>Target</td>
                                    <td>Actual</td>
                                    <td>Weight</td>
                                    <td>Score</td>
                                </tr>
                            </thead>
                            <tbody>
                                {element.kpis&&
                                    element.kpis.map(
                                        (el)=>(
                                        <tr key={el["pk"]}>
                                            {console.log(el)}
                                            <td>{el["pk"]}</td>
                                            <td>{el.fields.quarter}</td>
                                            <td>{el.fields.year}</td>
                                            <td>{el.fields.description}</td>
                                            <td>{el.fields.ytd_target}</td>
                                            <td>{el.fields.ytd_quantitative}</td>
                                            <td>{el.fields.kpi_weight*100}%</td>
                                            <td>{el.fields.score*100}%</td>
                                        </tr>
                                        )
                                    )

                                }
                            </tbody>
                        </Table>
                        )
    
                    )
                }  */}
            </div>  
    )

}

export default Home

import React, {useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavigationBar from './Navbar';
import { useForm } from "react-hook-form";
import { Str } from 'danfojs';

const url_kpi_metrics = "https://kpiapi.mtandauza.com/kpimetrics"



const KPIMetricView = (props) =>
{
    let params = useParams()
    const [kpi_metrics, setkpi_metrics] = useState([])
    const [kpi_id, setkpi_id] = useState([])
    const [password, setPassword] = useState("")
    const [currData, setcurrData] = useState()
    const [currDataUsers, setcurrDataUsers] = useState([])
    const [users, setusers] = useState()

    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")
    const [last_name, setLast_name] = useState("")
    const [comment, setcomment] = useState("")
    const [departments, setdepartments] = useState("")
    const [department, setdepartment] = useState("")
    const [weight, setweight] = useState("")

    const [reporting_lead, setreporting_lead] = useState("")
    const [manager, setmanager] = useState("")
    const [external, setexternal] = useState("")
    const [senior_manager, setsenior_manager] = useState("")
    const [director, setdirector] = useState("")

    const { handleSubmit, register, formState: { errors } } = useForm()

    useEffect(
        ()=>{
            setkpi_id(params.id)
            getKPIMetrics()
            getUsers()
            getDepartments()
            console.log(params.title)
            getKPIData(params.id).then((data)=>{
                setcurrData(data)
            })
            
        }, []
    )
    
    
    const getKPIMetrics = async ()=>
    {
        let response = await fetch(url_kpi_metrics)
        let result = await response.json()
        setkpi_metrics(result)
    }

    const getUsers = async ()=>
    {
        let response = await fetch("https://kpiapi.mtandauza.com/")
        let result = await response.json()
        setusers(result)
    }

    const getGuid = (data)=>{
        for(let i =0; i<departments.length; i++)
        {
            if(departments[i]==data)
            {
                return departments[i]["guid"]
            }
        }

        return false
    }

    const getDepartments = async ()=>
    {
        let response = await fetch("https://kpiapi.mtandauza.com/department")
        let result = await response.json()
        setdepartments(result)
    }

    // const getUsersMap = async()=>{
    //     let result = {}
    //     let response = await getUsers()

    //     for (const item in response){

    //     }

    // }

    const getKPIData = async (id)=>{
        let response = await fetch("https://kpiapi.mtandauza.com/searchkpi",
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

    const getUserId = (data)=>{
        let email = data.split(" ")[2]
        for(let i=0; i<users.length; i++)
        {
            if(users[i]["email"] = email)
            {
                return users[i]["pk"]
            }
        }

        return null
    }


    const handleChangeNarrative = (e)=> {
        e.preventDefault()
        setcurrData((data)=>{
            return {...data,"comments_narrative":e.target.value }})
            }


    const handleChangeQuarter = (e)=> {
        e.preventDefault()
        setcurrData( (data) =>{
            return {...data, "quarter":e.target.value}});
      }

      const handleChangeStage = (e)=> {
        e.preventDefault()
        setcurrData((data)=>{return {...data, "stage":e.target.value}});
      }

      const handleChangeDescription = (e)=> {
        e.preventDefault()
        setcurrData((data)=>{return {...data,"description":e.target.value}});
      }

      const handleChangeDepartment = (e)=> {
        e.preventDefault()
        setdepartment(e.target.value)
        setcurrData((data)=>{return {...data,"department":getGuid(e.target.value)}});
      }

      const handleChangeWeight = (e)=> {
        e.preventDefault()
        setweight(e.target.value)
        setcurrData((data)=>{return {...data,"kpi_weight":e.target.value}});
      }
    
      const handleChangeTarget = (e)=> {
        e.preventDefault()
        setcurrData((data)=>{return {...data, "target_quantitative":e.target.value}});
      }

      const handleChangeReportingLead = (e)=> {
        e.preventDefault()
        setreporting_lead(e.target.value);
        let newDAta ={"kpi":kpi_id, "user": getUserId(e.target.value), "stage": "Reporting_Lead"}
        setcurrDataUsers((data)=>{return [...data, newDAta]
    });
      }

      const handleChangeManager = (e)=> {
        e.preventDefault()
        setmanager(e.target.value);
        let newDAta ={"kpi":kpi_id, "user": getUserId(e.target.value), "stage": "Manager"}
        setcurrDataUsers((data)=>{return [...data, newDAta]
    });
      }

      const handleChangeSeniorManager = (e)=> {
        e.preventDefault()
        setsenior_manager(e.target.value);
        let newDAta ={"kpi":kpi_id, "user": getUserId(e.target.value), "stage": "Senior_Manager"}
        setcurrDataUsers((data)=>{return [...data, newDAta]
    });
      }

      const handleChangeExternal = (e)=> {
        e.preventDefault()
        setexternal(e.target.value);
        let newDAta ={"kpi":kpi_id, "user": getUserId(e.target.value), "stage": "External"}
        setcurrDataUsers((data)=>{return [...data, newDAta]
    });
      }

      const handleChangeDirector = (e)=> {
        e.preventDefault()
        setdirector(e.target.value);
        let newDAta ={"kpi":kpi_id, "user": getUserId(e.target.value), "stage": "Director"}
        setcurrDataUsers((data)=>{return [...data, newDAta]
    });
      }

      const handleOnSubmit = (e) =>{
        // e.preventDefault();
        const data = currData
        fetch("https://kpiapi.mtandauza.com/editkpi",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        })
        for(let i=0; i<currDataUsers.length; i++)
        {
            fetch("https://kpiapi.mtandauza.com/addusertokpi",
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(currDataUsers[i])
            })
        }
      }

      handleSubmit(handleOnSubmit);

    const currKPI = getKPIData(params.id)

    console.log(currData)

    return(currData&&users&&departments&&
            <div>
                <div style={{ marginBottom: '50px' }}>
                    <NavigationBar/>
                </div>
                {console.log(users)}
                <Table>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Quarter</td>
                        <td>Year</td>
                        <td>Description</td>
                        <td>Target</td>
                    </tr>
                </thead>
                    <tbody>
                    
                        { currKPI &&
                            (
                                   <tr>
                                    <td>{currData.guid}</td>
                                     <td>{currData.quarter}</td>
                                     <td>{currData.year}</td>
                                     <td>{currData.description}</td>
                                     <td>{currData.target_quantitative}</td>
                                    </tr>
                            )
                        }
                    </tbody>
            </Table>
            <div style={{padding:'10px'}}>
                <Form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea"  value= {currData["description"]} onChange={handleChangeDescription} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Quarter</Form.Label>
                        <Form.Control type="text" {...register("quarter")} value= {currData["quarter"]} onChange={handleChangeQuarter} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Stage</Form.Label>
                        <Form.Control type="text" {...register("stage")} value= {currData["stage"]} onChange={handleChangeStage} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Quantitative Target</Form.Label>
                        <Form.Control type="number" {...register("quantitative_target")} value= {currData["target_quantitative"]} onChange={handleChangeTarget}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Reporting Lead</Form.Label>
                        <Form.Select aria-label="Default select example" {...register("reporting_lead")} value={reporting_lead} onChange={handleChangeReportingLead}>
                        <option value="">Select User</option>
                            {users.map((item)=>
                                <option key ={item.pk} >{`${item.first_name} ${item.last_name} ${item.email}`}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Manager</Form.Label>
                        <Form.Select aria-label="Default select example" name="manager" {...register("manager")} onChange={handleChangeManager}>
                        <option value="">Select User</option>
                            {users.map((item)=>
                                <option key ={item.pk} >{`${item.first_name} ${item.last_name} ${item.email}`}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Senior Manager</Form.Label>
                        <Form.Select aria-label="Default select example" {...register("senior_manager")} value={senior_manager} onChange={handleChangeSeniorManager}>
                        <option value="" >Select User</option>
                            {users.map((item)=>
                                <option key ={item.pk} >{`${item.first_name} ${item.last_name} ${item.email}`}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>

                    <Form.Label>External</Form.Label>
                        <Form.Select aria-label="Default select example" {...register("external")} value={external} onChange={handleChangeExternal}>
                        <option value="">Select User</option>
                            {users.map((item)=>
                                <option key ={item.pk} >{`${item.first_name} ${item.last_name} ${item.email}`}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Director</Form.Label>
                        <Form.Select aria-label="Default select example" {...register("director")} value={director} onChange={handleChangeDirector}>
                        <option value="">Select User</option>
                            {users.map((item)=>
                                <option key ={item.pk} >{`${item.first_name} ${item.last_name} ${item.email}`}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label>Narrative</Form.Label>
                        <Form.Control as="textarea" {...register("narrative")} value= {currData["comments_narrative"]} onChange={handleChangeNarrative}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Percentage weight</Form.Label>
                        <Form.Control type="number" {...register("weight")} value= {weight} onChange={handleChangeWeight} />
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Department</Form.Label>
                        <Form.Select aria-label="Default select example" {...register("department")} value={department} onChange={handleChangeDepartment}>
                        <option value="">Select Department</option>
                            {departments.map((item)=>
                                <option key ={item.guid} >{item.title}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Percentage weight</Form.Label>
                        <Form.Control type="number" value= {weight} onChange={handleChangeWeight} />
                    </Form.Group> */}
                    
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                    
                    
                    {/* {errors.narrative && <p>The narative field is required.</p>} */}
                </Form>
               
            </div>
            </div>
    )
}

export default KPIMetricView

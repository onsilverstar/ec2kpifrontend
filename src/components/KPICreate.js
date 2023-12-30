import React, {useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavigationBar from './Navbar';
import { useForm } from "react-hook-form";

const KPICreate = (props) =>
{
    let params = useParams()
    const [currData, setcurrData] = useState()
    const [users, setusers] = useState()
    const [currDataUsers, setcurrDataUsers] = useState([])
    const [kpi_id, setkpi_id] = useState([])
    const [target_quantitative, settarget_quantitative] = useState("")
    const [name, setname] = useState([])
    const [year, setyear] = useState("")
    const [departments, setdepartments] = useState("")


    const [quarter, setquarter] = useState("")
    const [description, setDescription] = useState("")
    const [comment, setcomment] = useState("")
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
            getUsers()
            getDepartments()
        }, []
    )


    const handleChangeName = (e)=> {
        e.preventDefault()
        setname(e.target.value)
        setcurrData((data)=>{
            return {...data,"name":e.target.value }})
            }
    
    const handleChangeComment = (e)=> {
                e.preventDefault()
                setcomment(e.target.value)
                setcurrData((data)=>{
                    return {...data,"comments":e.target.value }})
                    }
    const handleChangeYear = (e)=> {
                setyear(e.target.value)
                e.preventDefault()
                setcurrData((data)=>{
                    return {...data,"year":e.target.value }})
                    }

    const handleChangeQuarter = (e)=> {
        e.preventDefault()
        setquarter(e.target.value)
        setcurrData( (data) =>{
            return {...data, "quarter":e.target.value}});
      }

    //   const handleChangeStage = (e)=> {
    //     e.preventDefault()
    //     setstage(e.target.value)
    //     setcurrData((data)=>{return {...data, "stage":e.target.value}});
    //   }

      const handleChangeDescription = (e)=> {
        e.preventDefault()
        setDescription(e.target.value)
        setcurrData((data)=>{return {...data,"description":e.target.value}});
      }
    
      const handleChangeTarget = (e)=> {
        e.preventDefault()
        settarget_quantitative(e.target.value)
        setcurrData((data)=>{return {...data, "target_quantitative":e.target.value}});
      }

      const handleChangeReportingLead = (e)=> {
        e.preventDefault()
        setreporting_lead(e.target.value);
        let newDAta ={"user": getUserId(e.target.value), "stage": "Reporting_Lead"}
        setcurrDataUsers((data)=>{return [...data, newDAta]
    });
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

      const handleChangeManager = (e)=> {
        e.preventDefault()
        setmanager(e.target.value);
        let newDAta ={"user": getUserId(e.target.value), "stage": "Manager"}
        setcurrDataUsers((data)=>{return [...data, newDAta]
    });
      }

      const handleChangeSeniorManager = (e)=> {
        e.preventDefault()
        setsenior_manager(e.target.value);
        let newDAta ={"user": getUserId(e.target.value), "stage": "Senior_Manager"}
        setcurrDataUsers((data)=>{return [...data, newDAta]
    });
      }

      const handleChangeExternal = (e)=> {
        e.preventDefault()
        setexternal(e.target.value);
        let newDAta ={"user": getUserId(e.target.value), "stage": "External"}
        setcurrDataUsers((data)=>{return [...data, newDAta]
    });
      }

      const handleChangeDirector = (e)=> {
        e.preventDefault()
        setdirector(e.target.value);
        let newDAta ={"user": getUserId(e.target.value), "stage": "Director"}
        setcurrDataUsers((data)=>{return [...data, newDAta]
    });
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

      const getUsers = async ()=>
    {
        let response = await fetch("https://kpiapi.mtandauza.com/")
        let result = await response.json()
        setusers(result)
    }

    const getDepartments = async ()=>
    {
        let response = await fetch("https://kpiapi.mtandauza.com/department")
        let result = await response.json()
        setdepartments(result)
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

    let getNum = (val)=>{
        let result =0
        for(let i =0; i < val.length; i++)
        {
            result+= val.charCodeAt(i)
        }
        return result
    }

      const handleOnSubmit = (e) =>{
        e.preventDefault()
        let kpi = name+"_"+year+"_"+quarter
        setkpi_id(kpi)
        //setcurrData((data)=>{return {...data,"guid":kpi}})

        const data = currData
        data["guid"] = getNum(kpi)
        data["stage"] = "reporting_lead"
        console.log(data)
        console.log(currDataUsers)
        fetch("https://kpiapi.mtandauza.com/createkpi",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        }).then(
            ()=>{
                for(let i=0; i<currDataUsers.length; i++)
        {
            currDataUsers[i]["kpi"]= data["guid"]
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
        )
        
      }

    return(users&&departments&&
            <div>
                <div style={{ marginBottom: '50px' }}>
                    <NavigationBar/>
                </div>
            <div style={{padding:'10px'}}>
                <Form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" {...register("description", { required: true })} value={description} onChange={handleChangeDescription} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Quarter</Form.Label>
                        <Form.Control type="number" {...register("quarter", { required: true })}  value= {quarter} onChange={handleChangeQuarter} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" {...register("title", { required: true })} value={name} onChange={handleChangeName} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" {...register("year", { required: true })} value= {year} onChange={handleChangeYear} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Quantitative Target</Form.Label>
                        <Form.Control type="number" {...register("quantitative_target", { required: true })} value= {target_quantitative} onChange={handleChangeTarget}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Percentage weight</Form.Label>
                        <Form.Control type="number" {...register("weight", { required: true })} value= {weight} onChange={handleChangeWeight} />
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Department</Form.Label>
                        <Form.Select aria-label="Default select example" {...register("department", { required: true })} value={department} onChange={handleChangeDepartment}>
                        <option value="">Select Department</option>
                            {departments.map((item)=>
                                <option key ={item.guid} >{item.title}</option>
                            )}
                        </Form.Select>
                    </Form.Group>


                    <Form.Group>
                    <Form.Label>Reporting Lead</Form.Label>
                        <Form.Select aria-label="Default select example" {...register("reporting_lead", { required: true })} value={reporting_lead} onChange={handleChangeReportingLead}>
                        <option value="">Select User</option>
                            {users.map((item)=>
                                <option key ={item.pk} >{`${item.first_name} ${item.last_name} ${item.email}`}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Manager</Form.Label>
                        <Form.Select aria-label="Default select example" name="manager" {...register("manager", { required: true })} onChange={handleChangeManager}>
                        <option value="">Select User</option>
                            {users.map((item)=>
                                <option key ={item.pk} >{`${item.first_name} ${item.last_name} ${item.email}`}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Senior Manager</Form.Label>
                        <Form.Select aria-label="Default select example" {...register("senior_manager", { required: true })} value={senior_manager} onChange={handleChangeSeniorManager}>
                        <option value="" >Select User</option>
                            {users.map((item)=>
                                <option key ={item.pk} >{`${item.first_name} ${item.last_name} ${item.email}`}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>

                    <Form.Label>External</Form.Label>
                        <Form.Select aria-label="Default select example" {...register("external", { required: true })} value={external} onChange={handleChangeExternal}>
                        <option value="">Select User</option>
                            {users.map((item)=>
                                <option key ={item.pk} >{`${item.first_name} ${item.last_name} ${item.email}`}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Director</Form.Label>
                        <Form.Select aria-label="Default select example" {...register("director", { required: true })} value={director} onChange={handleChangeDirector}>
                        <option value="">Select User</option>
                            {users.map((item)=>
                                <option key ={item.pk} >{`${item.first_name} ${item.last_name} ${item.email}`}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label>Recommendation</Form.Label>
                        <Form.Control as="textarea" {...register("comment")} value= {comment} onChange={handleChangeComment}/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    {errors.reporting_lead && <p>The reporting lead field is required.</p>}
                    {errors.manager && <p>The manager field is required.</p>}
                    {errors.senior_manager && <p>The senior manager field is required.</p>}
                    {errors.external && <p>The external field is required.</p>}
                    {errors.director && <p>The director field is required.</p>}
                    {errors.department && <p>The department field is required.</p>}
                    {errors.weight && <p>The weight field is required.</p>}
                    {errors.description && <p>The description field is required.</p>}
                    {errors.quarter && <p>The quarter field is required.</p>}
                    {errors.title && <p>The title field is required.</p>}
                    {errors.year && <p>The year field is required.</p>}
                    {errors.quantitative_target && <p>The quantitative target field is required.</p>}
                    {/* {errors.comment && <p>The recommendation field is required.</p>} */}

                </Form>
            </div>
            </div>
    )
}

export default KPICreate

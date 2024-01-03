import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavigationBar from './components/Navbar';



const WeeklyMetricsView = (props) =>
{
    let params = useParams()
    const [currData, setcurrData] = useState()


    useEffect(
        ()=>{
            getcurrData(params.id).then((data)=>{
                setcurrData(data)
            })
        }, []
    )


    const getcurrData = async (id)=>{
        let response = await fetch("https://kpiapi.mtandauza.com/searchkpimeasure",
                {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({"guid":params.id})
                })
        let data = await response.json()
        return data[0]
    }


    const handleChangeComments = (e)=> {
        e.preventDefault()
        setcurrData((data)=>{
            return {...data,"comments":e.target.value }})
            }


    const handleChangeActualQuantitative = (e)=> {
        e.preventDefault()
        setcurrData( (data) =>{
            return {...data, "actual_quantitative":e.target.value}});
      }

      const handleChangeActualQualitative = (e)=> {
        e.preventDefault()
        setcurrData((data)=>{return {...data, "actual_qualitative":e.target.value}});
      }

      const handleChangeCycleTarget = (e)=> {
        e.preventDefault()
        setcurrData((data)=>{return {...data,"cycle_target_quantitative":e.target.value}});
      }

      const updateKPIs = async()=>{
        let data = await fetch("https://kpiapi.mtandauza.com/kpiupdatemeasure")
        data = await data.json()
    }
    
      const handleSubmit = async(e) =>{
        e.preventDefault()
        const data = currData
        const update = await fetch("https://kpiapi.mtandauza.com/editkpimeasure",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        })
        updateKPIs()
      }

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
                        <th>Operating Period</th>
                        <th>Actual Quantitative</th>
                        <th>Actual Qualitative</th>
                        <th>Comments</th>
                        <th>KPI</th>
                    </tr>
                </thead>
                    <tbody>
                    
                        { currData &&
                            (
                                   <tr>
                                        <td>1</td>
                                        <td>{currData.operating_period}</td>
                                        <td>{currData.actual_quantitative}</td>
                                        <td>{currData.actual_qualitative}</td>
                                        <td>{currData.comments}</td>
                                        <td>{currData.KPI}</td>
                                    </tr>
                            )
                        }
                    </tbody>
            </Table>
            <div> 
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control as="textarea"  value= {currData["comments"]} onChange={handleChangeComments} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Actual Quantitative</Form.Label>
                        <Form.Control type="text" value= {currData["actual_quantitative"]} onChange={handleChangeActualQuantitative} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Actual Qualitative</Form.Label>
                        <Form.Control type="text" value= {currData["actual_qualitative"]} onChange={handleChangeActualQualitative} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Cycle Target</Form.Label>
                        <Form.Control type="text" value= {currData["cycle_target_quantitative"]} onChange={handleChangeCycleTarget}/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
            </div>
    )
}

export default WeeklyMetricsView

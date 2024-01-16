import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';


const url_weekly_metrics = "https://cencleanback.mtandauza.com/kpimeasures"


const WeeklyMetrics = (props) =>
{
    const [weekly_metrics, setweekly_metrics] = useState([])
    const navigate = useNavigate()
    useEffect(
        ()=>{
           getWeeklyMetrics()
        }, []
    )
    let count = 1
    const getWeeklyMetrics = async ()=>
    {
        let response = await fetch(url_weekly_metrics)
        let result = await response.json()
        setweekly_metrics(result)
    }

    function handleClick(key){
        navigate(`/weeklymetrics/${key}`) 

    }

    return(
        <div>
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
                    
                        {
                            weekly_metrics.map
                            (
                                (item)=>
                                    <tr key={item["guid"]} onClick={(e)=>handleClick(item["guid"])}>
                                        <td>{count++}</td>
                                        <td>{item.operating_period}</td>
                                        <td>{item.actual_quantitative}</td>
                                        <td>{item.actual_qualitative}</td>
                                        <td>{item.comments}</td>
                                        <td>{item.KPI}</td>
                                    </tr>
                                
                            )
                        }
                    </tbody>
            </Table>
    
        </div>
    )
}

export default WeeklyMetrics

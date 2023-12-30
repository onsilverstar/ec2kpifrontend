import { Button } from 'bootstrap';
import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';


const url_kpi_metrics = "https://kpiapi.mtandauza.com/kpidashboard"


const KPIDashboard = (props) =>
{
    const [kpi_summ, setkpi_summ] = useState([])
    const navigate = useNavigate()
    useEffect(
        ()=>{
           getKPISumm()
        }, []
    )
    let count = 1
    const getKPISumm = async ()=>
    {
        let response = await fetch(url_kpi_metrics)
        let result = await response.json()
        setkpi_summ(result)
    }

    function handleClick(key){
        navigate(`/${key}`) 

    }

    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>KPI Ref</th>
                        <th>Description</th>
                        <th>YTD Target</th>
                        <th>YTD Actual</th>
                        <th>Reccommendations</th>
                    </tr>
                </thead>
                    <tbody>
                    
                        {
                            kpi_summ.map
                            (
                                (item)=>
                                    <tr key={item["KPI"]} onClick={(e)=>handleClick(item["KPI"])}>
                                        <td>{count++}</td>
                                        <td>{item.KPI}</td>
                                        <td>{item.description}</td>
                                        <td>{item.cycle_target_quantitative}</td>
                                        <td>{item.actual_quantitative}</td>
                                        <td>{item.comments_narrative}</td>
                                    </tr>
                                
                            )
                        }
                    </tbody>
            </Table>
    
        </div>
    )
}

export default KPIDashboard

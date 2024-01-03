import React, {useEffect, useRef, useState} from 'react'
import Table from 'react-bootstrap/esm/Table'
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from './Navbar';



const KPIs = (props)=>
{
    const [kpis, setkpis] =useState()
    const [kpisdeps, setkpideps] = useState()
    const [filter, setfilter] = useState()
    const [summ, setsumm] = useState()
    const curr_filter = useRef(props.title_filter)


    let params = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        setfilter(props.title_filter)
        getSumm(props.title_filter)
        getKPIS().then((data)=>{
            setkpis(data)
        })
    },[])


    let title = props.title_filter
    // console.log("Hi")
    console.log(title)

    const getKPISDeps = async ()=>{
        let response = await fetch("https://kpiapi.mtandauza.com/kpibydepartment")
        let data = await response.json()
        setkpideps(data)
        return data
    }

    // const getSumm = (data)=>{
    //     let result = []
    //     for (var entry in data)
    //     {
    //         let temp ={}
    //         let kpis = []
    //         temp["dept"] = entry
    //         temp["kpis"]= data[entry]
    //         if(data[entry].length!=0)
    //         {
    //             // for(let i = 0; i<data[entry].length; i++)
    //             // {
    //             //     //console.log(temp["kpis"][i]["fields"])
    //             //     if(data[entry][i]["fields"]["stage"]==props.title_filter)
    //             //     {
    //             //         kpis.push(data[entry][i])
    //             //     }
    //             // }
    //             result.push(temp)
    //         }
    //     }
    //     setsumm(result)

    //     console.log(result)

    // }

    const getSumm = async(filter)=>{
        let response = await fetch("https://kpiapi.mtandauza.com/kpibydepartment")
        let data = await response.json()
        let result = []
        for (var entry in data)
        {
            let temp ={}
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
            setsumm(result)
        }
        return result

    }
    const getKPIS = async ()=>{
        let response = await fetch("https://kpiapi.mtandauza.com/kpimetrics")
        let data = await response.json()
        let result = []
        if(data)
        {
            for(let i =0; i<data.length; i++)
                {
                    if(data[i]["stage"] == filter)
                    {
                        result.push(data[i])
                    }
                }
                data = result

        }
        setkpis(result)
        return data
    }

    function handleClick(key){
        // if(props.kpi == "edit")
        // {
        //     navigate(`/kpi/${key}`)
        // }
        //else
        {
            navigate(`/${key}/${title}`) 
        }
        

    }

    if((summ == undefined) || (summ.length == 0))
    {
        return (
            <div>
                <div style={{ marginBottom: '50px' }}>
                    <NavigationBar/>
                </div>
            </div>
    )
    }

    else if((summ != undefined) && (summ.length >0))
    {
        return (
            <div>
                <div style={{ marginBottom: '50px' }}>
                    <NavigationBar/>
                </div>
             {
                    (summ.map((element) => 
                        
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
                                {(element["kpis"]!=undefined)&&
                                    element["kpis"].map(
                                        (el)=>(
                                        <tr key={el["pk"]} onClick={(e)=>handleClick(el["pk"])}>
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
                } 
            </div>
    )
    }


}

export default KPIs

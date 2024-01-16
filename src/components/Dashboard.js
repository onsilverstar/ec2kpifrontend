import React, {useEffect, useState} from 'react'
import KPIDashboard from './KPIDashboard';
import './components.css'
import * as dfd from "danfojs"

const Dashboard = (props)=>
{
    const [kpi_measure, setkpi_measure]= useState([])
    const [kpi_metrics, setkpi_metrics]= useState([])
    const [kpi_summ, setkpi_summ]= useState([])
    useEffect(()=>{
            // getKPIMeasure().then(
            //     ()=>{
            //         processData()
            //     }
            // )
            //getKPIMetrics()
            getKPIMeasure()
        }
        ,[]
    )

    const getDecimal = (x) =>
    {
        return parseFloat(x)
    }
    const url = "https://cencleanback.mtandauza.com/kpimeasures"
    const url_kpi_metrics = "https://cencleanback.mtandauza.com/kpimetrics"

    let getKPIMeasure = async () =>{
        let response = await fetch(url)
        let data_kpi_measure = await response.json()
        setkpi_measure(data_kpi_measure)
        let kpi_measure_dataframe = new dfd.DataFrame(data_kpi_measure)
        kpi_measure_dataframe["cycle_target_quantitative"]=kpi_measure_dataframe["cycle_target_quantitative"].apply(getDecimal, { axis: 1 })
        kpi_measure_dataframe["actual_quantitative"]=kpi_measure_dataframe["actual_quantitative"].apply(getDecimal, { axis: 1 })
        let kpi_data_grp = kpi_measure_dataframe.groupby(["KPI"])
        let kpi_measure_cycle_sum = kpi_data_grp.col(["cycle_target_quantitative"]).sum()
        let kpi_measure_target_sum = kpi_data_grp.col(["actual_quantitative"]).sum()


        //get kpi_metrics data

        let kpi_metrics_data = await getKPIMetrics()
        setkpi_metrics(kpi_metrics_data)
        let kpi_metrics_dataframe = new dfd.DataFrame(kpi_metrics_data)
        kpi_metrics_dataframe.rename({ "guid": "KPI" }, { inplace: true })
        let kpi_summary = dfd.merge({ "left": kpi_metrics_dataframe, "right": kpi_measure_cycle_sum, "on": ["KPI"], how: "left" })
        kpi_summary = dfd.merge({ "left": kpi_summary, "right": kpi_measure_target_sum, "on": ["KPI"], how: "left" })
        setkpi_summ(dfd.toJSON(kpi_summary))

        //kpi_metrics_dataframe.print()
        //kpi_measure_dataframe.print()
    //     let data2 = { "A": [30, 1, 2, 3] ,
    //                 "B": [34, 4, 5, 6] ,
    //                 "C": [20, 20, 30, 40] }

    //     let df = new dfd.DataFrame(data2)
    //     df.print()

    //    let df_2 = df.loc({columns:["A", "C"]})

    //    df_2.print()

        
        // const csv = dfd.toJSON(json_data_grp)
        // console.log(csv)
        
    }

    let getKPIMetrics = async () =>{
        let response = await fetch(url_kpi_metrics)
        let data = await response.json()
        //setkpi_metrics(data)
        return data
    }

    let processData = async()=>
    {
        //Get both kpi measure and metrics dataframes
        //let kpi_metrics_dataframe = new dfd.DataFrame(kpi_metrics)
        let kpi_measure_dataframe = new dfd.DataFrame(kpi_measure)
        kpi_measure_dataframe["cycle_target_quantitative"]=kpi_measure_dataframe["cycle_target_quantitative"].apply(getDecimal, { axis: 1 })
        let kpi_data_grp = kpi_measure_dataframe.groupby(["KPI"])
        kpi_measure_dataframe = kpi_data_grp.col(["cycle_target_quantitative"]).sum().print()
    
    }

    
    return(
        <KPIDashboard/>
    )
}
export default Dashboard

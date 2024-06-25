import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Legend,
    Title,
    Tooltip,
    SubTitle
  } from 'chart.js';
  import { Line , Doughnut } from 'react-chartjs-2';

  ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Legend,
    Title,
    Tooltip,
    SubTitle
 )

export const LineChart = ({views=[]}) => {
    const labels= getAllMonths()
    const options={
        responsive : true,
        plugins : {
            legend : {
                position : "bottom",
            },
            title : {
                display : true,
                text : "Yearly Views"
            }
        }
    }
    const data={
        labels,
        datasets:[
            {
            label : "Views",
            data : views,
            borderColor : "rgba(107,70,103,0.5)",
            backgroundColor : "#6b46c1"
             }
    ]
    }
  return (
   <Line options={options} data={data}/>
  )
}

export const DoughnutChart = ({subscriptionData=[]}) =>{
    const data={
        labels:["Subscribers","Non-Subscribers"],
        datasets:[
            {
            label : "Views",
            data : subscriptionData,
            borderColor : ["rgb(62,12,171)","rgb(214,43,129)"],
            backgroundColor : ["rgba(62,12,171,0.3)","rgba(214,43,129,0.3)"],
            borderWidth : 1
             }
    ]
    }
    return(
        <Doughnut data={data}/>
    )
}

function getAllMonths(){
    const labels=[];
    const months=[
        "January",
        "February",
        "March",
        "April" , 
        "May", 
        "June",
         "July", 
         "August", 
         "September", 
         "October",
         "November",
         "December"
    ]
    const currentMonth = new Date().getMonth()
    const remainingMonths = 11 - currentMonth;

    for(let i=currentMonth;i>=0;i--){
        labels.unshift(months[i])
    }
    for(let i=11;i>11-remainingMonths;i--){
        labels.unshift(months[i])
    }

    return labels;
}
getAllMonths()





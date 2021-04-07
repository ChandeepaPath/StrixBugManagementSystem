import React,{useState, useEffect} from 'react'
import { Card, Badge,Button, Row, Col } from 'react-bootstrap';
import { Pie,Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function DevPerformance() {

     //-------------Developer Effort---------------
    //------------------Stacked bar chart for Developer * Bug development----------------
    const [test, setTest] =useState([]);
    const [avgEffort, setAvgEffort] = useState([]);
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/DeveloperPerformance/`, {
          method: "POST",
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           },
           body: JSON.stringify({ 
                    "projectid": "5",
                    "year": "2021",
                    "to": "2019-02-28",
                    "from": "2021-03-28" })
          
          })
       
        .then((res) => res.json())
        .then((response) => {
          setTest(response);
        })
       
        .catch((error) => console.log(error));
      },[])
    
      
     console.log("Hiii")
    
      if(test.data != null){
          console.log(test.data)
          let total_assigned =test.data.map(e=>e.total_assigned)
          let month =test.data.map(e=>e.date__month)
          let dailyeffort_avg = test.data.map(e=>e.dailyeffort__avg)
          let resolved = test.data.map(e=>e.resolved)
          let in_progress = test.data.map(e=>e.in_progress)
          console.log(total_assigned)
        console.log(total_assigned + " "+month+" " + dailyeffort_avg+ " "+ resolved + " "+ in_progress)
          
    
      
      let data_Total_assigned = [0,0,0,0,0,0,0,0,0,0,0]
      let data_Avg_dailyEffort = [0,0,0,0,0,0,0,0,0,0,0]
      let data_Resolved = [0,0,0,0,0,0,0,0,0,0,0]
      let data_in_progress = [0,0,0,0,0,0,0,0,0,0,0]
    //   let monthlist = [0,0,0,0,0,0,0,0,0,0,0];
    //   for(let  i=0 ; i<monthlist.length;i++){
    //       if(month[])
    //   }
    let count_Total_assigned =0;
    let count_resolved = 0;
    let count_in_progress =0;
     for(let i = 1 ; i<=12 ; i++){
         for(let m =0 ; m<month.length; m++){
            if(month[m] == i){
                //Add data to the stacked dataset
                count_Total_assigned= count_Total_assigned + total_assigned[m]
                count_resolved = count_resolved + resolved[m]
                count_in_progress =count_in_progress + in_progress[m];

                data_Total_assigned[m]= total_assigned[m]
                // data_Total_assigned[m] = total_assigned[m]
                data_Avg_dailyEffort[m] =  dailyeffort_avg[m]
                data_Resolved[m] = resolved[m]
                data_in_progress[m] = in_progress[m];
                console.log(count_Total_assigned + " " +count_resolved +" " +  count_in_progress )
                console.log( data_Total_assigned)
                console.log( data_Avg_dailyEffort )
                console.log( data_Resolved )
                console.log( data_in_progress )

            }

         }
        
     }
      console.log(data_Total_assigned)
      console.log(data_Avg_dailyEffort )
      console.log( data_Resolved)
      console.log(data_in_progress)


      setTest({
        
        labels: ["Jan", "Feb", "March", "Apr", "May", "June", "July","Aug","Sep", "Oct", "Nov","Dec"],
        datasets: [
          {
              label: "Total In-Progress",
              data:data_in_progress,
             backgroundColor: "rgba(255,99,132,0.8)",
             hoverBackgroundColor: "rgba(255,99,132,1)",
            //   backgroundColor: "rgba(54,162,235,0.8)",
            //   hoverBackgroundColor: "rgba(54,162,235,1)",
              hoverBorderWidth: 2,
              hoverBorderColor: "lightgrey",
            },
            {
              label: "Resolved",
              data: data_Resolved,
            //   backgroundColor: "rgba(255,206,90,0.8)",
            //   hoverBackgroundColor: "rgba(255,206,90,1)",
              backgroundColor: "rgba(54, 162, 235, 0.7)",
              hoverBackgroundColor: "rgba(54, 162, 235, 1)",
              
              hoverBorderWidth: 2,
              hoverBorderColor: "lightgrey",
            },
            // {
            //   label: "Total Assigned",
            //   data: data_Total_assigned,
            //   backgroundColor: "rgba(54,162,235,0.8)",
            //   hoverBackgroundColor: "rgba(54,162,235,1)",
            //   hoverBorderWidth: 2,
            //   hoverBorderColor: "lightgrey",
            // },
           
         
        ],
      });

      setAvgEffort({
        labels: ["Jan", "Feb", "March", "Apr", "May", "June", "July","Aug","Sep", "Oct", "Nov","Dec"],
        datasets: [
            {
                label:"Average Effort",
                data: data_Avg_dailyEffort,
                backgroundColor: "rgba(54, 162, 235, 0.7)",
                hoverBackgroundColor: "rgba(54, 162, 235, 1)",
                hoverBorderWidth: 2,
                hoverBorderColor: "lightgrey",
                
            }
        
          ],
      });

      setDevPerf(
        {
            labels:["Total Assigned", "Total Completed", "Total In progress"],
            datasets: [
                {
                    label: 'Developer Summary ',
                    data:[count_Total_assigned,count_resolved,count_in_progress ],
                    backgroundColor: [
                        'rgba(255,99,132,1)',
                        'rgba(255,206,90,1)',
                        'rgba(54,162,235,1)',
                        'rgba(25,159,64,1)',
                        'rgba(153,102,255,1)',

                    ],
                    pointBorderColor: 'rgba(255,206,86,0.2)'
                }

            ]
            
        }
       
    )
    }else{
         
    }
 

const options3 = {
  title: {
    display: true,
    text: "Developer x Average Effort",
    fontSize: 18,
    fontFamily: "Arial",
  },
  
};


   
  const options2 = {
    title: {
      display: true,
      text: "Developer x Bug Development",
      fontSize: 20,
      fontFamily: "Arial",
    },
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

    return (
        <div>
               <Row style={{marginBottom:10}}>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <div className="row">
                                    <div className="col" style={{}}>
                                        From
                                        <small><Calender/></small>
                                    </div>
                                    <div className="col">
                                        To
                                        <small><Calender/></small>
                                    </div>
                                    <div className="col" style={{}}>
                                        <Button className="btn-success rounded"><b>Filter </b></Button>
                                    </div>
                                </div>
                                <div className="row">


                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <Card >
                                    <div >
                                        <Pie data={devPerf} 
                                            options={options} 
                                         
                                            />
                                    </div>
                                </Card>
                               
                            </div>
                        </Row>
                    
                        <Row style={{marginBottom:20 , marginLeft:2}}>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                    <Card >
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                        <Bar data={test} options={options2} />
                                        </div>
                                    </Card>

                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                        <Card>
                                            <div  className="col-md-12 col-sm-12 col-xs-12">
                                                <Bar data={avgEffort} 
                                                    options={options3} 
                                                
                                                    />
                                            </div>
                                        </Card>
                                    
                                </div>  
                                
                        </Row>
        </div>
    )
}

export default DevPerformance

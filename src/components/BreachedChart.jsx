import React from 'react'
import { PieChart, Pie, Legend, ResponsiveContainer } from 'recharts';

const BreachedChart = ({handleClick}) => {
    
    const data1 = [
        { name: 'Margin Below 25%', value: 42,fill: "#F42200" },
        { name: 'Margin 26-40%', value:27,fill: "#2589FB" },
        { name: 'Margin 41-50%', value: 36,fill: "#03D952" }
      ];
  return (
    <>
      <h3 style={{fontFamily:'Epilogue', fontWeight:'700',textAlign:'center'}}>Breached Margin Breakup</h3>
      <div style={{position:'relative'}}>
        <div style={{height: 400}}>
            <ResponsiveContainer >
            <PieChart width={350} height={350}>
                <Pie data={data1} dataKey="value" cx="50%" cy="30%" innerRadius={55} outerRadius={80} fill="#82ca9d" label onClick={handleClick}/>
                {/* <Legend layout="vertical" verticalAlign="bottom" align="centre" iconType="circle" /> */}
            </PieChart>
            </ResponsiveContainer>
        </div>
            <div style={{position:'absolute',bottom:'10px',width:'100%' }} >
                <div>
                    <ul>
                        {data1.map(item => (
                            <li style={{color:item.fill,margin:'10px'}} className="legend-item">
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <span>{item.name}</span>
                                    <span>{item.value}</span>
                            </div></li>
                            
                        ))}
                    </ul>        
                </div>
            </div>
        
    </div> 
    </>
  )
}

export default BreachedChart

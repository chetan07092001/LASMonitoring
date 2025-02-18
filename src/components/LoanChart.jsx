import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LoanChart = ({handleClick}) => {
    const data = [
        {
          name: 'Below 3 Lakh',
          value: 50,
          "fill": "#4B7BEC"
        },{
            name: 'Between 3-5 Lakh',
            value: 25,
            "fill": "#FAB740"
          },
          {
            name: 'Above 5 Lakh',
            value: 35,
            "fill": "#F42200"
          }]
    return (
        <>
      <h3 style={{fontFamily:'Epilogue', fontWeight:'700',textAlign:'center'}}>Loan Amount</h3>
      <div style={{position:'relative'}}>
      <div style={{minHeight: 400}}>
        <ResponsiveContainer height={320} style={{marginLeft:'-20px'}}>
          <BarChart
            data={data}
          >
            <CartesianGrid stroke="3 3" />
            <XAxis dataKey='name' tick={false} />
            <YAxis />
            <Tooltip />
            {/* <Legend  layout="vertical" verticalAlign="bottom" align="right" payload={ [{ value:'Shares' , type: 'circle', color:"#5BC0DE" },{ value:'Mutual Funds' , type: 'circle', color: "#FFD700"},{ value:'Mutual Funds' , type: 'circle', color: "#FFD700"}]} /> */}
            <Bar dataKey="value" barSize={20}  onClick={handleClick}/>
          </BarChart>
        </ResponsiveContainer>
        </div>
        <div style={{position:'absolute',bottom:'-10px',width:'100%'}} >
                <div>
                    <ul>
                        {data.map(item => (
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
      );
}

export default LoanChart

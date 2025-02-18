import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChannelsChart = ({channeldata}) => {
    const data = [
        {
          name: 'Shares',
          value: channeldata.shares,
          "fill": "#4B7BEC"
        },{
            name: 'Mutual Funds',
            value: channeldata.fund,
            "fill": "#FAB740"
          }]
    return (
        <>
      <h3 style={{fontFamily:'Epilogue', fontWeight:'700'}}>Security Type</h3>
      <div style={{height: 200 }}>
        <ResponsiveContainer >
          <BarChart
            data={data}
          >
            <CartesianGrid stroke="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend  layout="vertical" verticalAlign="middle" align="right" payload={ [{ value:'Shares' , type: 'circle', color:"#5BC0DE" },{ value:'Mutual Funds' , type: 'circle', color: "#FFD700"}]} />
            <Bar dataKey="value" barSize={20}  activeBar={<Rectangle fill="blue" stroke="blue" />} />
          </BarChart>
        </ResponsiveContainer>
        </div>
    </>
      );
}

export default ChannelsChart

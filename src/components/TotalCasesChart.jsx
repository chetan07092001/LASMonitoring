import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const TotalCasesChart = ({barSize,handleClick,tick,branchdata}) => {

  const data = [
    { value: branchdata.pb,  "name": "Jabari Scott", "fill": "#2563a8" },
    { value: branchdata.saket, "name": "Glenmore Ellis", "fill": "#5BC0DE" },
    { value: branchdata.green, "name": "Khenan Foster", "fill": "#27ae60" },
    { value: branchdata.pitam, "name": "Abeni Clarke", "fill": "#E8A838" },
    { value: branchdata.noida, "name": "Isis Bennett", "fill": "#8a9bb5" }
  ];

  return (
    <>
      <div style={{ borderBottom: '1px solid #e4edf8', marginBottom: 12, paddingBottom: 8 }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: '#1a3a5c', margin: 0 }}>Total Cases by Relationship Manager</h3>
      </div>
      <div style={{height: 210 }}>
        <ResponsiveContainer >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4edf8" />
            <XAxis dataKey="name" tick={tick !== false ? { fontSize: 11, fill: '#9aabb8', fontFamily: "'DM Sans', sans-serif" } : false} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9aabb8', fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e4edf8', fontFamily: "'DM Sans', sans-serif", fontSize: 12 }} cursor={{ fill: 'rgba(37,99,168,0.06)' }} />
            <Legend layout="vertical" verticalAlign="top" align="right"
              wrapperStyle={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#6b7d96' }}
              payload={[
                { value: 'Jabari Scott', type: 'circle', color: "#2563a8" },
                { value: 'Glenmore Ellis', type: 'circle', color: "#5BC0DE" },
                { value: 'Khenan Foster', type: 'circle', color: "#27ae60" },
                { value: 'Abeni Clarke', type: 'circle', color: "#E8A838" },
                { value: 'Isis Bennett', type: 'circle', color: "#8a9bb5" },
              ]}
            />
            <Bar dataKey="value" barSize={barSize} activeBar={<Rectangle fill="#1a4a82" stroke="#1a4a82" />} onClick={handleClick} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default TotalCasesChart;

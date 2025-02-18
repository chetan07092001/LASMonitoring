import React from 'react'
import { PieChart, Pie, Legend, ResponsiveContainer } from 'recharts';

const PortfolioChart = ({portfoliodata}) => {
    const data1 = [
        { name: 'Breached Margin', value: portfoliodata.breached,fill: "#fb1d1d" },
        { name: 'Margin Under Review', value: portfoliodata.under ,fill: "#fab740" },
        { name: 'Within Margin', value: portfoliodata.within,fill: "#1dd75b" }
      ];
  return (
    <>
      <h3 style={{fontFamily:'Epilogue', fontWeight:'700'}}>Portfolio Health</h3>
      <div style={{height: 200 }}>
        <ResponsiveContainer>
          <PieChart width={270} height={270}>
            <Pie data={data1} dataKey="value" cx="50%" cy="48%" innerRadius={53} outerRadius={78} fill="#82ca9d" label />
            <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
    </div>
    </>
  )
}

export default PortfolioChart

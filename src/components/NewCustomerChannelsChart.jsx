import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NewCustomerChannelsChart = ({channeldata}) => {
    const data = [
        { name: 'Shares', value: channeldata.shares, fill: "#2563a8" },
        { name: 'Mutual Funds', value: channeldata.fund, fill: "#E8A838" },
    ];
    return (
        <>
          <div style={{ borderBottom: '1px solid #e4edf8', marginBottom: 12, paddingBottom: 8 }}>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: '#1a3a5c', margin: 0 }}>New Customer's Security Type</h3>
          </div>
          <div style={{ height: 210 }}>
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4edf8" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9aabb8', fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9aabb8', fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e4edf8', fontFamily: "'DM Sans', sans-serif", fontSize: 12 }} cursor={{ fill: 'rgba(37,99,168,0.06)' }} />
                <Legend layout="vertical" verticalAlign="middle" align="right"
                  wrapperStyle={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#6b7d96' }}
                  payload={[
                    { value: 'Shares', type: 'circle', color: "#2563a8" },
                    { value: 'Mutual Funds', type: 'circle', color: "#E8A838" },
                  ]}
                />
                <Bar dataKey="value" barSize={20} activeBar={<Rectangle fill="#1a4a82" stroke="#1a4a82" />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
    );
}

export default NewCustomerChannelsChart

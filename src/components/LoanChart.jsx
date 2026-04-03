import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LoanChart = ({ handleClick }) => {
    const data = [
        { name: 'Below 3 Lakh',     value: 50, fill: "#2563a8" },
        { name: 'Between 3-5 Lakh', value: 25, fill: "#E8A838" },
        { name: 'Above 5 Lakh',     value: 35, fill: "#C0392B" },
    ];

    return (
        <>
            <div style={{ borderBottom: '1px solid #e4edf8', marginBottom: 12, paddingBottom: 8 }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: '#1a3a5c', margin: 0 }}>
                    Loan Amount
                </h3>
            </div>

            <div style={{ height: 175 }}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e4edf8" />
                        <XAxis
                            dataKey="name"
                            tick={false}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#9aabb8', fontFamily: "'DM Sans', sans-serif" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: 8,
                                border: '1px solid #e4edf8',
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 12,
                                color: '#1a3a5c',
                            }}
                            cursor={{ fill: 'rgba(37,99,168,0.06)' }}
                        />
                        <Bar
                            dataKey="value"
                            barSize={28}
                            activeBar={<Rectangle fill="#1a4a82" stroke="#1a4a82" />}
                            onClick={handleClick}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <ul style={{ listStyle: 'none', padding: '6px 4px 0', margin: 0 }}>
                {data.map((item, index) => (
                    <li
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '5px 0',
                            borderBottom: index < data.length - 1 ? '1px solid #f0f4fa' : 'none',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{
                                display: 'inline-block',
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                backgroundColor: item.fill,
                                flexShrink: 0,
                            }} />
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#6b7d96' }}>
                                {item.name}
                            </span>
                        </div>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#1a3a5c' }}>
                            {item.value}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default LoanChart

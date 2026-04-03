import React from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

const BreachedChart = ({handleClick}) => {
    
    const data1 = [
        { name: 'Margin Below 25%', value: 42, fill: "#C0392B" },
        { name: 'Margin 26–40%',    value: 27, fill: "#2563a8" },
        { name: 'Margin 41–50%',    value: 36, fill: "#27ae60" }
    ];

    return (
        <>
            <div style={{ borderBottom: '1px solid #e4edf8', marginBottom: 12, paddingBottom: 8 }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: '#1a3a5c', margin: 0 }}>
                    Breached Margin Breakup
                </h3>
            </div>

            <div style={{ height: 175 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data1}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={76}
                            onClick={handleClick}
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                            labelLine={{ stroke: '#9aabb8', strokeWidth: 1 }}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: 8,
                                border: '1px solid #e4edf8',
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 12,
                                color: '#1a3a5c',
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <ul style={{ listStyle: 'none', padding: '6px 4px 0', margin: 0 }}>
                {data1.map((item, index) => (
                    <li
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '5px 0',
                            borderBottom: index < data1.length - 1 ? '1px solid #f0f4fa' : 'none',
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

export default BreachedChart

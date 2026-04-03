import React from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const PortfolioChart = ({ portfoliodata, portfolioHealthdata }) => {
  console.log("portfoliodata", portfoliodata);

  const sanctionTotals = React.useMemo(() => {
    if (!portfolioHealthdata || portfolioHealthdata.length === 0) {
      return { breached: portfoliodata.breached, under: portfoliodata.under, within: portfoliodata.within };
    }
    let breached = 0, under = 0, within = 0;
    portfolioHealthdata.forEach((item) => {
      const pct = item.marginAvailablePercentage;
      const amt = item.sanctionAmount || 0;
      if (pct >= 40) {
        breached += amt;
      } else if (pct >= 25) {
        under += amt;
      } else {
        within += amt;
      }
    });
    return { breached, under, within };
  }, [portfolioHealthdata, portfoliodata]);


  const fmt = (amt) => amt.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const data1 = [
    { name: `Breached Margin (${fmt(sanctionTotals.breached)})`, value: portfoliodata.breached, fill: "#C0392B" },
    { name: `Margin Under Review (${fmt(sanctionTotals.under)})`, value: portfoliodata.under, fill: "#E8A838" },
    { name: `Within Margin (${fmt(sanctionTotals.within)})`, value: portfoliodata.within, fill: "#27ae60" }
  ];
  return (
    <>
      <div style={{ borderBottom: '1px solid #e4edf8', marginBottom: 12, paddingBottom: 8 }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: '#1a3a5c', margin: 0 }}>Portfolio Health</h3>
      </div>
      <div style={{ height: 210 }}>
        <ResponsiveContainer>
          <PieChart width={270} height={270}>
            <Pie data={data1} dataKey="value" cx="50%" cy="48%" innerRadius={53} outerRadius={78} fill="#82ca9d" label />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e4edf8', fontFamily: "'DM Sans', sans-serif", fontSize: 12 }} />
            <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" wrapperStyle={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#6b7d96' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default PortfolioChart

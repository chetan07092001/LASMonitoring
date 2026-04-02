import { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart, PieChart, Pie, Cell } from "recharts";

const collateralData = [
  { month: "Jan", value: 7400000 },
  { month: "Feb", value: 7350000 },
  { month: "Mar", value: 7200000 },
  { month: "Apr", value: 7100000 },
  { month: "May", value: 6900000 },
  { month: "Jun", value: 6700000 },
  { month: "Jul", value: 6400000 },
  { month: "Aug", value: 6100000 },
  { month: "Sep", value: 5900000 },
  { month: "Oct", value: 5750000 },
  { month: "Nov", value: 5600000 },
  { month: "Dec", value: 5450000 },
];

const portfolioData = [
  { month: "Jan", exposure: 50000000, collateral: 62000000 },
  { month: "Mar", exposure: 52000000, collateral: 65000000 },
  { month: "May", exposure: 51000000, collateral: 67000000 },
  { month: "Jul", exposure: 53000000, collateral: 68000000 },
  { month: "Sep", exposure: 54000000, collateral: 67000000 },
  { month: "Sep2", exposure: 48500000, collateral: 62300000 },
];

const riskData = [
  { name: "Low", value: 55, color: "#2E6DB4" },
  { name: "Medium", value: 30, color: "#E8A838" },
  { name: "High", value: 15, color: "#C0392B" },
];

const alerts = [
  { type: "error", label: "Margin Call:", detail: "John Smith – Action Required!", icon: "🔴" },
  { type: "warning", label: "Covenant Breach:", detail: "XYZ Corp – LTV Exceeded", icon: "🟠" },
  { type: "warning", label: "KYC Update Needed:", detail: "DEF Capital", icon: "🟠" },
  { type: "warning", label: "Review SACA Agreement for GHI Fund", detail: "", icon: "🟠" },
];

const completedTasks = [
  "Send Notice of Exclusive Control",
  "Verify Updated Financials",
  "Complete KYC Review",
];

const formatM = (v) => `$${(v / 1000000).toFixed(1)}M`;
const formatShortM = (v) => `$${(v / 1000000).toFixed(0)}M`;

const StatCard = ({ label, value, accent }) => (
  <div style={{
    background: accent ? "linear-gradient(135deg, #1a4a82 0%, #2563a8 100%)" : "linear-gradient(135deg, #8a9bb5 0%, #6b7d96 100%)",
    borderRadius: 10,
    padding: "18px 22px",
    color: "#fff",
    minWidth: 140,
    flex: 1,
    boxShadow: "0 4px 18px rgba(0,0,0,0.13)",
  }}>
    <div style={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.82, marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: 30, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "-0.5px" }}>{value}</div>
  </div>
);

const ComplianceBadge = ({ label }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 10,
    background: "#f0f6ff",
    border: "1px solid #d0e4f7",
    borderRadius: 8,
    padding: "10px 16px",
    fontSize: 13,
    color: "#1a3a5c",
    fontFamily: "'DM Sans', sans-serif",
  }}>
    <span style={{ color: "#2E6DB4", fontSize: 16 }}>✅</span>
    {label}
  </div>
);

export default function SecurityDashboard() {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 100); }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#eef2f7",
      fontFamily: "'DM Sans', sans-serif",
      padding: 0,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* Navbar */}
      {/* <div style={{
        background: "linear-gradient(90deg, #0d2d54 0%, #1a4a82 100%)",
        padding: "0 32px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
      }}>
        <div style={{ color: "#fff", fontSize: 18, fontFamily: "'DM Sans', sans-serif" }}>
          <span style={{ fontWeight: 400 }}>Securities-Backed Loan</span>
          <span style={{ fontWeight: 700, marginLeft: 6 }}>Portfolio Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: 18, color: "rgba(255,255,255,0.8)", fontSize: 20 }}>
          <span style={{ cursor: "pointer" }}>🔔</span>
          <span style={{ cursor: "pointer" }}>🔕</span>
          <span style={{ cursor: "pointer" }}>☰</span>
        </div>
      </div> */}

      <div style={{ padding: "24px 32px", maxWidth: 1400, margin: "0 auto" }}>

        {/* KPI Row */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "flex-start" }}>
          <StatCard label="Total Loans" value="25" accent />
          <StatCard label="Total Exposure" value="$48.5M" accent />
          <StatCard label="Collateral Value" value="$62.3M" accent />
          <StatCard label="Avg. Loan-to-Value" value="78%" />

          {/* Risk Pie */}
          <div style={{
            background: "#fff",
            borderRadius: 10,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            minWidth: 200,
          }}>
            <PieChart width={100} height={100}>
              <Pie data={riskData} cx={45} cy={45} innerRadius={28} outerRadius={46} dataKey="value" startAngle={90} endAngle={-270}>
                {riskData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#1a3a5c", marginBottom: 6 }}>Risk Overview</div>
              {riskData.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#444", marginBottom: 3 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: r.color, display: "inline-block" }} />
                  {r.value}% {r.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr 280px", gap: 20 }}>

          {/* LEFT: Borrower Overview */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1a3a5c", marginBottom: 14 }}>Borrower Overview</div>
              <div style={{ border: "1px solid #e4edf8", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ background: "#f5f8fc", padding: "10px 16px", fontWeight: 600, fontSize: 13, color: "#1a3a5c", borderBottom: "1px solid #e4edf8" }}>
                  John Smith
                </div>
                {[
                  ["Loan Balance", "$8,250,000"],
                  ["Interest Rate", "4.5%"],
                  ["Maturity Date", "12/15/2024"],
                  ["Current LTV", "82%"],
                ].map(([k, v], i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "10px 16px",
                    borderBottom: i < 3 ? "1px solid #f0f4fa" : "none",
                    fontSize: 13,
                    color: "#3a4a5c",
                  }}>
                    <span style={{ color: "#6b7d96" }}>{k}</span>
                    <span style={{ fontWeight: 700, color: "#1a3a5c" }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Account Table */}
              <div style={{ marginTop: 16, border: "1px solid #e4edf8", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 16px", background: "#f5f8fc", borderBottom: "1px solid #e4edf8", fontSize: 12, fontWeight: 600, color: "#6b7d96" }}>
                  <span>Account</span><span>Market Value</span>
                </div>
                {[
                  ["#23456 – Investment Account", "$5,800,000"],
                  ["#98765 – Bond Portfolio", "$2,100,000"],
                  ["Cash Account", "$400,000"],
                ].map(([acc, val], i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "9px 16px",
                    borderBottom: i < 2 ? "1px solid #f0f4fa" : "none",
                    fontSize: 13,
                  }}>
                    <span style={{ color: "#2563a8", fontWeight: 500 }}>{acc}</span>
                    <span style={{ fontWeight: 700, color: "#1a3a5c" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance */}
            <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1a3a5c", marginBottom: 14 }}>Compliance Status</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {["KYC Verified", "UCC Filings", "Filed", "SACA Status", "Active Control"].map((item, i) => (
                  <ComplianceBadge key={i} label={item} />
                ))}
              </div>
            </div>
          </div>

          {/* CENTER */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Collateral Monitoring */}
            <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1a3a5c" }}>Collateral Monitoring</div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#1a3a5c", fontFamily: "'DM Sans', sans-serif" }}>LTV: <span style={{ color: "#C0392B" }}>82%</span></div>
                  <div style={{ background: "#C0392B", color: "#fff", borderRadius: 6, padding: "3px 12px", fontSize: 12, fontWeight: 700, marginTop: 4, textAlign: "center" }}>High Risk</div>
                  <div style={{ fontSize: 12, color: "#6b7d96", marginTop: 6 }}>Margin Call Threshold: <span style={{ color: "#E8A838", fontWeight: 700 }}>$7.5M</span></div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={collateralData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563a8" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563a8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9aabb8" }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={formatM} tick={{ fontSize: 11, fill: "#9aabb8" }} axisLine={false} tickLine={false} width={52} />
                  <Tooltip formatter={(v) => formatM(v)} labelStyle={{ fontSize: 12 }} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <ReferenceLine y={7500000} stroke="#C0392B" strokeDasharray="6 4" label={{ value: "Margin Call Triggered", position: "insideTopRight", fill: "#C0392B", fontSize: 11, fontWeight: 700 }} />
                  <Area type="monotone" dataKey="value" stroke="#2563a8" fill="url(#colGrad)" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Alerts & Tasks */}
            <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1a3a5c", marginBottom: 14 }}>Alerts & Tasks</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {alerts.map((a, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 14px",
                    borderRadius: 8,
                    background: a.type === "error" ? "#fff5f5" : "#fffaf0",
                    border: `1px solid ${a.type === "error" ? "#fbd2cc" : "#fde8b4"}`,
                    fontSize: 13,
                  }}>
                    <span style={{ fontSize: 16 }}>{a.icon}</span>
                    <span>
                      <span style={{ fontWeight: 700, color: a.type === "error" ? "#C0392B" : "#b87300" }}>{a.label} </span>
                      <span style={{ color: "#1a3a5c" }}>{a.detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Completed Tasks */}
            <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1a3a5c", marginBottom: 14 }}>Alerts & Tasks</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {completedTasks.map((t, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 14px",
                    borderRadius: 8,
                    background: "#f0faf4",
                    border: "1px solid #b7e4c7",
                    fontSize: 13,
                    color: "#1a4a2e",
                  }}>
                    <span style={{ color: "#27ae60", fontSize: 16 }}>✅</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Trends */}
            <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1a3a5c", marginBottom: 14 }}>Portfolio Trends</div>
              <ResponsiveContainer width="100%" height={190}>
                <AreaChart data={portfolioData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563a8" stopOpacity={0.13} />
                      <stop offset="95%" stopColor="#2563a8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#27ae60" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#27ae60" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9aabb8" }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={formatShortM} tick={{ fontSize: 10, fill: "#9aabb8" }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip formatter={(v) => formatM(v)} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Area type="monotone" dataKey="exposure" stroke="#2563a8" fill="url(#expGrad)" strokeWidth={2} dot={{ r: 3, fill: "#2563a8" }} name="Exposure" />
                  <Area type="monotone" dataKey="collateral" stroke="#27ae60" fill="url(#colGrad2)" strokeWidth={2} dot={{ r: 3, fill: "#27ae60" }} name="Collateral" />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8 }}>
                <span style={{ fontSize: 11, color: "#2563a8", display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 16, height: 2, background: "#2563a8", display: "inline-block" }} /> Exposure</span>
                <span style={{ fontSize: 11, color: "#27ae60", display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 16, height: 2, background: "#27ae60", display: "inline-block" }} /> Collateral</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

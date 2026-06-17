"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function EarningsArea({
  data,
}: {
  data: { date: string; total: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ left: -10, right: 10, top: 10 }}>
        <defs>
          <linearGradient id="mc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#27d8a0" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#27d8a0" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e3e9f2" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#5a6a85" }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#5a6a85" }} tickLine={false} axisLine={false} width={50} />
        <Tooltip
          formatter={(v) => [`₹${Number(v).toLocaleString("en-IN")}`, "Cumulative"]}
          contentStyle={{ borderRadius: 12, border: "1px solid #e3e9f2", fontSize: 13 }}
        />
        <Area type="monotone" dataKey="total" stroke="#02a37a" strokeWidth={2.5} fill="url(#mc)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function EarningsByBar({
  data,
}: {
  data: { name: string; amount: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ left: -10, right: 10, top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e3e9f2" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#5a6a85" }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#5a6a85" }} tickLine={false} axisLine={false} width={50} />
        <Tooltip
          formatter={(v) => [`₹${Number(v).toLocaleString("en-IN")}`, "Earned"]}
          contentStyle={{ borderRadius: 12, border: "1px solid #e3e9f2", fontSize: 13 }}
          cursor={{ fill: "rgba(2,163,122,0.06)" }}
        />
        <Bar dataKey="amount" fill="#02a37a" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

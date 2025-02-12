// ChartUserRole.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ChartUserRole = () => {
  // Data statis untuk contoh
  const data = [
    { name: 'Admin', value: 2 },
    { name: 'Guru', value: 15 },
    { name: 'Siswa', value: 45 },
    { name: 'Guest', value: 8 },
  ];

  // Warna untuk setiap role
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#2C3141] p-4 rounded-lg border border-white/10">
          <p className="text-white font-medium">{`${payload[0].name}`}</p>
          <p className="text-cyan-400">{`Total: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-white/10 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-blue mb-4">Distribusi User Berdasarkan Role</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value) => <span className="text-white">{value}</span>}
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartUserRole;
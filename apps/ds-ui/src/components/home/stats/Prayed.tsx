import React from 'react';
import { ActionStats } from '@devouringscripture/common';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';

interface iPrayed {
  stats: ActionStats;
}
export const Prayed = ({ stats }: iPrayed) => {
  const dataset = [
    { name: 'Prayed', value: stats.prayed },
    { name: "Didn't Pray", value: stats.dataSize - stats.prayed },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={dataset}
          dataKey="value"
          nameKey="name"
          label={(entry) => entry.name}
          className="pie-slice-1"
          innerRadius={60}
          outerRadius={90}
        >
          {dataset.map((entry, index) => (
            <Cell key={`cell-${index}`} className={`pie-slice-${index % 7}`} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

import React from 'react';
import { ActionStats } from '@devouringscripture/common';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface IOldVsNew {
  stats: ActionStats;
}
export const OldVsNew = ({ stats }: IOldVsNew) => {
  const data = [
    { name: 'Old Testament', value: stats.readLongOT + stats.readShortOT },
    { name: 'New Testament', value: stats.readLongNT + stats.readShortNT },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" innerRadius={60} outerRadius={90} label={(entry) => entry.name}>
          {data.map((item, index) => (
            <Cell key={`cell-${index}`} className={`pie-slice-${index % 7}`} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

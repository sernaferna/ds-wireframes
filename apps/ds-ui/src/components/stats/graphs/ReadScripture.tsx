import React from 'react';
import { ActionStats } from '@devouringscripture/common';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';

interface IReadScripture {
  stats: ActionStats;
}

/**
 * Graph for statistics around Scripture readings
 *
 * @param stats Statistics to be rendered
 */
export const ReadScripture = ({ stats }: IReadScripture) => {
  const readUnreadData = [
    { name: 'Read', value: stats.readScripture },
    { name: `Didn't Read`, value: stats.dataSize - stats.readScripture },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={readUnreadData}
          dataKey="value"
          nameKey="name"
          label={(entry) => entry.name}
          className="pie-slice-1"
          innerRadius={60}
          outerRadius={90}
        >
          {readUnreadData.map((entry, index) => (
            <Cell key={`cell-${index}`} className={`pie-slice-${index % 7}`} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

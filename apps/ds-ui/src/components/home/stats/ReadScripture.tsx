import React from 'react';
import { ActionStats } from '@devouringscripture/common';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';

interface ReadScriptureInterface {
  stats: ActionStats;
}
export const ReadScripture = (props: ReadScriptureInterface) => {
  const readUnreadData = [
    { name: 'Read', value: props.stats.readScripture },
    { name: `Didn't Read`, value: props.stats.dataSize - props.stats.readScripture },
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

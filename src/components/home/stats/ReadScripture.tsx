import React from 'react';
import { ActionStats } from '../../../datamodel/Action';
import { ResponsiveContainer, PieChart, Pie, Tooltip } from 'recharts';

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
        ></Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

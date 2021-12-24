import React from 'react';
import { ActionStats } from '@devouringscripture/common/src/dm/Action';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface OvNInterface {
  stats: ActionStats;
}
export const OldVsNew = (props: OvNInterface) => {
  const data = [
    { name: 'Old Testament', value: props.stats.readLongOT + props.stats.readShortOT },
    { name: 'New Testament', value: props.stats.readLongNT + props.stats.readShortNT },
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

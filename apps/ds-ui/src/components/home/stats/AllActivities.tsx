import React from 'react';
import { ActionStats } from '@devouringscripture/common';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';

interface IAllActivities {
  stats: ActionStats;
}
export const AllActivities = ({ stats }: IAllActivities) => {
  const data = [
    {
      name: 'Reading',
      children: [
        {
          name: 'Short OT',
          value: stats.readShortOT,
        },
        {
          name: 'Long OT',
          value: stats.readLongOT,
        },
        {
          name: 'Short NT',
          value: stats.readShortNT,
        },
        {
          name: 'Long NT',
          value: stats.readLongNT,
        },
      ],
    },
    {
      name: 'Social',
      children: [
        {
          name: 'Convo',
          value: stats.conversed,
        },
        {
          name: 'Pray',
          value: stats.prayed,
        },
      ],
    },
    {
      name: 'Creative',
      children: [
        {
          name: 'Journal',
          value: stats.journaled,
        },
      ],
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap data={data} dataKey="value">
        <Tooltip />
      </Treemap>
    </ResponsiveContainer>
  );
};

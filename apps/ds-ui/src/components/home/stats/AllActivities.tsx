import React from 'react';
import { ActionStats } from '@devouringscripture/common';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';

interface AllActivitiesInterface {
  stats: ActionStats;
}
export const AllActivities = (props: AllActivitiesInterface) => {
  const data = [
    {
      name: 'Reading',
      children: [
        {
          name: 'Short OT',
          value: props.stats.readShortOT,
        },
        {
          name: 'Long OT',
          value: props.stats.readLongOT,
        },
        {
          name: 'Short NT',
          value: props.stats.readShortNT,
        },
        {
          name: 'Long NT',
          value: props.stats.readLongNT,
        },
      ],
    },
    {
      name: 'Social',
      children: [
        {
          name: 'Convo',
          value: props.stats.conversed,
        },
        {
          name: 'Pray',
          value: props.stats.prayed,
        },
      ],
    },
    {
      name: 'Creative',
      children: [
        {
          name: 'Journal',
          value: props.stats.journaled,
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

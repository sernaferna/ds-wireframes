import React from 'react';
import { ActionStats } from '../../../datamodel/Action';
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip } from 'recharts';

interface DetailedReadingInterface {
  stats: ActionStats;
}
export const DetailedReading = (props: DetailedReadingInterface) => {
  const data = [
    {
      name: 'Long OT',
      value: props.stats.readLongOT,
    },
    {
      name: 'Short OT',
      value: props.stats.readShortOT,
    },
    { name: 'Long NT', value: props.stats.readLongNT },
    {
      name: 'Short NT',
      value: props.stats.readShortNT,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <Bar dataKey="value" />
        <YAxis />
        <XAxis dataKey="name" angle={-45} height={50} />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
};

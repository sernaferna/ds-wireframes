import React from 'react';
import { ActionStats } from '@devouringscripture/common';
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip } from 'recharts';

interface IDetailedReading {
  stats: ActionStats;
}

/**
 * Graph for detailed reading activities.
 *
 * @param stats Stats to be rendered
 */
export const DetailedReading = ({ stats }: IDetailedReading) => {
  const data = [
    {
      name: 'Long OT',
      value: stats.readLongOT,
    },
    {
      name: 'Short OT',
      value: stats.readShortOT,
    },
    { name: 'Long NT', value: stats.readLongNT },
    {
      name: 'Short NT',
      value: stats.readShortNT,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <Bar dataKey="value" />
        <YAxis />
        <XAxis dataKey="name" />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
};

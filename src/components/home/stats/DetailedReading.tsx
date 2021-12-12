import React from 'react';
import { ActionStats } from '../../../datamodel/Action';
import { VictoryBar, VictoryContainer, VictoryChart, VictoryAxis } from 'victory';

interface DetailedReadingInterface {
  stats: ActionStats;
}
export const DetailedReading = (props: DetailedReadingInterface) => {
  const data = [
    { x: 'Long OT Passages', y: props.stats.readLongNT },
    { x: 'Short OT Passages', y: props.stats.readShortOT },
    { x: 'Long NT Passages', y: props.stats.readLongNT },
    { x: 'Short NT Passages', y: props.stats.readShortNT },
  ];

  return (
    <>
      <VictoryChart domainPadding={20}>
        <VictoryAxis style={{ tickLabels: { angle: 45, verticalAnchor: 'middle', textAnchor: 'start' } }} />
        <VictoryBar
          data={data}
          style={{ data: { fill: 'green' } }}
          barRatio={0.75}
          containerComponent={<VictoryContainer responsive={true} />}
          animate={{ duration: 500 }}
        />
      </VictoryChart>
    </>
  );
};

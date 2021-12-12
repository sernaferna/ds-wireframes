import React from 'react';
import { ActionStats } from '../../../datamodel/Action';
import { VictoryPie, VictoryContainer } from 'victory';

interface OvNInterface {
  stats: ActionStats;
}
export const OldVsNew = (props: OvNInterface) => {
  const data = [
    { x: 'Old Testament', y: props.stats.readLongOT + props.stats.readShortOT },
    { x: 'New Testament', y: props.stats.readLongNT + props.stats.readShortNT },
  ];

  const colourScale = ['green', 'gray'];

  const animateSettings = {
    duration: 2500,
    onLoad: {
      duration: 2500,
    },
  };

  return (
    <VictoryPie
      data={data}
      colorScale={colourScale}
      innerRadius={100}
      animate={animateSettings}
      containerComponent={<VictoryContainer responsive={true} />}
    />
  );
};

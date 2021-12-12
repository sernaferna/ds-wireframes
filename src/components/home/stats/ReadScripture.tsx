import React from 'react';
import { ActionStats } from '../../../datamodel/Action';
import { VictoryPie, VictoryContainer } from 'victory';

interface ReadScriptureInterface {
  stats: ActionStats;
}
export const ReadScripture = (props: ReadScriptureInterface) => {
  const data = [
    { x: 'Read', y: props.stats.readScripture },
    { x: `Didn't Read`, y: props.stats.dataSize - props.stats.readScripture },
  ];

  const colourScale = ['green', 'gray '];

  const animateSettings = {
    duration: 2500,
    onLoad: {
      duration: 2500,
    },
  };

  return (
    <>
      <VictoryPie
        data={data}
        colorScale={colourScale}
        innerRadius={100}
        animate={animateSettings}
        containerComponent={<VictoryContainer responsive={true} />}
      />
    </>
  );
};

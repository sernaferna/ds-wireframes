import React from 'react';

export enum RenderType {
  Internal = 0,
  External = 1,
}

interface PassageMD {
  passage: string;
  renderType: RenderType;
  version: string;
}

export function RenderPassage(props: PassageMD) {
  if (props.renderType === RenderType.External) {
    const url = `https://biblegateway.com/passage/?search=${props.passage}&version=${props.version}`;
    return <iframe src={url} height="500px" className="m-2 shadow" title={props.passage}></iframe>;
  }

  return <div className="shadow">{props.passage}</div>;
}

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

export class RenderPassage extends React.Component<{ metadata: PassageMD }> {
  render() {
    if (this.props.metadata.renderType === RenderType.External) {
      const url = `https://biblegateway.com/passage/?search=${this.props.metadata.passage}&version=${this.props.metadata.version}`;
      return <iframe src={url} height="500px" className="m-2 shadow" title={this.props.metadata.passage}></iframe>;
    }

    return <div className="shadow">{this.props.metadata.passage}</div>;
  }
}

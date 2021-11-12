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
      return <iframe src={url} className="m-2" title={this.props.metadata.passage}></iframe>;
    }

    return <div>{this.props.metadata.passage}</div>;
  }
}

import React from 'react';
import { BibleView } from '../bible/BibleView';

export class ReadPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Read Page</h1>
        <BibleView />
      </div>
    );
  }
}

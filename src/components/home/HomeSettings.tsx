import React from 'react';
import Form from 'react-bootstrap/Form';

export class HomeSettings extends React.Component {
  render() {
    return (
      <Form>
        <Form.Check type="checkbox" id="showGraphsCheckbox" label="Show Graphs" />
      </Form>
    );
  }
}

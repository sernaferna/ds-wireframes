import React from 'react';
import Form from 'react-bootstrap/Form';

export function HomeSettings() {
  return (
    <Form>
      <Form.Check type="checkbox" id="showGraphsCheckbox" label="Show Graphs" />
    </Form>
  );
}

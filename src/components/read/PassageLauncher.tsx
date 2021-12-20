import React, { useState, ChangeEvent } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { BookmarkFill, CardText } from 'react-bootstrap-icons';
import { useNewItemMutation } from '../../services/PassagesService';
import { BasePassage } from '../../datamodel/Passage';

interface PassageLauncherInterface {
  defaultVersion: string;
}
export const PassageLauncher = (props: PassageLauncherInterface) => {
  const [reference, updateReference] = useState('');
  const [version, updateVersion] = useState(props.defaultVersion);
  const [newItem] = useNewItemMutation();

  const handleReferenceChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateReference(event.target.value);
  };

  const handleVersionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateVersion(event.target.value);
  };

  const addPassage = () => {
    const newPassage: BasePassage = {
      reference,
      version,
    };

    newItem(newPassage);
  };

  return (
    <Row>
      <Form>
        <Row xs="12">
          <Col xs="12" md="2">
            <h4>Read Passage</h4>
          </Col>
          <Col xs="12" md="5">
            <InputGroup>
              <InputGroup.Text id="passageIcon">
                <CardText />
              </InputGroup.Text>
              <FormControl
                aria-label="Passage"
                placeholder="Rom 1:1"
                type="text"
                size="sm"
                value={reference}
                aria-describedby="passageIcon"
                onChange={handleReferenceChange}
              />
            </InputGroup>
          </Col>
          <Col xs="12" md="4">
            <InputGroup>
              <InputGroup.Text id="versionIcon">
                <BookmarkFill />
              </InputGroup.Text>
              <Form.Select
                value={version}
                onChange={handleVersionChange}
                aria-label="Version"
                aria-describedby="versionIcon"
                size="sm"
              >
                <option>Choose Version...</option>
                <option value="NIV">NIV</option>
                <option value="ESV">ESV</option>
              </Form.Select>
            </InputGroup>
          </Col>
          <Col xs="12" md="1">
            <Button variant="primary" onClick={() => addPassage()} size="sm">
              Go
            </Button>
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

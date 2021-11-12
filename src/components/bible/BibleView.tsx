import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { BookmarkFill } from 'react-bootstrap-icons';
import { RenderPassage, RenderType } from './RenderPassage';

export class BibleView extends React.Component {
  render() {
    return (
      <Container className="border m-1">
        <Row>
          <Form>
            <Row>
              <Col>
                <h4>Bible Passage</h4>
              </Col>
              <Col>
                <InputGroup>
                  <FloatingLabel controlId="floatingInput" label="Passage" className="mb-3">
                    <FormControl aria-label="Passage" placeholder="Rom 1:1" type="text" size="sm" />
                  </FloatingLabel>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroup.Text id="versionIcon">
                    <BookmarkFill />
                  </InputGroup.Text>
                  <Form.Select aria-label="Version" aria-describedby="versionIcon">
                    <option>Choose Version...</option>
                    <option value="NIV">NIV</option>
                    <option value="ESV">ESV</option>
                  </Form.Select>
                </InputGroup>
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Go
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <Row>
          <RenderPassage
            metadata={{
              passage: 'Romans 5:12',
              renderType: RenderType.Internal,
              version: 'ESV',
            }}
          />
        </Row>
      </Container>
    );
  }
}

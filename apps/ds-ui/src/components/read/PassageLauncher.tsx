import React, { useState, ChangeEvent } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { BookmarkFill, CardText } from 'react-bootstrap-icons';
import { useNewItemMutation } from '../../services/PassagesService';
import { BasePassage } from '@devouringscripture/common';
import { getToastManager, TOAST_FADE_TIME, ToastType } from '../common/toasts/ToastManager';
const bcv_parser = require('bible-passage-reference-parser/js/en_bcv_parser').bcv_parser;

interface PassageLauncherInterface {
  defaultVersion: string;
}
export const PassageLauncher = (props: PassageLauncherInterface) => {
  const [reference, updateReference] = useState('');
  const [version, updateVersion] = useState(props.defaultVersion);
  const [refInvalid, updateRefInvalid] = useState({
    isInvalid: false,
    message: '',
  });
  const [versionInvalid, updateVersionInvalid] = useState({
    isInvalid: false,
    message: '',
  });
  const [newItem] = useNewItemMutation();

  const bcv = new bcv_parser();

  const handleReferenceChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateReference(event.target.value);
  };

  const handleVersionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateVersion(event.target.value);
  };

  const validateForm = () => {
    const osis: string = bcv.parse(reference).osis();
    if (osis.length > 0) {
      console.log(osis);
    }
    if (osis.length < 1) {
      updateRefInvalid({ isInvalid: true, message: `${reference} is not a valid passage` });
    } else {
      updateRefInvalid({ isInvalid: false, message: '' });
    }

    if (version === 'ESV' || version === 'NIV') {
      updateVersionInvalid({ isInvalid: false, message: '' });
    } else {
      updateVersionInvalid({ isInvalid: true, message: 'Please choose a version' });
    }
  };

  const addPassage = () => {
    if (refInvalid.isInvalid || versionInvalid.isInvalid) {
      getToastManager().show({
        title: 'Invalid Passage',
        content: `'${reference}' is not a valid passage reference, or no version is selected.`,
        type: ToastType.Danger,
        duration: TOAST_FADE_TIME,
      });
      return;
    }

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
                isInvalid={refInvalid.isInvalid}
                onBlur={validateForm}
              />
              <Form.Control.Feedback type="invalid">{refInvalid.message}</Form.Control.Feedback>
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
                onBlur={validateForm}
                isInvalid={versionInvalid.isInvalid}
              >
                <option>Choose Version...</option>
                <option value="NIV">NIV</option>
                <option value="ESV">ESV</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{versionInvalid.message}</Form.Control.Feedback>
            </InputGroup>
          </Col>
          <Col xs="12" md="1">
            <Button
              disabled={refInvalid.isInvalid || versionInvalid.isInvalid ? true : false}
              variant="primary"
              onClick={() => addPassage()}
              size="sm"
            >
              Go
            </Button>
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

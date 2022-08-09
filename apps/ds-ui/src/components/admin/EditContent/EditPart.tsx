import React, { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { MarkdownBox } from '../../common/markdown/MarkdownBox';
import { RenderedPart } from '../../common/tutorial/RenderedChapter';
import { ArrowDownSquare, ArrowUpSquare, TrashFill } from 'react-bootstrap-icons';
import { FieldArrayRenderProps, FieldInputProps, FormikProps } from 'formik';
import { FormikPartType, FormikTutorialType, getPartFromFormik } from './formik-helpers';

interface IEditPart {
  partIndex: number;
  totalPartsInList: number;
  fp: FormikProps<FormikTutorialType>;
  arrayHelpers: FieldArrayRenderProps;
  part: FieldInputProps<FormikPartType>;
}

export const EditPart = ({ partIndex, totalPartsInList, fp, arrayHelpers, part }: IEditPart) => {
  const [showResult, setShowResult] = useState<boolean>(false);

  return (
    <Container fluid className="bg-light">
      <Row>
        <Col xs="1">
          {partIndex > 0 && (
            <Row>
              <Col>
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    arrayHelpers.swap(partIndex, partIndex - 1);
                  }}
                >
                  <ArrowUpSquare />
                </Button>
              </Col>
            </Row>
          )}
          {partIndex < totalPartsInList - 1 && (
            <Row>
              <Col>
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    arrayHelpers.swap(partIndex, partIndex + 1);
                  }}
                >
                  <ArrowDownSquare />
                </Button>
              </Col>
            </Row>
          )}
        </Col>
        <Col xs={showResult ? '5' : '9'}>
          <FloatingLabel label="Type">
            <Form.Select
              name={part.name + '.type'}
              value={part.value.type}
              onChange={fp.handleChange}
              onBlur={fp.handleBlur}
            >
              <option value="text">Text</option>
              <option value="heading">Heading</option>
              <option value="example">Example</option>
            </Form.Select>
          </FloatingLabel>
          <MarkdownBox
            showToolbar={false}
            content={part.value.content}
            changeCallback={(newValue) => {
              fp.setFieldValue(part.name + '.content', newValue);
              fp.setFieldTouched(part.name + '.content');
            }}
            hideAllControls={true}
          />
        </Col>
        <Col xs={showResult ? '5' : '1'}>
          {showResult && (
            <>
              <RenderedPart part={getPartFromFormik(fp.getFieldProps(part.name).value)} />
              <Button variant="outline-secondary" onClick={() => setShowResult(false)}>
                Hide Result
              </Button>
            </>
          )}
          {!showResult && (
            <Button variant="outline-secondary" onClick={() => setShowResult(true)}>
              Show Result
            </Button>
          )}
        </Col>
        <Col xs="1">
          <Button
            variant="outline-danger"
            onClick={() => {
              arrayHelpers.remove(partIndex);
            }}
          >
            <TrashFill />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

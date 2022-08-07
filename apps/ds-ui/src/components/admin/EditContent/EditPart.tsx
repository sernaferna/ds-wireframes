import React from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { MarkdownBox } from '../../common/markdown/MarkdownBox';
import { RenderedPart } from '../../common/tutorial/RenderedChapter';
import { ArrowDownSquare, ArrowUpSquare, TrashFill } from 'react-bootstrap-icons';
import { FieldArrayRenderProps, FormikProps } from 'formik';
import { FormikPartType, FormikTutorialType, getPartFromFormik } from './formik-helpers';

interface IEditPart {
  partIndex: number;
  chapterIndex: number;
  sectionIndex: number;
  fp: FormikProps<FormikTutorialType>;
  arrayHelpers: FieldArrayRenderProps;
}

export const EditPart = ({ partIndex, chapterIndex, sectionIndex, fp, arrayHelpers }: IEditPart) => {
  const partFieldName =
    sectionIndex < 0
      ? `chapters[${chapterIndex}].mainSection.parts[${partIndex}]`
      : `chapters[${chapterIndex}].subSections[${sectionIndex}].parts[${partIndex}]`;
  const totalPartsInList =
    sectionIndex < 0
      ? fp.values.chapters![chapterIndex].mainSection.parts!.length
      : fp.values.chapters![chapterIndex].subSections![sectionIndex].parts!.length;

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
        <Col xs="5">
          <FloatingLabel label="Type">
            <Form.Select
              name={partFieldName + '.type'}
              value={(fp.getFieldProps(partFieldName).value as FormikPartType).type}
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
            content={(fp.getFieldProps(partFieldName).value as FormikPartType).content}
            changeCallback={(newValue) => {
              fp.setFieldValue(partFieldName + '.content', newValue);
              fp.setFieldTouched(partFieldName + '.content');
            }}
            hideAllControls={true}
          />
        </Col>
        <Col xs="5">
          <RenderedPart part={getPartFromFormik(fp.getFieldProps(partFieldName).value)} />
        </Col>
        <Col>
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

import React, { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { RenderedPart } from '../../common/tutorial/RenderedChapter';
import { ArrowDownSquare, ArrowUpSquare, TrashFill } from 'react-bootstrap-icons';
import { FieldArrayRenderProps, FieldInputProps, FormikProps } from 'formik';
import { FormikPartType, FormikTutorialType, getPartFromFormik } from './formik-helpers';
import { MarkdownBox } from '../../common/markdown/MarkdownBox';

interface IEditPart {
  partIndex: number;
  totalPartsInList: number;
  fp: FormikProps<FormikTutorialType>;
  sectionArrayHelpers: FieldArrayRenderProps;
  part: FieldInputProps<FormikPartType>;
}

/**
 * Renders an individual "part" within the Tutorial. Because parts are
 * an array, and need to be aware of their location within the array
 * (e.g. don't show the "move up" button if this is the first item),
 * the `part` object isn't enough context on its own, so the `partIndex`
 * and `totalPartsInList` params are also required.
 *
 * @param partIndex Index of this part within the larger array to which it belongs
 * @param totalPartsInList Total number of parts in the array of which this is part
 * @param fp The `FormikProps` object for the overall tutorial
 * @param arrayHelpers The function from the parent which controls adding/removing/reordering parts
 * @param part The `FormikProps` object for this specific part.
 */
export const EditPart = ({ partIndex, totalPartsInList, fp, sectionArrayHelpers, part }: IEditPart) => {
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
                    sectionArrayHelpers.swap(partIndex, partIndex - 1);
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
                    sectionArrayHelpers.swap(partIndex, partIndex + 1);
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
            height={10}
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
              sectionArrayHelpers.remove(partIndex);
            }}
          >
            <TrashFill />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

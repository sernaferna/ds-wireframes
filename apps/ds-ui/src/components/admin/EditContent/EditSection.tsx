import React, { useState } from 'react';
import { FieldArray, FormikProps } from 'formik';
import { Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { EditPart } from './EditPart';
import { Pen, PenFill } from 'react-bootstrap-icons';
import { FormikPartType, FormikSectionType, FormikTutorialType } from './formik-helpers';

interface IEditSection {
  isMainSection: boolean;
  sectionIndex: number;
  chapterIndex: number;
  fp: FormikProps<FormikTutorialType>;
}
export const EditSection = ({ isMainSection, sectionIndex, chapterIndex, fp }: IEditSection) => {
  const [showParts, setShowParts] = useState<boolean>(false);

  const sectionFieldName = isMainSection
    ? `chapters[${chapterIndex}].mainSection`
    : `chapters[${chapterIndex}].subSections[${sectionIndex}]`;

  return (
    <div className="mb-2">
      <Form>
        <Row>
          <Col xs="10">
            <FloatingLabel
              label={
                isMainSection ? (
                  <>
                    <PenFill className="text-primary" /> Main Section
                  </>
                ) : (
                  <>
                    <Pen className="text-secondary" /> Section
                  </>
                )
              }
            >
              <Form.Control
                type="text"
                name={sectionFieldName + '.title'}
                id="title"
                value={fp.getFieldProps(sectionFieldName + '.title').value}
                onChange={fp.handleChange}
                onBlur={fp.handleBlur}
              />
            </FloatingLabel>
          </Col>
          <Col xs="2">
            {showParts ? (
              <Button variant="outline-secondary" onClick={() => setShowParts(false)}>
                Hide Content
              </Button>
            ) : (
              <Button variant="outline-secondary" onClick={() => setShowParts(true)}>
                Edit Content
              </Button>
            )}
          </Col>
        </Row>

        {showParts && (
          <FieldArray
            name={sectionFieldName + '.parts'}
            render={(arrayHelpers) => (
              <>
                <Row>
                  {(fp.getFieldProps(sectionFieldName + '.parts').value as FormikPartType[]).map((part, index) => (
                    <EditPart
                      key={`${fp.values.id}-ss${sectionIndex}-p-${index}`}
                      partIndex={index}
                      fp={fp}
                      arrayHelpers={arrayHelpers}
                      chapterIndex={chapterIndex}
                      sectionIndex={sectionIndex}
                    />
                  ))}
                </Row>
                <Row>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      arrayHelpers.insert(
                        (fp.getFieldProps(sectionFieldName).value as FormikSectionType).parts!.length,
                        { type: 'text', content: '' }
                      );
                    }}
                  >
                    Add Part
                  </Button>
                </Row>
              </>
            )}
          />
        )}
      </Form>
    </div>
  );
};

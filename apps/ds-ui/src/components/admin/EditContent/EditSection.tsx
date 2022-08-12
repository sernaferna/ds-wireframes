import React from 'react';
import { FieldArray, FieldArrayRenderProps, FieldInputProps, FormikProps } from 'formik';
import { Button, Form, Row, FloatingLabel, Col } from 'react-bootstrap';
import { EditPart } from './EditPart';
import { Pen, PenFill, TrashFill } from 'react-bootstrap-icons';
import { FormikSectionType, FormikTutorialType } from './formik-helpers';
import { ClientSideErrorLoading } from '../../common/loading';

interface IEditSection {
  isMainSection: boolean;
  fp: FormikProps<FormikTutorialType>;
  section: FieldInputProps<FormikSectionType>;
  chapterArrayHelpers?: FieldArrayRenderProps;
  sectionIndex?: number;
}

/**
 * Renders a **Section** within a larger tutorial.
 *
 * @param isMainSection Indicates if this is the "main" or a sub-section
 * @param fp The `FormikProps` object for the overall tutorial
 * @param section The `FormikProps` object for this specific section
 */
export const EditSection = ({ isMainSection, fp, section, chapterArrayHelpers, sectionIndex }: IEditSection) => {
  if (chapterArrayHelpers && sectionIndex === undefined) {
    console.error(`chapterArrayHelpers: ${chapterArrayHelpers}; index: ${sectionIndex}`);
    return (
      <ClientSideErrorLoading>
        <p>Configuration error; invalid parameters passed</p>
      </ClientSideErrorLoading>
    );
  }

  return (
    <div className="mb-2">
      <>
        <Row>
          <Col xs={chapterArrayHelpers ? '11' : '12'}>
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
                name={section.name + '.title'}
                id="title"
                value={section.value.title}
                onChange={fp.handleChange}
                onBlur={fp.handleBlur}
              />
            </FloatingLabel>
          </Col>
          <Col xs="1">
            <Button
              variant="outline-danger"
              onClick={() => {
                chapterArrayHelpers!.remove(sectionIndex!);
              }}
            >
              <TrashFill />
            </Button>
          </Col>
        </Row>

        <Row>
          <FieldArray
            name={section.name + '.parts'}
            render={(sectionArrayHelpers) => (
              <>
                <Row>
                  {section.value.parts!.map((part, index) => (
                    <EditPart
                      key={`${section.name}-part-${index}`}
                      partIndex={index}
                      fp={fp}
                      sectionArrayHelpers={sectionArrayHelpers}
                      part={fp.getFieldProps(section.name + `.parts[${index}]`)}
                      totalPartsInList={section.value.parts!.length}
                    />
                  ))}
                </Row>
                <Row>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      sectionArrayHelpers.insert(section.value.parts!.length, {
                        type: 'text',
                        content: '',
                      });
                    }}
                  >
                    Add Part
                  </Button>
                </Row>
              </>
            )}
          />
        </Row>
      </>
    </div>
  );
};

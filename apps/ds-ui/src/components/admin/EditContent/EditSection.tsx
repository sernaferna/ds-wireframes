import React from 'react';
import { FieldArray, FieldInputProps, FormikProps } from 'formik';
import { Button, Form, Row, FloatingLabel } from 'react-bootstrap';
import { EditPart } from './EditPart';
import { Pen, PenFill } from 'react-bootstrap-icons';
import { FormikSectionType, FormikTutorialType } from './formik-helpers';

interface IEditSection {
  isMainSection: boolean;
  fp: FormikProps<FormikTutorialType>;
  section: FieldInputProps<FormikSectionType>;
}
export const EditSection = ({ isMainSection, fp, section }: IEditSection) => {
  return (
    <div className="mb-2">
      <>
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

        <FieldArray
          name={section.name + '.parts'}
          render={(arrayHelpers) => (
            <>
              <Row>
                {section.value.parts!.map((part, index) => (
                  <EditPart
                    key={`ss-${section.name}`}
                    partIndex={index}
                    fp={fp}
                    arrayHelpers={arrayHelpers}
                    part={fp.getFieldProps(section.name + `.parts[${index}]`)}
                    totalPartsInList={section.value.parts!.length}
                  />
                ))}
              </Row>
              <Row>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    arrayHelpers.insert(section.value.parts!.length, {
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
      </>
    </div>
  );
};

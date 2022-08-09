import React, { useState } from 'react';
import { EditSection } from './EditSection';
import { FieldArray, FieldInputProps, FormikProps } from 'formik';
import { Accordion, Button, Row } from 'react-bootstrap';
import { FormikChapterType, FormikTutorialType } from './formik-helpers';
import { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext';

interface IEditChapter {
  fp: FormikProps<FormikTutorialType>;
  chapter: FieldInputProps<FormikChapterType>;
}

/**
 * Component for editing an individual chapter within a tutorial.
 *
 * @param fp The `FormikProps` object for the overall tutorial.
 * @param chapter The `FormikProps` object for this specific chapter.
 */
export const EditChapter = ({ fp, chapter }: IEditChapter) => {
  const [activeKey, setActiveKey] = useState<AccordionEventKey>('');

  return (
    <div className="mb-4">
      <Accordion activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
        <Accordion.Item eventKey={chapter.name + 'ss-xx'} key={chapter.name + 'ss-xx'}>
          <Accordion.Header>{chapter.value.mainSection.title}</Accordion.Header>
          <Accordion.Body>
            {activeKey === chapter.name + 'ss-xx' && (
              <EditSection
                key={`${fp.values.id}-ss-ss-xx`}
                isMainSection={true}
                fp={fp}
                section={fp.getFieldProps(chapter.name + '.mainSection')}
              />
            )}
          </Accordion.Body>
        </Accordion.Item>

        <FieldArray
          name="subSections"
          render={(arrayHelpers) => (
            <>
              {chapter.value.subSections!.map((ss, index) => (
                <Accordion.Item eventKey={chapter.name + `ss-${index}`} key={chapter.name + `ss-${index}`}>
                  <Accordion.Header>{chapter.value.subSections![index].title}</Accordion.Header>
                  <Accordion.Body>
                    {activeKey === chapter.name + `ss-${index}` && (
                      <EditSection
                        key={`${fp.values.id}-ss-ss-${index}`}
                        isMainSection={false}
                        fp={fp}
                        section={fp.getFieldProps(chapter.name + `.subSections[${index}]`)}
                      />
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}

              <Row>
                <Button
                  variant="secondary"
                  onClick={() => {
                    arrayHelpers.insert(chapter.value.subSections!.length, {
                      title: '',
                      parts: [],
                    });
                  }}
                >
                  Add Section
                </Button>
              </Row>
            </>
          )}
        />
      </Accordion>
    </div>
  );
};

import React, { useState } from 'react';
import { EditSection } from './EditSection';
import { FieldArray, FormikProps } from 'formik';
import { Accordion, Button, Row } from 'react-bootstrap';
import { FormikTutorialType } from './formik-helpers';
import { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext';

interface IEditChapter {
  chapterIndex: number;
  fp: FormikProps<FormikTutorialType>;
}
export const EditChapter = ({ chapterIndex, fp }: IEditChapter) => {
  const [activeKey, setActiveKey] = useState<AccordionEventKey>('');

  return (
    <div className="mb-4">
      <Accordion activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
        <Accordion.Item eventKey={`ai-${chapterIndex}-xx`} key={`ai-${chapterIndex}-xx`}>
          <Accordion.Header>{fp.values.chapters![chapterIndex].mainSection.title}</Accordion.Header>
          <Accordion.Body>
            {activeKey === `ai-${chapterIndex}-xx` && (
              <EditSection
                key={`${fp.values.id}-ch-${chapterIndex}`}
                isMainSection={true}
                fp={fp}
                sectionIndex={-1}
                chapterIndex={chapterIndex}
              />
            )}
          </Accordion.Body>
        </Accordion.Item>

        <FieldArray
          name="subSections"
          render={(arrayHelpers) => (
            <>
              {fp.values.chapters![chapterIndex].subSections!.map((ss, index) => (
                <Accordion.Item eventKey={`ai-${chapterIndex}-ss-${index}`} key={`ai-${chapterIndex}-ss-${index}`}>
                  <Accordion.Header>{fp.values.chapters![chapterIndex].subSections![index].title}</Accordion.Header>
                  <Accordion.Body>
                    {activeKey === `ai-${chapterIndex}-ss-${index}` && (
                      <EditSection
                        key={`${fp.values.id}-ss-${index}`}
                        isMainSection={false}
                        fp={fp}
                        sectionIndex={index}
                        chapterIndex={chapterIndex}
                      />
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}

              <Row>
                <Button
                  variant="secondary"
                  onClick={() => {
                    arrayHelpers.insert(fp.values.chapters![chapterIndex].subSections!.length, {
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

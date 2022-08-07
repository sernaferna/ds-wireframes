import React from 'react';
import { EditSection } from './EditSection';
import { FieldArray, FormikProps } from 'formik';
import { Button, Row } from 'react-bootstrap';
import { FormikTutorialType } from './formik-helpers';

interface IEditChapter {
  chapterIndex: number;
  fp: FormikProps<FormikTutorialType>;
}
export const EditChapter = ({ chapterIndex, fp }: IEditChapter) => {
  return (
    <div className="mb-4">
      <>
        <Row>
          <EditSection
            key={`${fp.values.id}-ch-${chapterIndex}`}
            isMainSection={true}
            fp={fp}
            sectionIndex={-1}
            chapterIndex={chapterIndex}
          />
        </Row>

        <FieldArray
          name="subSections"
          render={(arrayHelpers) => (
            <>
              {fp.values.chapters![chapterIndex].subSections!.map((ss, index) => (
                <Row key={`ch-ss-${index}`}>
                  <EditSection
                    key={`${fp.values.id}-ss-${index}`}
                    isMainSection={false}
                    fp={fp}
                    sectionIndex={index}
                    chapterIndex={chapterIndex}
                  />
                </Row>
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
      </>
    </div>
  );
};

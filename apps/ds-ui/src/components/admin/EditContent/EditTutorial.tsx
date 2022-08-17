import React, { useCallback } from 'react';
import { Accordion, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useGetTutorialByIdQuery, useUpdateTutorialMutation } from '../../../services/TutorialService';
import { ErrorLoadingDataMessage, generateErrorStringFromError, LoadingMessage } from '../../common/loading';
import { EditChapter } from './EditChapter';
import { FieldArray, Formik, FormikHelpers, FormikProps } from 'formik';
import { tutorialSchema, FormikTutorialType, getTutorialFromFormik, getEmptyChapter } from './formik-helpers';
import { ArrowDownCircleFill, ArrowUpCircleFill, TrashFill } from 'react-bootstrap-icons';
import { useErrorsAndWarnings } from '../../../hooks/ErrorsAndWarning';

interface IEditTutorial {
  tutId: string;
}

/**
 * Component used for editing a Tutorial. Responsible for retrieving
 * its own data.
 *
 * Formik heavily used under the covers; this component passes on
 * `FormikChapterType` objects to the `<EditChapter>` component,
 * which passes on Formik data to *its* sub-components, and so on.
 * All components/sub-components depend on the overall Formik
 * Props to both render the information in the form and update it.
 *
 * @param tutId ID of the tutorial to be retrieved from the API
 */
export const EditTutorial = ({ tutId }: IEditTutorial) => {
  const { data, error, isLoading } = useGetTutorialByIdQuery(tutId);
  const [updateTutorial] = useUpdateTutorialMutation();
  const [AlertUI, addErrorMessage] = useErrorsAndWarnings();

  const submitForm = useCallback(
    (values: FormikTutorialType, fh: FormikHelpers<FormikTutorialType>) => {
      const tutorial = getTutorialFromFormik(values);
      updateTutorial(tutorial)
        .unwrap()
        .then((result) => {
          fh.resetForm({ values: result });
        })
        .catch((err) => {
          if ('data' in err) {
            addErrorMessage(generateErrorStringFromError(err.data));
          } else {
            addErrorMessage('Error saving content');
          }
        });
    },
    [updateTutorial, addErrorMessage]
  );

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const initialValues: FormikTutorialType = {
    ...data!,
  };

  return (
    <Container fluid>
      <AlertUI />
      <Formik
        initialValues={initialValues}
        validationSchema={tutorialSchema}
        onSubmit={submitForm}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {(fp: FormikProps<FormikTutorialType>) => (
          <Form noValidate onSubmit={fp.handleSubmit}>
            <Row>
              <Col>
                <h4>{fp.values.name}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="11">
                <FieldArray
                  name="chapters"
                  render={(arrayHelpers) => (
                    <>
                      <Accordion>
                        {fp.values.chapters
                          ? fp.values.chapters.map((item, index) => (
                              <Accordion.Item eventKey={`${fp.values.id}-ch-${index}`} key={`ed-ai-${index}`}>
                                <Accordion.Header>{item.mainSection.title}</Accordion.Header>
                                <Accordion.Body>
                                  <Row>
                                    <Col xs="1">
                                      {index > 0 && (
                                        <Row>
                                          <Col>
                                            <Button
                                              variant="outline-dark"
                                              onClick={() => {
                                                arrayHelpers.swap(index, index - 1);
                                              }}
                                            >
                                              <ArrowUpCircleFill />
                                            </Button>
                                          </Col>
                                        </Row>
                                      )}
                                      {index < fp.values.chapters!.length - 1 && (
                                        <Row>
                                          <Col>
                                            <Button
                                              variant="outline-dark"
                                              onClick={() => {
                                                arrayHelpers.swap(index, index + 1);
                                              }}
                                            >
                                              <ArrowDownCircleFill />
                                            </Button>
                                          </Col>
                                        </Row>
                                      )}
                                    </Col>
                                    <Col xs="10">
                                      <EditChapter
                                        key={`${fp.values.id}-edit-chapter-${index}`}
                                        fp={fp}
                                        chapter={fp.getFieldProps(`chapters[${index}]`)}
                                      />
                                    </Col>
                                    <Col xs="1">
                                      <Button
                                        variant="outline-danger"
                                        onClick={() => {
                                          arrayHelpers.remove(index);
                                        }}
                                      >
                                        <TrashFill />
                                      </Button>
                                    </Col>
                                  </Row>
                                </Accordion.Body>
                              </Accordion.Item>
                            ))
                          : []}
                      </Accordion>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          arrayHelpers.insert(fp.values.chapters!.length, getEmptyChapter());
                        }}
                      >
                        Add Chapter
                      </Button>
                    </>
                  )}
                />
              </Col>
              <Col xs="12" md="1">
                <div className="sticky-top">
                  <Button disabled={!fp.dirty} variant="outline-primary" type="submit">
                    Save Changes
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

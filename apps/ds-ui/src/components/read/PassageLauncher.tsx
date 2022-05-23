import React, { useMemo, useCallback, useState } from 'react';
import { Col, Form, InputGroup, Row, FormControl, Button } from 'react-bootstrap';
import { BookmarkFill, CardText } from 'react-bootstrap-icons';
import { useNewItemMutation } from '../../services/PassagesService';
import { BasePassage, isReferenceValid, getReferenceForOSIS, getOSISForReference } from '@devouringscripture/common';
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { PassageLauncherModal } from './PassageLauncherModal';

const schema = yup.object({
  reference: yup
    .string()
    .required()
    .test('valid-ref', 'Invalid reference', (value) => {
      if (value === undefined) {
        return false;
      }
      return isReferenceValid(value as string);
    }),
  version: yup.string().required().oneOf(['ESV', 'NIV'], 'Version required'),
});
type LauncherSchema = yup.InferType<typeof schema>;

interface IPassageLauncher {
  defaultVersion: string;
}
export const PassageLauncher = ({ defaultVersion }: IPassageLauncher) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newItem] = useNewItemMutation();

  const initialValues: LauncherSchema = useMemo(
    () => ({
      reference: '',
      version: defaultVersion,
    }),
    [defaultVersion]
  );

  const addPassage = useCallback(
    (reference: string, version: string) => {
      const newPassage: BasePassage = {
        osis: getOSISForReference(reference),
        version,
      };

      newItem(newPassage);
    },
    [newItem]
  );

  return (
    <Row className="bg-light m-1 p-1">
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          addPassage(values.reference || '', values.version);
        }}
        initialValues={initialValues}
        validateOnBlur={true}
      >
        {(formikProps: FormikProps<LauncherSchema>) => (
          <Form noValidate onSubmit={formikProps.handleSubmit}>
            <Row xs="12">
              <Form.Label column={true} xs="12" md="3" xl="2" className="text-start text-md-end">
                Read Passage:
              </Form.Label>
              <Col xs="12" md="4" xl="5">
                <InputGroup>
                  <InputGroup.Text id="passageIcon">
                    <CardText />
                  </InputGroup.Text>
                  <FormControl
                    id="reference"
                    aria-label="Passage"
                    placeholder="Rom 1:1"
                    type="search"
                    size="sm"
                    value={formikProps.values.reference}
                    aria-describedby="passageIcon"
                    onChange={formikProps.handleChange}
                    isInvalid={!!formikProps.errors.reference && formikProps.values.reference.length > 0}
                    isValid={formikProps.touched.reference && !formikProps.errors.reference}
                    onBlur={(e) => {
                      if (isReferenceValid(formikProps.values.reference)) {
                        formikProps.setFieldValue(
                          'reference',
                          getReferenceForOSIS(getOSISForReference(formikProps.values.reference))
                        );
                      }
                      formikProps.handleBlur(e);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">{formikProps.errors.reference}</Form.Control.Feedback>
                </InputGroup>
              </Col>
              <Col xs="12" md="4">
                <InputGroup>
                  <InputGroup.Text id="versionIcon">
                    <BookmarkFill />
                  </InputGroup.Text>
                  <Form.Select
                    id="version"
                    value={formikProps.values.version}
                    onChange={formikProps.handleChange}
                    aria-label="Version"
                    aria-describedby="versionIcon"
                    size="sm"
                    onBlur={formikProps.handleBlur}
                    isInvalid={!!formikProps.errors.version}
                  >
                    <option>Choose Version...</option>
                    <option value="NIV">NIV</option>
                    <option value="ESV">ESV</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{formikProps.errors.version}</Form.Control.Feedback>
                </InputGroup>
              </Col>
              <Col xs="12" md="1">
                <Button
                  type="button"
                  disabled={
                    !formikProps.touched.reference || !!formikProps.errors.version || !!formikProps.errors.reference
                  }
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Go
                </Button>
              </Col>
            </Row>
            <PassageLauncherModal
              show={showModal}
              closeFunction={() => setShowModal(false)}
              saveFunction={() => {
                addPassage(formikProps.values.reference, formikProps.values.version);
                setShowModal(false);
              }}
              passage={{
                osis: getOSISForReference(formikProps.values.reference),
                version: formikProps.values.reference,
              }}
            />
          </Form>
        )}
      </Formik>
    </Row>
  );
};

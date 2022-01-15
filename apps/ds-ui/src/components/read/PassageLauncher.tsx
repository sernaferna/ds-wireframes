import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { BookmarkFill, CardText } from 'react-bootstrap-icons';
import { useNewItemMutation } from '../../services/PassagesService';
import { BasePassage } from '@devouringscripture/common';
import { isReferenceValid, getReferenceForOSIS, getOSISForReference } from '@devouringscripture/refparse';
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';

const schema = yup.object().shape({
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

interface PassageLauncherInterface {
  defaultVersion: string;
}
export const PassageLauncher = (props: PassageLauncherInterface) => {
  const [newItem] = useNewItemMutation();

  const addPassage = (reference: string, version: string) => {
    const newPassage: BasePassage = {
      reference: getOSISForReference(reference),
      version,
    };

    newItem(newPassage);
  };

  return (
    <Row>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          addPassage(values.reference, values.version);
        }}
        initialValues={{ reference: '', version: props.defaultVersion }}
        validateOnBlur={true}
      >
        {(formikProps: FormikProps<BasePassage>) => (
          <Form noValidate onSubmit={formikProps.handleSubmit}>
            <Row xs="12">
              <Col xs="12" md="2">
                <h4>Read Passage</h4>
              </Col>
              <Col xs="12" md="5">
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
                  type="submit"
                  disabled={
                    !formikProps.touched.version || !!formikProps.errors.version || !!formikProps.errors.reference
                  }
                  variant="primary"
                  size="sm"
                >
                  Go
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Row>
  );
};

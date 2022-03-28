import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Alert from 'react-bootstrap/Alert';
import { useNewItemMutation } from '../../services/PrayerService';
import Button from 'react-bootstrap/Button';
import { ShieldPlus, Tsunami, EyeFill } from 'react-bootstrap-icons';
import { PrayerTypes, BasePrayerListItem } from '@devouringscripture/common';
import * as yup from 'yup';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { MarkdownBox } from '../common/MarkdownBox';

const praisePopover = (
  <Popover id="praise-popover">
    <Popover.Header>Praise</Popover.Header>
    <Popover.Body>This icon indicates a praise request.</Popover.Body>
  </Popover>
);

const requestPopover = (
  <Popover id="praise-popover">
    <Popover.Header>Request</Popover.Header>
    <Popover.Body>This icon indicates a request for help from God.</Popover.Body>
  </Popover>
);

const confessionPopover = (
  <Popover id="praise-popover">
    <Popover.Header>Confession</Popover.Header>
    <Popover.Body>This icon indicates a confession being prayed to God.</Popover.Body>
  </Popover>
);

const schema = yup.object({
  title: yup.string(),
  body: yup.string().required('Please enter the text of your prayer'),
  type: yup.string().notRequired(),
});
type ValuesSchema = yup.InferType<typeof schema>;

export function CreatePrayerItem({ confession = false }) {
  const [newPrayer] = useNewItemMutation();

  const handleSubmit = useCallback(
    (text: string, title: string | undefined, type: string | undefined) => {
      const newItem: BasePrayerListItem = { title, text, type, completed: false };
      newPrayer(newItem);
    },
    [newPrayer]
  );

  const initialValues: ValuesSchema = {
    title: '',
    body: '',
    type: confession ? PrayerTypes.confession : undefined,
  };

  const formSubmit = (values: ValuesSchema, { setSubmitting, resetForm }: FormikHelpers<ValuesSchema>) => {
    handleSubmit(values.body, values.title, values.type);
    setSubmitting(false);
    resetForm({ values: initialValues });
  };

  const clickPrayerType = (type: string, p: FormikProps<ValuesSchema>) => {
    return () => {
      if (p.values.type !== type) {
        p.setFieldValue('type', type);
      } else {
        p.setFieldValue('type', undefined);
      }
    };
  };

  const classNameFor = (type: string, p: FormikProps<ValuesSchema>, middle: boolean = false) => {
    const mainClass = p.values.type === type ? 'icon-selected' : 'icon-unselected';
    if (middle) {
      return `icon-middle ${mainClass}`;
    } else {
      return mainClass;
    }
  };

  return (
    <Alert variant={confession ? 'danger' : 'primary'}>
      <h1>{confession ? 'Confession' : 'New Prayer Request'}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={formSubmit}
        validateOnBlur={false}
        validateOnChange={true}
      >
        {(formikProps: FormikProps<ValuesSchema>) => (
          <Form noValidate onSubmit={formikProps.handleSubmit}>
            <Form.Group as={Col} xs="12">
              <Form.Label>Title</Form.Label>
              <Form.Control
                id="title"
                value={formikProps.values.title}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                type="text"
                placeholder="Title (optional)"
                name="title"
              />
            </Form.Group>
            <Form.Group as={Col} xs="12">
              <Form.Label>Text</Form.Label>
              <MarkdownBox
                content={formikProps.values.body}
                changeCallback={(content) => {
                  formikProps.setFieldValue('body', content);
                  formikProps.setFieldTouched('body', true);
                }}
              />
            </Form.Group>
            {confession ? null : (
              <Stack direction="horizontal" className="create-prayer-icon-list">
                <Form.Control type="hidden" id="type" />
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={praisePopover}>
                  <ShieldPlus
                    className={classNameFor(PrayerTypes.praise, formikProps)}
                    onClick={clickPrayerType(PrayerTypes.praise, formikProps)}
                  />
                </OverlayTrigger>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={requestPopover}>
                  <Tsunami
                    className={classNameFor(PrayerTypes.request, formikProps, true)}
                    onClick={clickPrayerType(PrayerTypes.request, formikProps)}
                  />
                </OverlayTrigger>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={confessionPopover}>
                  <EyeFill
                    className={classNameFor(PrayerTypes.confession, formikProps)}
                    onClick={clickPrayerType(PrayerTypes.confession, formikProps)}
                  />
                </OverlayTrigger>
              </Stack>
            )}
            <Form.Group className="mt-2">
              <Button
                variant={confession ? 'danger' : 'primary'}
                type="submit"
                disabled={
                  !formikProps.touched.body ||
                  !!formikProps.errors.body ||
                  !!formikProps.errors.title ||
                  !!formikProps.errors.type
                }
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Alert>
  );
}

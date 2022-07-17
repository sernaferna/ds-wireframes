import React, { useCallback } from 'react';
import { Form, Stack, Popover, OverlayTrigger, Alert, Button } from 'react-bootstrap';
import { useNewItemMutation } from '../../services/PrayerService';
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

/**
 * Form for creating a prayer item. Allows the user to choose the
 * type of prayer item (using the `PrayerTypes` enum), or, via param,
 * can be hard-coded as a **confession** item, which has a slightly
 * different UI (and hides the ability for the user to choose the type).
 *
 * The `confession` param renders a special view of the component, but
 * if it is set to `false` and the user *chooses* **confession** it doesn't
 * change the way the component is rendered; the `confession` attribute is
 * a design-time param, not a runtime param.
 *
 * @param confession Indicates if this should be specifically rendered as a **confession** item (defaults to false)
 */
export const CreatePrayerItem = ({ confession = false }) => {
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
    const mainClass = p.values.type === type ? 'text-light bg-success' : 'text-light bg-secondary';
    if (middle) {
      return `mx-3 mx-lg-2 mx-xxl-3 ${mainClass}`;
    } else {
      return mainClass;
    }
  };

  return (
    <Alert variant={confession ? 'danger' : 'primary'}>
      <h4>{confession ? 'Confession' : 'New Prayer Request'}</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={formSubmit}
        validateOnBlur={false}
        validateOnChange={true}
      >
        {(formikProps: FormikProps<ValuesSchema>) => (
          <Form noValidate onSubmit={formikProps.handleSubmit}>
            <Form.Group>
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
            <Form.Group>
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
              <Stack direction="horizontal" className="h1 m-3">
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
            <Form.Group>
              <Button
                className="mt-2"
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
};

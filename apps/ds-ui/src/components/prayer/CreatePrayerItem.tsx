import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useNewItemMutation } from '../../services/PrayerService';
import Button from 'react-bootstrap/Button';
import { ShieldPlus, Tsunami, EyeFill } from 'react-bootstrap-icons';
import { PrayerTypes, BasePrayerListItem } from '@devouringscripture/common';
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';

const selectedIconClasses = 'bg-success text-light';
const unselectedIconClasses = 'text-light bg-secondary';

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

export function CreatePrayerItem({ confession = false }) {
  const [newPrayer] = useNewItemMutation();

  const handleSubmit = (text: string, title: string | undefined, type: string | undefined) => {
    console.log(`handlesubmit ${text}`);
    const newItem: BasePrayerListItem = { title, text, type, completed: false };
    console.log(newItem);
    newPrayer(newItem);
  };

  const initialValues = {
    title: '',
    body: '',
    type: confession ? PrayerTypes.confession : undefined,
  };

  return (
    <div className={confession ? 'alert alert-danger' : 'alert alert-primary'}>
      <h1>{confession ? 'Confession' : 'New Prayer Request'}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          handleSubmit(values.body, values.title, values.type);
        }}
        validateOnBlur={true}
      >
        {(formikProps: FormikProps<yup.InferType<typeof schema>>) => (
          <Form noValidate onSubmit={formikProps.handleSubmit}>
            <Form.Group as={Col} xs="12" className="position-relative">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={formikProps.values.title}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                type="text"
                placeholder="Title"
                name="title"
                isInvalid={!!formikProps.errors.title}
              />
            </Form.Group>
            <Form.Group as={Col} xs="12" className="position-relative">
              <Form.Label>Text</Form.Label>
              <Form.Control
                value={formikProps.values.body}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                as="textarea"
                rows={4}
                name="body"
                isValid={formikProps.touched.body && !formikProps.errors.body}
                isInvalid={!!formikProps.errors.body}
                placeholder="Prayer request"
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Please enter some text
              </Form.Control.Feedback>
            </Form.Group>
            {confession ? null : (
              <Stack direction="horizontal" className="h1 m-3" gap={5}>
                <Form.Control type="hidden" id="type" />
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={praisePopover}>
                  <ShieldPlus
                    className={
                      formikProps.values.type === PrayerTypes.praise ? selectedIconClasses : unselectedIconClasses
                    }
                    onClick={() => {
                      if (formikProps.values.type === PrayerTypes.praise) {
                        formikProps.setFieldValue('type', undefined);
                      } else {
                        formikProps.setFieldValue('type', PrayerTypes.praise);
                      }
                    }}
                  />
                </OverlayTrigger>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={requestPopover}>
                  <Tsunami
                    className={
                      formikProps.values.type === PrayerTypes.request ? selectedIconClasses : unselectedIconClasses
                    }
                    onClick={() => {
                      if (formikProps.values.type === PrayerTypes.request) {
                        formikProps.setFieldValue('type', undefined);
                      } else {
                        formikProps.setFieldValue('type', PrayerTypes.request);
                      }
                    }}
                  />
                </OverlayTrigger>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={confessionPopover}>
                  <EyeFill
                    className={
                      formikProps.values.type === PrayerTypes.confession ? selectedIconClasses : unselectedIconClasses
                    }
                    onClick={() => {
                      if (formikProps.values.type === PrayerTypes.confession) {
                        formikProps.setFieldValue('type', undefined);
                      } else {
                        formikProps.setFieldValue('type', PrayerTypes.confession);
                      }
                    }}
                  />
                </OverlayTrigger>
              </Stack>
            )}
            <Form.Group className="mt-2">
              <Button variant={confession ? 'danger' : 'primary'} type="submit" disabled={!formikProps.touched.body}>
                Submit
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </div>
  );
}

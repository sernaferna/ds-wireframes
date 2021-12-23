import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../loading';
import { SidebarCollapseWidget } from '../SidebarCollapseWidget';
import Button from 'react-bootstrap/Button';
import { getToastManager, ToastType, TOAST_FADE_TIME } from './ToastManager';

const executeTest = (toastType: string) => {
  let tt: ToastType = ToastType.Primary;
  switch (toastType) {
    case 'primary':
      tt = ToastType.Primary;
      break;
    case 'secondary':
      tt = ToastType.Secondary;
      break;
    case 'success':
      tt = ToastType.Success;
      break;
    case 'danger':
      tt = ToastType.Danger;
      break;
    case 'warning':
      tt = ToastType.Warning;
      break;
    case 'info':
      tt = ToastType.Info;
      break;
    case 'light':
      tt = ToastType.Light;
      break;
    case 'dark':
      tt = ToastType.Dark;
      break;
  }

  getToastManager().show({
    title: 'Test',
    content: 'Testing Toast functionality',
    duration: TOAST_FADE_TIME,
    type: tt,
  });
};

export const ToastTester = () => {
  const [toastType, setToastType] = useState('primary');
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  if (!data!.settings.showToastTester) {
    return null;
  }

  return (
    <SidebarCollapseWidget title="Test Toasts" visible={true} clickFunction={() => {}}>
      <Form>
        <Form.Check
          label="Primary"
          name="toastTypeRadios"
          type="radio"
          id="primary-radio"
          checked={toastType === 'primary'}
          onChange={() => {
            setToastType('primary');
          }}
        />
        <Form.Check
          label="Secondary"
          name="toastTypeRadios"
          type="radio"
          id="secondary-radio"
          checked={toastType === 'secondary'}
          onChange={() => {
            setToastType('secondary');
          }}
        />
        <Form.Check
          label="Info"
          name="toastTypeRadios"
          type="radio"
          id="info-radio"
          checked={toastType === 'info'}
          onChange={() => {
            setToastType('info');
          }}
        />
        <Form.Check
          label="Success"
          name="toastTypeRadios"
          type="radio"
          id="success-radio"
          checked={toastType === 'success'}
          onChange={() => {
            setToastType('success');
          }}
        />
        <Form.Check
          label="Danger"
          name="toastTypeRadios"
          type="radio"
          id="danger-radio"
          checked={toastType === 'danger'}
          onChange={() => {
            setToastType('danger');
          }}
        />
        <Form.Check
          label="Warning"
          name="toastTypeRadios"
          type="radio"
          id="warning-radio"
          checked={toastType === 'warning'}
          onChange={() => {
            setToastType('warning');
          }}
        />
        <Form.Check
          label="Dark"
          name="toastTypeRadios"
          type="radio"
          id="dark-radio"
          checked={toastType === 'dark'}
          onChange={() => {
            setToastType('dark');
          }}
        />
        <Form.Check
          label="Light"
          name="toastTypeRadios"
          type="radio"
          id="light-radio"
          checked={toastType === 'light'}
          onChange={() => {
            setToastType('light');
          }}
        />
        <Button className="my-2" variant="primary" onClick={() => executeTest(toastType)}>
          Test
        </Button>
      </Form>
    </SidebarCollapseWidget>
  );
};

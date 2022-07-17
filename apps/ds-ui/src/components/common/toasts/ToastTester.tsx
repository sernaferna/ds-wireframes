import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { LoadingMessage, ErrorLoadingDataMessage } from '../loading';
import { SidebarCollapseWidget } from '../SidebarCollapseWidget';
import { getToastManager, ToastType } from './ToastManager';
import { useUserSettings } from '../../../hooks/UserSettings';

const executeTest = (toastType: string) => {
  return () => {
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
      duration: 30000,
      type: tt,
    });
  };
};

/**
 * Gives a list of types of toasts, and shows sample, hard-coded toasts
 * on demand.
 */
export const ToastTester = () => {
  const [toastType, setToastType] = useState('primary');
  const [userData, userResponseError, userLoading] = useUserSettings();

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  if (!userData!.settings.showToastTester) {
    return null;
  }

  const setNewTT = (newType: string) => {
    return () => {
      setToastType(newType);
    };
  };

  return (
    <SidebarCollapseWidget title="Test Toasts" visible={true} clickFunction={() => {}}>
      <Form className="toast-tester-form">
        <Form.Check
          label="Primary"
          name="toastTypeRadios"
          type="radio"
          id="primary-radio"
          checked={toastType === 'primary'}
          onChange={setNewTT('primary')}
        />
        <Form.Check
          label="Secondary"
          name="toastTypeRadios"
          type="radio"
          id="secondary-radio"
          checked={toastType === 'secondary'}
          onChange={setNewTT('secondary')}
        />
        <Form.Check
          label="Info"
          name="toastTypeRadios"
          type="radio"
          id="info-radio"
          checked={toastType === 'info'}
          onChange={setNewTT('info')}
        />
        <Form.Check
          label="Success"
          name="toastTypeRadios"
          type="radio"
          id="success-radio"
          checked={toastType === 'success'}
          onChange={setNewTT('success')}
        />
        <Form.Check
          label="Danger"
          name="toastTypeRadios"
          type="radio"
          id="danger-radio"
          checked={toastType === 'danger'}
          onChange={setNewTT('danger')}
        />
        <Form.Check
          label="Warning"
          name="toastTypeRadios"
          type="radio"
          id="warning-radio"
          checked={toastType === 'warning'}
          onChange={setNewTT('warning')}
        />
        <Form.Check
          label="Dark"
          name="toastTypeRadios"
          type="radio"
          id="dark-radio"
          checked={toastType === 'dark'}
          onChange={setNewTT('dark')}
        />
        <Form.Check
          label="Light"
          name="toastTypeRadios"
          type="radio"
          id="light-radio"
          checked={toastType === 'light'}
          onChange={setNewTT('light')}
        />
        <Button variant="primary" className="my-2" onClick={executeTest(toastType)}>
          Test
        </Button>
      </Form>
    </SidebarCollapseWidget>
  );
};

import React from 'react';
import { useGetByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { UserAttributes } from '../../datamodel/User';

export function Settings() {
  const { data, error, isLoading } = useGetByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <Alert variant="info">Loading...</Alert>;
  }
  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>Error loading settings</p>
      </Alert>
    );
  }

  const handleShowSIChange = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.showSizeIndicator = !newUser.settings.showSizeIndicator;
    update(newUser);
  };

  return (
    <Form>
      <Form.Check type="checkbox" id="showSizeIndicatorSetting" label="Show Size Indicator" checked={data!.settings.showSizeIndicator} onChange={handleShowSIChange} />
    </Form>
  );
}

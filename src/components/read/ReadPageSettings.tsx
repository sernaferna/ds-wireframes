import React from 'react';
import { useGetUserByIdQuery, HARDCODED_USER_ID, useUpdateUserMutation } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import Form from 'react-bootstrap/Form';
import { UserAttributes } from '../../datamodel/User';

export function ReadPageSettings() {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const versionToUse = data!.settings.read.defaultVersion;

  const changeDefaultVersion = (newVersion: string) => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data!));
    newUser.settings.read.defaultVersion = newVersion;
    update(newUser);
  };

  return (
    <>
      <Form>
        <Form.Label>Default Version for Passages:</Form.Label>
        <Form.Check
          type="radio"
          label="English Standard Version (ESV)"
          name="defaultVersion"
          checked={versionToUse === 'ESV'}
          onChange={() => changeDefaultVersion('ESV')}
        />
        <Form.Check
          type="radio"
          label="New International Version (NIV)"
          name="defaultVersion"
          checked={versionToUse === 'NIV'}
          onChange={() => changeDefaultVersion('NIV')}
        />
        <Form.Check
          type="radio"
          label="New King James Version (NKJV)"
          name="defaultVersion"
          checked={versionToUse === 'NKJV'}
          disabled
          onChange={() => changeDefaultVersion('NKJV')}
        />
        <Form.Check
          type="radio"
          label="King James Version (KJV)"
          name="defaultVersion"
          checked={versionToUse === 'KJV'}
          disabled
          onChange={() => changeDefaultVersion('KJV')}
        />
      </Form>
      <p className="mt-3">Passage rendering via BibleGateway.</p>
    </>
  );
}

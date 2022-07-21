import React, { useCallback } from 'react';
import { useUserSettings } from '../../hooks/UserSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { Form } from 'react-bootstrap';

/**
 * Settings component for **Read** section of the app
 */
export const ReadPageSettings = () => {
  const [userData, userResponseError, userLoading, , flipBoolCallback, updateStringProp, updateStringCallback] =
    useUserSettings();

  const changeSortOption = useCallback(() => {
    if (userData!.settings.read.sortPassages === 'date-desc') {
      updateStringProp('settings.read.sortPassages', 'date-asc');
    } else {
      updateStringProp('settings.read.sortPassages', 'date-desc');
    }
  }, [userData, updateStringProp]);

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  const versionToUse = userData!.settings.read.defaultVersion;

  let sortOption = userData!.settings.read.sortPassages;
  if (sortOption !== 'date-asc' && sortOption !== 'date-desc') {
    sortOption = 'date-desc';
  }

  return (
    <>
      <Form.Label>Default Version for Passages:</Form.Label>
      <Form.Check
        type="radio"
        label="English Standard Version (ESV)"
        name="defaultVersion"
        checked={versionToUse === 'ESV'}
        onChange={updateStringCallback('settings.read.defaultVersion', 'ESV')}
      />
      <Form.Check
        type="radio"
        label="New International Version (NIV)"
        name="defaultVersion"
        checked={versionToUse === 'NIV'}
        onChange={updateStringCallback('settings.read.defaultVersion', 'NIV')}
      />
      <Form.Check
        type="radio"
        label="New King James Version (NKJV)"
        name="defaultVersion"
        checked={versionToUse === 'NKJV'}
        disabled
        onChange={updateStringCallback('settings.read.defaultVersion', 'NKJV')}
      />
      <Form.Check
        type="radio"
        label="King James Version (KJV)"
        name="defaultVersion"
        checked={versionToUse === 'KJV'}
        disabled
        onChange={updateStringCallback('settings.read.defaultVersion', 'KJV')}
      />

      <Form.Group>
        <Form.Text>Sort order?</Form.Text>
        <Form.Select aria-label="Sort By?" onChange={changeSortOption} value={sortOption}>
          <option value="date-asc">Date Ascending</option>
          <option value="date-desc">Date Descending</option>
        </Form.Select>
      </Form.Group>

      <h6 className="mt-3">Writing Settings</h6>
      <Form.Check
        type="checkbox"
        id="autosavePassageNotes"
        label="Auto-Save Passage Notes"
        checked={userData!.settings.read.autosavePassageNotes}
        onChange={flipBoolCallback('settings.read.autosavePassageNotes')}
      />
      <Form.Check
        type="checkbox"
        id="autoSmallCaps"
        label={
          <p>
            Automatic <span style={{ fontVariant: 'small-caps' }}>Small Caps</span>
          </p>
        }
        checked={userData!.settings.write.autoSmallCaps}
        onChange={flipBoolCallback('settings.write.autoSmallCaps')}
      />
      <Form.Check
        type="checkbox"
        id="autoADBC"
        label={
          <p>
            Autoformat eras (e.g. <span style={{ fontVariant: 'small-caps' }}>a.d.</span>2020, 1000
            <span style={{ fontVariant: 'small-caps' }}>b.c.</span>)
          </p>
        }
        checked={userData!.settings.write.autoADBC}
        onChange={flipBoolCallback('settings.write.autoADBC')}
      />
    </>
  );
};

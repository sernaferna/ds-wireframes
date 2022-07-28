import React, { useCallback } from 'react';
import { useUserSettings } from '../../hooks/UserSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { FloatingLabel, Form } from 'react-bootstrap';

/**
 * Settings component for **Read** section of the app
 */
export const ReadPageSettings = () => {
  const [userData, userResponseError, userLoading, , flipBoolCallback, updateStringProp] = useUserSettings();

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

  let sortOption = userData!.settings.read.sortPassages;
  if (sortOption !== 'date-asc' && sortOption !== 'date-desc') {
    sortOption = 'date-desc';
  }

  return (
    <>
      <FloatingLabel controlId="floatingVersion" label="Default Bible version">
        <Form.Control
          type="text"
          placeholder="VER"
          value={userData!.settings.read.defaultVersion}
          onChange={(e) => updateStringProp('settings.read.defaultVersion', e.currentTarget.value)}
        />
      </FloatingLabel>

      <Form.Group>
        <Form.Text>Sort order?</Form.Text>
        <Form.Select aria-label="Sort By?" onChange={changeSortOption} value={sortOption}>
          <option value="date-asc">Date Ascending</option>
          <option value="date-desc">Date Descending</option>
        </Form.Select>
      </Form.Group>

      <h6 className="mt-3">Writing Settings</h6>
      <Form.Check
        type="switch"
        id="autosavePassageNotes"
        label="Auto-Save Passage Notes"
        checked={userData!.settings.read.autosavePassageNotes}
        onChange={flipBoolCallback('settings.read.autosavePassageNotes')}
      />
    </>
  );
};

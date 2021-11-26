import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useGetUserByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { UserAttributes } from '../../datamodel/User';
import { getToastManager, ToastType, TOAST_FADE_TIME } from '../common/toasts/ToastManager';

export function PrayerSettings() {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const showAll = data!.settings.prayer.showAllItems;

  const changeFilterOption = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.prayer.showAllItems = !newUser.settings.prayer.showAllItems;
    update(newUser);
  };

  const changeSortOption = () => {
    getToastManager().show({
      title: 'Not Implemented',
      content: 'Feature not implemented yet',
      type: ToastType.Danger,
      duration: TOAST_FADE_TIME,
    });
  };

  return (
    <Form>
      <div key="prayerFilterOptions">
        <Form.Check type="radio" id="showAllPrayerItemsRadio" label="Show All Prayer Items" name="prayerFilter" checked={showAll} onClick={changeFilterOption} />
        <Form.Check type="radio" id="showActivePrayerItemsRadio" label="Show Active Prayer Items" name="prayerFilter" checked={!showAll} onClick={changeFilterOption} />
      </div>
      <FloatingLabel controlId="sortBySelect" label="Sort By?">
        <Form.Select aria-label="Sort By?" onChange={changeSortOption}>
          <option value="dateAsc">Date Ascending</option>
          <option value="dateDesc">Date Descending</option>
        </Form.Select>
      </FloatingLabel>
    </Form>
  );
}

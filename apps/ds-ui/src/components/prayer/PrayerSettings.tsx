import React, { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { useUserSettings } from '../../hooks/UserSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { UserAttributes } from '@devouringscripture/common';
import { PrayerViewFilterComponent } from './PrayerViewFilterComponent';

/**
 * Settings component for the **Pray** section of the site
 */
export const PrayerSettings = () => {
  const [userData, userResponseError, userLoading, , flipBoolCallback, updateStringProp, , getUserCopy, updateUser] =
    useUserSettings();

  const changeSortOption = useCallback(() => {
    if (userData!.settings.prayer.sort === 'date-asc') {
      updateStringProp('settings.prayer.sort', 'date-desc');
    } else {
      updateStringProp('settings.prayer.sort', 'date-asc');
    }
  }, [userData, updateStringProp]);

  const filterCheckClicked = useCallback(
    (filterCheck: string) => {
      return () => {
        const newUser: UserAttributes = getUserCopy();
        const filters = newUser.settings.prayer.filters;

        switch (filterCheck) {
          case 'all':
            if (filters.showAll) {
              filters.showAll = false;
            } else {
              filters.showAll = true;
              filters.showUnLabeled = true;
              filters.showConfessions = true;
              filters.showPraise = true;
              filters.showRequests = true;
            }
            break;
          case 'unlabeled':
            filters.showUnLabeled = !filters.showUnLabeled;
            break;
          case 'requests':
            filters.showRequests = !filters.showRequests;
            break;
          case 'praise':
            filters.showPraise = !filters.showPraise;
            break;
          case 'confessions':
            filters.showConfessions = !filters.showConfessions;
            break;
        }

        updateUser(newUser);
      };
    },
    [getUserCopy, updateUser]
  );

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  const showAll = userData!.settings.prayer.showAllItems;

  let sortOptions = userData!.settings.prayer.sort;
  if (sortOptions !== 'date-asc' && sortOptions !== 'date-desc') {
    sortOptions = 'date-asc';
  }

  return (
    <>
      <Form.Group className="p-2">
        <Form.Text muted>Settings here apply across the entire site.</Form.Text>
      </Form.Group>
      <Form.Group className="p-2">
        <Form.Text>Completed/Active Requests?</Form.Text>
        <Form.Check
          type="radio"
          id="showAllPrayerItemsRadio"
          label="Show All Prayer Items"
          name="prayerFilter"
          checked={showAll}
          onChange={flipBoolCallback('settings.prayer.showAllItems')}
        />
        <Form.Check
          type="radio"
          id="showActivePrayerItemsRadio"
          label="Show Active Prayer Items"
          name="prayerFilter"
          checked={!showAll}
          onChange={flipBoolCallback('settings.prayer.showAllItems')}
        />
      </Form.Group>
      <Form.Group className="group">
        <Form.Text>Sort Order?</Form.Text>
        <Form.Select aria-label="Sort By?" onChange={changeSortOption} value={sortOptions}>
          <option value="date-asc">Date Ascending</option>
          <option value="date-desc">Date Descending</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="group">
        <Form.Text>Filter Prayer Types?</Form.Text>
        <Form.Check
          type="checkbox"
          id="showAllTypesCheck"
          label="Any"
          checked={userData!.settings.prayer.filters.showAll}
          onChange={filterCheckClicked('all')}
        />
        <Form.Check
          type="checkbox"
          id="showUnlabeledCheck"
          label="Un-Labeled"
          checked={userData!.settings.prayer.filters.showUnLabeled}
          disabled={userData?.settings.prayer.filters.showAll}
          onChange={filterCheckClicked('unlabeled')}
        />
        <Form.Check
          type="checkbox"
          id="showRequestsCheck"
          label="Requests"
          checked={userData!.settings.prayer.filters.showRequests}
          disabled={userData!.settings.prayer.filters.showAll}
          onChange={filterCheckClicked('requests')}
        />
        <Form.Check
          type="checkbox"
          id="showPraiseCheck"
          label="Praise"
          checked={userData!.settings.prayer.filters.showPraise}
          disabled={userData!.settings.prayer.filters.showAll}
          onChange={filterCheckClicked('praise')}
        />
        <Form.Check
          type="checkbox"
          id="showConfessionsCheck"
          label="Confessions"
          checked={userData!.settings.prayer.filters.showConfessions}
          disabled={userData!.settings.prayer.filters.showAll}
          onChange={filterCheckClicked('confessions')}
        />
      </Form.Group>

      <PrayerViewFilterComponent />
    </>
  );
};

import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { useGetUserByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { UserAttributes } from '@devouringscripture/common';
import { PrayerViewFilterComponent } from './PrayerViewFilterComponent';

export function PrayerSettings() {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  const changeFilterOption = useCallback(() => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.prayer.showAllItems = !newUser.settings.prayer.showAllItems;
    update(newUser);
  }, [data, update]);

  const changeSortOption = useCallback(() => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    if (newUser.settings.prayer.sort === 'date-asc') {
      newUser.settings.prayer.sort = 'date-desc';
    } else {
      newUser.settings.prayer.sort = 'date-asc';
    }
    update(newUser);
  }, [data, update]);

  const filterCheckClicked = useCallback(
    (filterCheck: string) => {
      const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
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

      update(newUser);
    },
    [data, update]
  );

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const showAll = data!.settings.prayer.showAllItems;

  let sortOptions = data!.settings.prayer.sort;
  if (sortOptions !== 'date-asc' && sortOptions !== 'date-desc') {
    sortOptions = 'date-asc';
  }

  return (
    <Form>
      <Form.Group className="p-2">
        <Form.Text>Completed/Active Requests?</Form.Text>
        <Form.Check
          type="radio"
          id="showAllPrayerItemsRadio"
          label="Show All Prayer Items"
          name="prayerFilter"
          checked={showAll}
          onChange={changeFilterOption}
        />
        <Form.Check
          type="radio"
          id="showActivePrayerItemsRadio"
          label="Show Active Prayer Items"
          name="prayerFilter"
          checked={!showAll}
          onChange={changeFilterOption}
        />
      </Form.Group>
      <Form.Group className="p-2">
        <Form.Text>Sort Order?</Form.Text>
        <Form.Select aria-label="Sort By?" onChange={changeSortOption} value={sortOptions}>
          <option value="date-asc">Date Ascending</option>
          <option value="date-desc">Date Descending</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="p-2">
        <Form.Text>Filter Prayer Types?</Form.Text>
        <Form.Check
          type="checkbox"
          id="showAllTypesCheck"
          label="Any"
          checked={data!.settings.prayer.filters.showAll}
          onChange={() => filterCheckClicked('all')}
        />
        <Form.Check
          type="checkbox"
          id="showUnlabeledCheck"
          label="Un-Labeled"
          checked={data!.settings.prayer.filters.showUnLabeled}
          disabled={data?.settings.prayer.filters.showAll}
          onChange={() => filterCheckClicked('unlabeled')}
        />
        <Form.Check
          type="checkbox"
          id="showRequestsCheck"
          label="Requests"
          checked={data!.settings.prayer.filters.showRequests}
          disabled={data!.settings.prayer.filters.showAll}
          onChange={() => filterCheckClicked('requests')}
        />
        <Form.Check
          type="checkbox"
          id="showPraiseCheck"
          label="Praise"
          checked={data!.settings.prayer.filters.showPraise}
          disabled={data!.settings.prayer.filters.showAll}
          onChange={() => filterCheckClicked('praise')}
        />
        <Form.Check
          type="checkbox"
          id="showConfessionsCheck"
          label="Confessions"
          checked={data!.settings.prayer.filters.showConfessions}
          disabled={data!.settings.prayer.filters.showAll}
          onChange={() => filterCheckClicked('confessions')}
        />
      </Form.Group>

      <PrayerViewFilterComponent />
    </Form>
  );
}

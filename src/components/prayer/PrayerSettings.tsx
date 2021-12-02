import React from 'react';
import Form from 'react-bootstrap/Form';
import { useGetUserByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { UserAttributes } from '../../datamodel/User';

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

  let sortOptions = data!.settings.prayer.sort;
  if (sortOptions !== 'date-asc' && sortOptions !== 'date-desc') {
    sortOptions = 'date-asc';
  }

  const changeFilterOption = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.prayer.showAllItems = !newUser.settings.prayer.showAllItems;
    update(newUser);
  };

  const changeSortOption = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    if (newUser.settings.prayer.sort === 'date-asc') {
      newUser.settings.prayer.sort = 'date-desc';
    } else {
      newUser.settings.prayer.sort = 'date-asc';
    }
    update(newUser);
  };

  const filterCheckClicked = (filterCheck: string) => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    const filters = newUser.settings.prayer.filters;

    switch (filterCheck) {
      case 'all':
        if (filters.showAll) {
          filters.showAll = false;
        } else {
          filters.showAll = true;
          filters.showConfessions = true;
          filters.showPraise = true;
          filters.showRequests = true;
        }
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
  };

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
          onClick={changeFilterOption}
        />
        <Form.Check
          type="radio"
          id="showActivePrayerItemsRadio"
          label="Show Active Prayer Items"
          name="prayerFilter"
          checked={!showAll}
          onClick={changeFilterOption}
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
          onClick={() => filterCheckClicked('all')}
        />
        <Form.Check
          type="checkbox"
          id="showRequestsCheck"
          label="Requests"
          checked={data!.settings.prayer.filters.showRequests}
          disabled={data!.settings.prayer.filters.showAll}
          onClick={() => filterCheckClicked('requests')}
        />
        <Form.Check
          type="checkbox"
          id="showPraiseCheck"
          label="Praise"
          checked={data!.settings.prayer.filters.showPraise}
          disabled={data!.settings.prayer.filters.showAll}
          onClick={() => filterCheckClicked('praise')}
        />
        <Form.Check
          type="checkbox"
          id="showConfessionsCheck"
          label="Confessions"
          checked={data!.settings.prayer.filters.showConfessions}
          disabled={data!.settings.prayer.filters.showAll}
          onClick={() => filterCheckClicked('confessions')}
        />
      </Form.Group>
    </Form>
  );
}

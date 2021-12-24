import { UserAttributes } from '../dm/UserItems';

export const generateDefaultUser = (): UserAttributes => {
  return {
    firstName: 'David',
    lastName: 'Hunter',
    displayName: 'Hunter',
    signupDate: '2021-11-01',
    id: '2f740108-8596-4a8a-b334-518ab34a8c50',
    settings: {
      showSizeIndicator: false,
      actions: {
        showSettings: true,
        showPrayerEntry: true,
      },
      home: {
        showSettings: true,
        showActions: true,
        showPrayers: true,
      },
      prayer: {
        showSettings: true,
        showAllItems: true,
        sort: 'date-asc',
        filters: {
          showAll: true,
          showUnLabeled: true,
          showConfessions: true,
          showPraise: true,
          showRequests: true,
        },
      },
    },
  };
};

import { UserAttributes } from '@devouringscripture/common';

/**
 * Helper function to return a user object, the first time the app
 * is run without such data.
 *
 * @returns Pre-populated user object, with proper defaults
 */
export const generateDefaultUser = (): UserAttributes => {
  return {
    firstName: 'David',
    lastName: 'Hunter',
    displayName: 'Hunter',
    signupDate: '2021-11-01',
    id: '2f740108-8596-4a8a-b334-518ab34a8c50',
    isAdmin: true,
    settings: {
      showSizeIndicator: false,
      showToastTester: false,
      actions: {
        showSettings: true,
      },
      home: {
        showSettings: true,
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
      read: {
        showSettings: true,
        showReadingPlan: true,
        defaultVersion: 'ESV',
      },
      plans: {
        showSettings: true,
      },
      stats: {
        showSettings: true,
        statsFilter: 'alltime',
        vizualizationsOrder: [
          { name: 'AllActivities', active: true, order: 0 },
          { name: 'OldVsNew', active: false, order: 1 },
          { name: 'ReadScripture', active: true, order: 2 },
          { name: 'Prayed', active: true, order: 3 },
          { name: 'DetailedReading', active: false, order: 4 },
        ],
      },
    },
  };
};

export interface UserAttributes {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  signupDate: string;
  id: string;
  settings: {
    showSizeIndicator: boolean;
    showToastTester: boolean;
    actions: {
      showSettings: boolean;
      showPrayerEntry: boolean;
    };
    home: {
      showSettings: boolean;
      showActions: boolean;
      showPrayers: boolean;
      statsFilter: string;
      vizualizationsOrder: { name: string; active: boolean; order: number }[];
    };
    prayer: {
      showSettings: boolean;
      showAllItems: boolean;
      sort: string;
      filters: {
        showAll: boolean;
        showUnLabeled: boolean;
        showRequests: boolean;
        showPraise: boolean;
        showConfessions: boolean;
      };
    };
    read: {
      showSettings: boolean;
      defaultVersion: string;
    };
  };
}

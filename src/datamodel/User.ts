export interface UserAttributes {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  signupDate: string;
  id: string;
  settings: {
    showSizeIndicator: boolean;
    actions: {
      showSettings: boolean;
      showPrayerEntry: boolean;
    };
    home: {
      showSettings: boolean;
      showActions: boolean;
      showPrayers: boolean;
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
  };
}

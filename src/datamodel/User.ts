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
      filters: {
        showAll: boolean;
        showRequests: boolean;
        showPraise: boolean;
        showConfessions: boolean;
      };
    };
  };
}

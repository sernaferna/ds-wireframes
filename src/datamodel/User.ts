export interface UserAttributes {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  signupDate: string;
  id: string;
  settings: {
    actions: {
      showSettings: boolean;
    };
  };
}

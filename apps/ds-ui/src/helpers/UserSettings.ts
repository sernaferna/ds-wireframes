import { useMemo, useCallback } from 'react';
import { UserAttributes } from '@devouringscripture/common';
import { useGetUserByIdQuery, HARDCODED_USER_ID, useUpdateUserMutation } from '../services/UserService';
import { get as getProperty, set as setProperty } from 'lodash-es';

// Type declarations for the types of functions exported from the hook
type FlipBoolPropertyFunction = (propPath: string) => void;
type FlipBoolPropertyCallbackFunction = (propPath: string) => () => void;
type UpdateStringSettingFunction = (propPath: string, newValue: string) => void;
type UpdateStringPropertyCallbackFunction = (propPath: string, newValue: string) => () => void;
type GetNewUserHelper = () => UserAttributes;
type UpdateBulkUserFunction = (newUser: UserAttributes) => void;

/**
 * Hook for working with User Settings. Since numerous components within
 * the application need to retrieve and/or update settings, this hook makes
 * it easy to do so, without a lot of duplicated code across the app.
 *
 * Each of the helper functions / callbacks automatically sends the update to
 * the server, so calling components can simply make the updates, confident that
 * they'll get redrawn when the updates come back.
 *
 * The last two helper functions (`GetNewUserHelper` and `UpdateBulkUserFunction`)
 * are used in more complicated cases, where a simple "set the value of this one property"
 * isn't good enough.
 *
 * @returns Tuple of the following items: 1) the user data (undefined until avail
 * from the API); 2) the error response (if any) from the API; 3) isLoading;
 * 4) helper function to "flip" a boolean property; 5) a Callback version of
 * the same function; 6) helper function to set a string property; 7) callback
 * version of the same function; 8) helper function to get a copy of the user
 * data; 9) helper function to update a "raw" user on the server (as opposed to
 * just one property).
 */
export const useUserSettings = (): [
  UserAttributes | undefined,
  any,
  boolean,
  FlipBoolPropertyFunction,
  FlipBoolPropertyCallbackFunction,
  UpdateStringSettingFunction,
  UpdateStringPropertyCallbackFunction,
  GetNewUserHelper,
  UpdateBulkUserFunction
] => {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [updateUser] = useUpdateUserMutation();

  const userObjResponse: UserAttributes | undefined = useMemo(() => {
    if (!isLoading && !error && data !== undefined) {
      return data;
    }

    return undefined;
  }, [data, error, isLoading]);

  const errResponse: any = useMemo(() => error, [error]);

  /**
   * Helper function to return a copy of the user data object (since the
   * original shouldn't be modified).
   *
   * @returns New copy of the user data object
   */
  const getNewUserHelper: GetNewUserHelper = useCallback((): UserAttributes => {
    return JSON.parse(JSON.stringify(data));
  }, [data]);

  /**
   * Helper function to take an entire user data object and update it on
   * the server, for more complicated cases where setting a single property
   * won't work.
   *
   * @param newUser The new user object to be sent to the server.
   */
  const updateBulkUser: UpdateBulkUserFunction = useCallback(
    (newUser: UserAttributes) => {
      updateUser(newUser);
    },
    [updateUser]
  );

  /**
   * Function to "flip" a boolean property. That is, change true to false
   * or false to true.
   *
   * @param propPath The path of the property to change. e.g. "settings.home.showSettings"
   */
  const flipBool: FlipBoolPropertyFunction = useCallback(
    (propPath: string) => {
      const newUser = getNewUserHelper();
      let newVal = getProperty(newUser, propPath) as boolean;
      newVal = !newVal;
      setProperty(newUser, propPath, newVal);
      updateUser(newUser);
    },
    [updateUser, getNewUserHelper]
  );

  /**
   * Same as `flipBool` except in callback function form; this version can
   * easily be used in onChange handlers.
   *
   * @param propPath The path of the property to change
   * @returns Function, making this usable in onChange handlers
   */
  const flipBoolCallback: FlipBoolPropertyCallbackFunction = useCallback(
    (propPath: string) => {
      return () => {
        flipBool(propPath);
      };
    },
    [flipBool]
  );

  /**
   * Function to update the value of a property that holds a string.
   *
   * @param propPath The path of the property to change. e.g. "settings.home.showSettings"
   * @param newValue The new value to use
   */
  const updateString: UpdateStringSettingFunction = useCallback(
    (propPath: string, newValue: string) => {
      const newUser = getNewUserHelper();
      setProperty(newUser, propPath, newValue);
      updateUser(newUser);
    },
    [updateUser, getNewUserHelper]
  );

  /**
   * Same as `updateString` except in callback form; this version can easily be
   * used in onChange handlers.
   *
   * @param propPath The path of the property to change
   * @param newValue The new value to use
   * @returns Function, making this usable in onChange handlers
   */
  const updateStringCallback: UpdateStringPropertyCallbackFunction = useCallback(
    (propPath: string, newValue: string) => {
      return () => {
        updateString(propPath, newValue);
      };
    },
    [updateString]
  );

  return [
    userObjResponse,
    errResponse,
    isLoading,
    flipBool,
    flipBoolCallback,
    updateString,
    updateStringCallback,
    getNewUserHelper,
    updateBulkUser,
  ];
};

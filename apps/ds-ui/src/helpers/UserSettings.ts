import { useMemo, useCallback } from 'react';
import { UserAttributes } from '@devouringscripture/common';
import { useGetUserByIdQuery, HARDCODED_USER_ID, useUpdateUserMutation } from '../services/UserService';
import { get as getProperty, set as setProperty } from 'lodash-es';

type FlipBoolPropertyFunction = (propPath: string) => void;
type FlipBoolPropertyCallbackFunction = (propPath: string) => () => void;
type UpdateStringSettingFunction = (propPath: string, newValue: string) => void;
type UpdateStringPropertyCallbackFunction = (propPath: string, newValue: string) => () => void;
type GetNewUserHelper = () => UserAttributes;
type UpdateBulkUserFunction = (newUser: UserAttributes) => void;

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

  const getNewUserHelper: GetNewUserHelper = useCallback((): UserAttributes => {
    return JSON.parse(JSON.stringify(data));
  }, [data]);

  const updateBulkUser: UpdateBulkUserFunction = useCallback(
    (newUser: UserAttributes) => {
      updateUser(newUser);
    },
    [updateUser]
  );

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

  const flipBoolCallback: FlipBoolPropertyCallbackFunction = useCallback(
    (propPath: string) => {
      return () => {
        flipBool(propPath);
      };
    },
    [flipBool]
  );

  const updateString: UpdateStringSettingFunction = useCallback(
    (propPath: string, newValue: string) => {
      const newUser = getNewUserHelper();
      setProperty(newUser, propPath, newValue);
      updateUser(newUser);
    },
    [updateUser, getNewUserHelper]
  );

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

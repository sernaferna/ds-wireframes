import { useMemo } from 'react';
import { UserAttributes } from '@devouringscripture/common';
import { useGetUserByIdQuery, HARDCODED_USER_ID, useUpdateUserMutation } from '../services/UserService';
import { get as getProperty, set as setProperty } from 'lodash-es';

const getNewUser = (old: UserAttributes): UserAttributes => {
  return JSON.parse(JSON.stringify(old));
};

type FlipBoolPropertyFunction = (propPath: string) => void;
type UpdateStringSettingFunction = (propPath: string, newValue: string) => void;

export const useUserSettings = (): [
  UserAttributes | undefined,
  any,
  boolean,
  FlipBoolPropertyFunction,
  UpdateStringSettingFunction
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

  const flipBoolCallback: FlipBoolPropertyFunction = (propPath: string) => {
    const newUser = getNewUser(data!);
    let newVal = getProperty(newUser, propPath) as boolean;
    newVal = !newVal;
    setProperty(newUser, propPath, newVal);
    updateUser(newUser);
  };

  const updateStringCallback: UpdateStringSettingFunction = (propPath: string, newValue: string) => {
    const newUser = getNewUser(data!);
    setProperty(newUser, propPath, newValue);
    updateUser(newUser);
  };

  return [userObjResponse, errResponse, isLoading, flipBoolCallback, updateStringCallback];
};

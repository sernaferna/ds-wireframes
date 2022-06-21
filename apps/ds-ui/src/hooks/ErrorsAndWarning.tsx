import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export type SetMessageFunction = (message: string | JSX.Element) => string;
export type RemoveMessageFunction = (id: string) => void;

/**
 * Custom hook for error/warning messages. Provides UI for showing
 * dismissable errors/warnings, and functions for adding errors or
 * warnings.
 *
 * @returns Tuple containing: 1) the functional component to be
 *     displayed wherever desired in the UI of the containing page;
 *     2) a function for adding error messages; and 3) a function for
 *     adding warnings.
 */
export const useErrorsAndWarnings = (): [
  React.FC,
  SetMessageFunction,
  SetMessageFunction,
  RemoveMessageFunction,
  RemoveMessageFunction
] => {
  const [errors, setErrors] = useState<JSX.Element[]>([]);
  const [warnings, setWarnings] = useState<JSX.Element[]>([]);

  const addError: SetMessageFunction = (message) => {
    const uuid = uuidv4();

    const err: JSX.Element =
      typeof message === 'string' ? <div key={uuid}>{message}</div> : <div key={uuid}>{message}</div>;
    const errorSlice = errors.slice();
    errorSlice.push(err);
    setErrors(errorSlice);

    return uuid;
  };

  const removeError: RemoveMessageFunction = (id) => {
    const newErrs: JSX.Element[] = [];

    for (const e of errors) {
      if (e.key !== id) {
        newErrs.push(e);
      }
    }

    setErrors(newErrs);
  };

  const addWarning: SetMessageFunction = (message) => {
    const uuid = uuidv4();

    const warn: JSX.Element =
      typeof message === 'string' ? <div key={uuid}>{message}</div> : <div key={uuid}>{message}</div>;
    const warnSlice = warnings.slice();
    warnSlice.push(warn);
    setWarnings(warnSlice);

    return uuid;
  };

  const removeWarning: RemoveMessageFunction = (id) => {
    const newWarns: JSX.Element[] = [];

    for (const w of warnings) {
      if (w.key !== id) {
        newWarns.push(w);
      }
    }

    setWarnings(newWarns);
  };

  const AlertUI = () => {
    return (
      <div>
        <Alert variant="danger" dismissible show={errors.length > 0} onClose={() => setErrors([])}>
          {errors}
        </Alert>
        <Alert variant="warning" dismissible show={warnings.length > 0} onClose={() => setWarnings([])}>
          {warnings}
        </Alert>
      </div>
    );
  };

  return [AlertUI, addError, addWarning, removeError, removeWarning];
};

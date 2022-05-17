import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

type SetMessageFunction = (message: string | JSX.Element) => void;

/**
 * Custom hook for working with error/warning messages. Provides UI
 * (dismissible) for showing the errors/warnings, and functions for
 * adding errors or warnings.
 *
 * @returns Tuble containing: 1) the Functional Component to be
 *     displayed wherever desired in the UI of the containing page;
 *     2) a function for adding error messages; and 3) a function for
 *     adding warnings.
 */
export const useErrorsAndWarnings = (): [
  React.FC,
  SetMessageFunction,
  SetMessageFunction,
  SetMessageFunction,
  SetMessageFunction
] => {
  const [errors, setErrors] = useState<JSX.Element[]>([]);
  const [warnings, setWarnings] = useState<JSX.Element[]>([]);

  const addError: SetMessageFunction = (message) => {
    const err: JSX.Element = typeof message === 'string' ? <div>{message}</div> : message;
    const errorSlice = errors.slice();
    errorSlice.push(err);
    setErrors(errorSlice);
  };

  const removeError: SetMessageFunction = (message) => {
    const err: JSX.Element = typeof message === 'string' ? <div>{message}</div> : message;
    const newErrs: JSX.Element[] = [];

    for (const e of errors) {
      if (e !== err) {
        newErrs.push(e);
      }
    }

    setErrors(newErrs);
  };

  const addWarning: SetMessageFunction = (message) => {
    const warn: JSX.Element = typeof message === 'string' ? <div>{message}</div> : message;
    const warnSlice = warnings.slice();
    warnSlice.push(warn);
    setWarnings(warnSlice);
  };

  const removeWarning: SetMessageFunction = (message) => {
    const warn: JSX.Element = typeof message === 'string' ? <div>{message}</div> : message;
    const newWarns: JSX.Element[] = [];

    for (const w of warnings) {
      if (w !== warn) {
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

import React, { useState, useCallback, useEffect, ChangeEvent, FormEvent, FocusEvent } from 'react';
import Container from 'react-bootstrap/Container';
import { Verse } from '@devouringscripture/common';
import { isReferenceValid, getRefForVerses, getOSISForReference } from '@devouringscripture/refparse';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { DayForPlan, generateDayList, getValue } from './Helpers';
import { useLazyGetVersesForOSISQuery } from '../../../services/VapiService';
import { initialPlanValues, validate } from './EditPlanValidations';

import { EditPlanForm } from './EditPlanForm';
import { v4 as uuidv4 } from 'uuid';

export const EditPlan = () => {
  const userResponse = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [versesTrigger, versesResult] = useLazyGetVersesForOSISQuery();
  const [values, setValues] = useState(initialPlanValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [days, setDays] = useState<DayForPlan[]>([]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, type } = event.currentTarget;
      let value = event.currentTarget.value;

      if (type === 'checkbox') {
        value = event.currentTarget.checked ? 'on' : 'off';
      }

      //update value; keep number fields as number
      setValues({ ...values, [name]: getValue(type, value) });

      //indicate the field was touched
      setTouched({ ...touched, [name]: true });
    },
    [setValues, setTouched, touched, values]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.currentTarget;

      //remove previous errors
      const { [name]: removedError, ...rest } = errors as any;

      const error: string | null = validate[name](value);

      //validate the field if it has been touched
      setErrors({
        ...rest,
        ...(error && { [name]: touched[name] && error }),
      });
    },
    [errors, setErrors, touched]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      //validate the form
      const formValidation: any = Object.keys(values).reduce((acc: any, key): any => {
        const newError = validate[key]((values as any)[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        };
      });
      setErrors(formValidation.errors);
      setTouched(formValidation.touched);

      if (
        !Object.values(formValidation.errors).length && //errors object is empty
        Object.values(formValidation.touched).length === Object.values(values).length && // all items were touched
        Object.values(formValidation.touched).every((t) => t === true) //every touched field is true
      ) {
        console.log(JSON.stringify(values, null, 2)); // TODO
      }
    },
    [values, setErrors, setTouched]
  );

  const regenerateDayList = useCallback(() => {
    let verses: Verse[] | undefined = undefined;

    if (
      versesResult &&
      !versesResult.error &&
      !versesResult.isLoading &&
      !versesResult.isUninitialized &&
      values.reference.trim().length > 0
    ) {
      verses = versesResult.data!.slice();
    }

    const listOfDays = generateDayList({
      includeWeekends: values.includeWeekends,
      isFreeform: values.isFreeform,
      numWeeks: values.numWeeks,
      verses: verses,
    });

    setDays(listOfDays);
  }, [values.includeWeekends, values.isFreeform, values.numWeeks, values.reference, versesResult]);

  const updateWeeks = useCallback(
    (newValue: number) => {
      setTouched({
        ...touched,
        numWeeks: true,
      });

      setValues({
        ...values,
        numWeeks: newValue,
      });

      regenerateDayList();
    },
    [setValues, setTouched, touched, values, regenerateDayList]
  );

  const fetchVerses = useCallback(() => {
    if (values.reference.trim().length > 0 && isReferenceValid(values.reference)) {
      versesTrigger(values.reference);
    }
  }, [values.reference, versesTrigger]);

  useEffect(() => {
    regenerateDayList();
  }, [versesResult, regenerateDayList]);

  const updateDay = useCallback(
    (update: DayForPlan) => {
      const newList = days.slice();

      for (let i = 0; i < newList.length; i++) {
        if (newList[i].id === update.id) {
          if (newList[i].osis && isReferenceValid(newList[i].osis!)) {
            newList[i].osis = getOSISForReference(update.osis || '');
          } else {
            newList[i].osis = update.osis;
          }
          newList[i].verses = update.verses;
          newList[i].id = uuidv4();
          break;
        }
      }

      setDays(newList);
    },
    [days, setDays]
  );

  const moveVerseUp = useCallback(
    (dayNum: number, cascade: boolean = false) => {
      const newList = days.slice();
      const currentDay = dayNum - 1;

      for (let i = currentDay; i < newList.length; i++) {
        if (cascade || i === currentDay) {
          if (newList[i + 1].verses === undefined || newList[i + 1].verses!.length < 1) {
            break;
          }
          if (newList[i].verses === undefined) {
            newList[i].verses = [];
          }
          newList[i].verses!.push(newList[i + 1].verses![0]);
          newList[i].osis = getOSISForReference(getRefForVerses(newList[i].verses));
          newList[i].id = uuidv4();
          newList[i + 1].verses!.splice(0, 1);
          newList[i + 1].osis = getOSISForReference(getRefForVerses(newList[i + 1].verses));
          newList[i + 1].id = uuidv4();
        }
      }

      setDays(newList);
    },
    [days, setDays]
  );

  const moveVerseDown = useCallback(
    (dayNum: number, cascade: boolean = false) => {
      const newList = days.slice();
      const currentDay = dayNum - 1;

      for (let i = currentDay; i > 0; i--) {
        if (cascade || i === currentDay) {
          if (newList[i - 1].verses === undefined || newList[i - 1].verses!.length < 1) {
            break;
          }
          if (newList[i].verses === undefined) {
            newList[i].verses = [];
          }
          newList[i].verses!.unshift(newList[i - 1].verses!.pop() as Verse);
          newList[i].osis = getOSISForReference(getRefForVerses(newList[i].verses));
          newList[i].id = uuidv4();
          newList[i - 1].osis = getOSISForReference(getRefForVerses(newList[i - 1].verses));
          newList[i - 1].id = uuidv4();
        }
      }

      setDays(newList);
    },
    [days, setDays]
  );

  if (userResponse.isLoading) {
    return <LoadingMessage />;
  }
  if (userResponse.error) {
    return <ErrorLoadingDataMessage />;
  }

  return (
    <Container fluid>
      <h1>Edit Plan</h1>
      <EditPlanForm
        days={days}
        errors={errors}
        user={userResponse.data!}
        values={values}
        touched={touched}
        fetchVerses={fetchVerses}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        moveVerseDown={moveVerseDown}
        moveVerseUp={moveVerseUp}
        updateDay={updateDay}
        updateWeeks={updateWeeks}
      />
    </Container>
  );
};

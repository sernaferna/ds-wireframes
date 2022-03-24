import React, { useState, useCallback, useEffect, ChangeEvent, FocusEvent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import {
  Verse,
  BasePlanAttributes,
  ErrorResponse,
  isReferenceValid,
  getRefForVerses,
  getOSISForReference,
} from '@devouringscripture/common';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage, generateErrorStringFromError } from '../../common/loading';
import { DayForPlan, generateDayList, getValue, generateDaysForUpload } from './Helpers';
import { useLazyGetVersesForOSISQuery } from '../../../services/VapiService';
import {
  useSavePlanMutation,
  usePublishPlanMutation,
  useLazyGetPlanByInstanceIdQuery,
} from '../../../services/PlanService';
import { getSelectedPlan } from '../../../stores/UISlice';
import { initialPlanValues, PlanValues, validate } from './EditPlanValidations';
import { EditPlanForm } from './EditPlanForm';
import { v4 as uuidv4 } from 'uuid';

export const EditPlan = () => {
  const userResponse = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [versesTrigger, versesResult] = useLazyGetVersesForOSISQuery();
  const [values, setValues] = useState(initialPlanValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [days, setDays] = useState<DayForPlan[]>([]);
  const navigate = useNavigate();
  const [savePlan] = useSavePlanMutation();
  const [publishPlan] = usePublishPlanMutation();
  const [errorMessages, updateErrorMessages] = useState<JSX.Element[]>([]);
  const selectedPlan = useSelector(getSelectedPlan);
  const [planTrigger, planServerResult] = useLazyGetPlanByInstanceIdQuery();

  useEffect(() => {
    if (planServerResult.isLoading || planServerResult.error) {
      return;
    }

    if (selectedPlan.length > 0) {
      if (selectedPlan !== values.planInstanceId) {
        planTrigger(selectedPlan);
      }

      if (planServerResult && planServerResult.isSuccess && !planServerResult.isLoading) {
        const plan: PlanValues = {
          planName: planServerResult.data.name,
          description: planServerResult.data.description,
          numWeeks: planServerResult.data.length,
          version: planServerResult.data.version,
          isAdmin: planServerResult.data.isAdmin,
          includeApocrypha: planServerResult.data.includesApocrypha,
          includeWeekends: planServerResult.data.includeWeekends,
          isFreeform: true,
          reference: '',
          planInstanceId: planServerResult.data.planInstanceId,
        };
        setValues(plan);
      }
    }
  }, [planServerResult, selectedPlan, setValues, planTrigger, values.planInstanceId]);

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

  const validateForm = useCallback((): boolean => {
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
      !Object.values(formValidation.errors).length //errors object is empty
    ) {
      return true;
    }

    return false;
  }, [values, setErrors, setTouched]);

  const handleSubmit = useCallback(() => {
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    let uploadableDays: any;
    try {
      uploadableDays = generateDaysForUpload(days);
    } catch {
      const errs = errorMessages.slice();
      errs.push(<p>Error uploading data. Check that all days in the plan are valid.</p>);
      updateErrorMessages(errs);
    }
    const plan: BasePlanAttributes = {
      name: values.planName,
      description: values.description,
      includeWeekends: values.includeWeekends,
      includesApocrypha: values.includeApocrypha,
      isAdmin: values.isAdmin,
      length: values.numWeeks,
      osis: values.reference,
      version: values.version,
      days: uploadableDays,
    };
    publishPlan(plan)
      .unwrap()
      .then((payload) => {
        navigate('/plans');
      })
      .catch((error) => {
        const newErrors = errorMessages.slice();
        if ('data' in error) {
          const errorResponse: ErrorResponse = error.data;
          newErrors.push(generateErrorStringFromError(errorResponse));
        } else {
          newErrors.push(<p>Unanticipated error saving data</p>);
        }
        updateErrorMessages(newErrors);
      });
  }, [validateForm, publishPlan, values, updateErrorMessages, navigate, errorMessages, days]);

  const handleSave = useCallback(() => {
    const isFormValid = validateForm();
    if (!isFormValid) {
      console.log('Form is invalid');
      return;
    }

    const plan: BasePlanAttributes = {
      name: values.planName,
      description: values.description,
      includeWeekends: values.includeWeekends,
      includesApocrypha: values.includeApocrypha,
      isAdmin: values.isAdmin,
      length: values.numWeeks,
      osis: values.reference,
      version: values.version,
      days: [],
    };
    savePlan(plan)
      .unwrap()
      .then((payload) => {
        navigate('/plans');
      })
      .catch((error) => {
        const newErrors = errorMessages.slice();
        if ('data' in error) {
          const errorResponse: ErrorResponse = error.data;
          newErrors.push(generateErrorStringFromError(errorResponse));
        } else {
          newErrors.push(<p>Unanticipated error saving data</p>);
        }
        updateErrorMessages(newErrors);
      });
  }, [validateForm, savePlan, navigate, values, errorMessages, updateErrorMessages]);

  const handleReset = useCallback(() => {
    setValues(initialPlanValues);
    setDays([]);
    setErrors({});
    setTouched({});
  }, [setValues, setDays, setErrors, setTouched]);

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
  }, [values.includeWeekends, values.isFreeform, values.numWeeks, values.reference, versesResult, setDays]);

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
    return <ErrorLoadingDataMessage theError={userResponse.error} />;
  }

  return (
    <Container fluid>
      <h1>Edit Plan</h1>
      <Alert
        variant="danger"
        dismissible
        show={errorMessages.length > 0}
        onClose={() => {
          updateErrorMessages([]);
        }}
      >
        {errorMessages}
      </Alert>
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
        handleSave={handleSave}
        handleReset={handleReset}
        moveVerseDown={moveVerseDown}
        moveVerseUp={moveVerseUp}
        updateDay={updateDay}
        updateWeeks={updateWeeks}
      />
    </Container>
  );
};

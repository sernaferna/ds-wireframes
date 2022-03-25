import React, { useState, useCallback, useEffect, ChangeEvent, FocusEvent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {
  Verse,
  BasePlanAttributes,
  PlanAttributes,
  isReferenceValid,
  getRefForVerses,
  getOSISForReference,
} from '@devouringscripture/common';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage, generateErrorStringFromError } from '../../common/loading';
import { DayForPlan, generateDayList, getValue, generateDaysForUpload } from './Helpers';
import { useErrorsAndWarnings } from '../../../helpers/ErrorsAndWarning';
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
  const selectedPlan = useSelector(getSelectedPlan);
  const [planTrigger, planServerResult] = useLazyGetPlanByInstanceIdQuery();
  const [AlertUI, addErrorMessage] = useErrorsAndWarnings();

  const regenerateDayList = useCallback(
    (reference: string, includeWeekends: boolean, isFreeform: boolean, numWeeks: number) => {
      let verses: Verse[] | undefined = undefined;

      if (
        versesResult &&
        !versesResult.error &&
        !versesResult.isLoading &&
        !versesResult.isUninitialized &&
        reference.trim().length > 0
      ) {
        verses = versesResult.data!.slice();
      }

      const listOfDays = generateDayList({
        includeWeekends,
        isFreeform,
        numWeeks,
        verses,
      });

      setDays(listOfDays);
    },
    [versesResult, setDays]
  );

  useEffect(() => {
    regenerateDayList(values.reference, values.includeWeekends, values.isFreeform, values.numWeeks);
  }, [regenerateDayList, values.reference, values.includeWeekends, values.isFreeform, values.numWeeks]);

  useEffect(() => {
    if (planServerResult.isLoading || planServerResult.error) {
      return;
    }

    if (selectedPlan.length > 0) {
      if (selectedPlan !== values.planInstanceId) {
        planTrigger(selectedPlan)
          .unwrap()
          .then((result) => {
            const plan: PlanValues = {
              planName: result.name,
              description: result.description,
              numWeeks: result.length,
              version: result.version,
              isAdmin: result.isAdmin,
              includeApocrypha: result.includesApocrypha,
              includeWeekends: result.includeWeekends,
              isFreeform: result.isFreeform,
              reference: '',
              planInstanceId: result.planInstanceId,
              planId: result.planId,
              status: result.status,
            };
            setValues(plan);

            if (result.days) {
              const daysFromServer: DayForPlan[] = result.days!.map((day) => ({
                id: uuidv4(),
                osis: day.osis,
              }));
              setDays(daysFromServer);
            } else {
              regenerateDayList(plan.reference, plan.includeWeekends, plan.isFreeform, plan.numWeeks);
            }
          })
          .catch((error) => {
            addErrorMessage('Error retrieving plan from server');
          });
      }
    }
  }, [
    planServerResult,
    selectedPlan,
    setValues,
    planTrigger,
    values.planInstanceId,
    setDays,
    regenerateDayList,
    addErrorMessage,
  ]);

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
      addErrorMessage('Error uploading data. check that all days in the plan are valid.');
    }
    const plan: BasePlanAttributes = {
      name: values.planName,
      description: values.description,
      includeWeekends: values.includeWeekends,
      includesApocrypha: values.includeApocrypha,
      isAdmin: values.isAdmin,
      isFreeform: values.isFreeform,
      length: values.numWeeks,
      osis: values.reference,
      version: values.version,
      days: uploadableDays,
    };
    let uploadablePlan: BasePlanAttributes | PlanAttributes = plan;
    if ('planInstanceId' in values) {
      const fullPlan: PlanAttributes = {
        ...plan,
        planId: values.planId!,
        planInstanceId: values.planInstanceId!,
        status: values.status!,
      };
      uploadablePlan = fullPlan;
    }
    publishPlan(uploadablePlan)
      .unwrap()
      .then((payload) => {
        navigate('/plans');
      })
      .catch((error) => {
        if ('data' in error) {
          addErrorMessage(generateErrorStringFromError(error.data));
        } else {
          addErrorMessage('Unanticipated error saving data');
        }
      });
  }, [validateForm, publishPlan, values, addErrorMessage, navigate, days]);

  const handleSave = useCallback(() => {
    const isFormValid = validateForm();
    if (!isFormValid) {
      addErrorMessage('Form is invalid');
      return;
    }

    const plan: BasePlanAttributes = {
      name: values.planName,
      description: values.description,
      includeWeekends: values.includeWeekends,
      includesApocrypha: values.includeApocrypha,
      isAdmin: values.isAdmin,
      isFreeform: values.isFreeform,
      length: values.numWeeks,
      osis: values.reference,
      version: values.version,
      days: [],
    };

    let uploadablePlan: BasePlanAttributes | PlanAttributes = plan;
    if ('planInstanceId' in values) {
      const newPlan: PlanAttributes = {
        ...plan,
        planId: values.planId!,
        planInstanceId: values.planInstanceId!,
        status: values.status!,
      };
      uploadablePlan = newPlan;
    }
    savePlan(uploadablePlan)
      .unwrap()
      .then((payload) => {
        navigate('/plans');
      })
      .catch((error) => {
        if ('data' in error) {
          addErrorMessage(generateErrorStringFromError(error.data));
        } else {
          addErrorMessage('Unanticipated error saving data');
        }
      });
  }, [validateForm, savePlan, navigate, values, addErrorMessage]);

  const handleReset = useCallback(() => {
    setValues(initialPlanValues);
    setDays([]);
    setErrors({});
    setTouched({});
  }, [setValues, setDays, setErrors, setTouched]);

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
    },
    [setValues, setTouched, touched, values]
  );

  const fetchVerses = useCallback(() => {
    if (values.reference.trim().length > 0 && isReferenceValid(values.reference)) {
      versesTrigger(values.reference)
        .unwrap()
        .catch((error) => {
          addErrorMessage('Error fetching verses');
        });
    }
  }, [versesTrigger, values, addErrorMessage]);

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
      <AlertUI />
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

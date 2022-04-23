import React, { useState, useMemo, ChangeEvent, FocusEvent } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ChevronUp, ChevronDoubleUp, ChevronDown, ChevronDoubleDown } from 'react-bootstrap-icons';
import { getFormattedReference, isReferenceValid, getOSISForReference } from '@devouringscripture/common';
import { DayForPlan } from './Helpers';

interface IRenderDay {
  dayNum: number;
  maxDays: number;
  isFreeform: boolean;
  day: DayForPlan;
  upFunction(day: number, cascade?: boolean): void;
  downFunction(day: number, cascade?: boolean): void;
  updateCallback(day: DayForPlan): void;
}

export const RenderDay = ({
  dayNum,
  maxDays,
  isFreeform,
  day,
  upFunction,
  downFunction,
  updateCallback,
}: IRenderDay) => {
  const [reference, setReference] = useState(day.osis || '');
  const [dirty, setDirty] = useState(false);

  const formattedReference = useMemo(() => {
    if (dirty || !isReferenceValid(reference)) {
      return reference;
    }

    return getFormattedReference(reference);
  }, [reference, dirty]);

  const refForVerses = useMemo(() => {
    if (day.verses === undefined || day.verses.length === 0) {
      return '';
    }

    let tempOsis: string = '';
    for (const verse of day.verses!) {
      tempOsis += verse.osis + ',';
    }
    return getFormattedReference(tempOsis);
  }, [day.verses]);

  let isInvalid: boolean = false;
  if (refForVerses.trim().length > 0) {
    isInvalid = !isReferenceValid(refForVerses);
  } else {
    if (formattedReference.trim().length > 0) {
      isInvalid = !isReferenceValid(formattedReference);
    }
  }

  const refChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setReference(e.currentTarget.value);
    setDirty(true);
  };

  const refBlurred = (e: FocusEvent<HTMLInputElement>) => {
    if (isReferenceValid(e.currentTarget.value)) {
      day.osis = getOSISForReference(e.currentTarget.value);
    } else {
      day.osis = e.currentTarget.value;
    }

    setDirty(true);
    updateCallback(day);
  };

  const handleDown = (day: number) => {
    return () => {
      downFunction(day);
    };
  };

  const handleDoubleDown = (day: number) => {
    return () => {
      downFunction(day, true);
    };
  };

  const handleUp = (day: number) => {
    return () => {
      upFunction(day);
    };
  };

  const handleDoubleUp = (day: number) => {
    return () => {
      upFunction(day, true);
    };
  };

  return (
    <InputGroup>
      <Form.Control
        readOnly={!isFreeform}
        value={refForVerses.length > 0 ? refForVerses : formattedReference}
        type="text"
        name={day.id}
        id={day.id}
        onChange={refChanged}
        onBlur={refBlurred}
        isInvalid={isInvalid}
      />
      {!isFreeform ? (
        <>
          {dayNum > 1 ? (
            <Button variant="outline-secondary" onClick={handleDown(dayNum)}>
              <ChevronDown />
            </Button>
          ) : (
            <></>
          )}
          {dayNum > 2 ? (
            <Button variant="outline-secondary" onClick={handleDoubleDown(dayNum)}>
              <ChevronDoubleDown />
            </Button>
          ) : (
            <></>
          )}
          {dayNum < maxDays ? (
            <Button variant="outline-secondary" onClick={handleUp(dayNum)}>
              <ChevronUp />
            </Button>
          ) : (
            <></>
          )}
          {dayNum < maxDays - 1 ? (
            <Button variant="outline-secondary" onClick={handleDoubleUp(dayNum)}>
              <ChevronDoubleUp />
            </Button>
          ) : (
            <></>
          )}
          {day.verses ? <div className="fw-bold ms-2 text-muted">{`${day.verses.length} verses`}</div> : <></>}
        </>
      ) : (
        <></>
      )}
      <Form.Control.Feedback type="invalid">Invalid reference</Form.Control.Feedback>
    </InputGroup>
  );
};

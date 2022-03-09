import React, { useState, useMemo } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';
import { getFormattedReference, isReferenceValid, getOSISForReference } from '@devouringscripture/refparse';
import { DayForPlan } from './Helpers';

interface RenderDayInterface {
  dayNum: number;
  maxDays: number;
  isFreeform: boolean;
  day: DayForPlan;
  incrementFunction(day: number): void;
  decrementFunction(day: number): void;
  updateCallback(day: DayForPlan): void;
}

export const RenderDay = ({
  dayNum,
  maxDays,
  isFreeform,
  day,
  incrementFunction,
  decrementFunction,
  updateCallback,
}: RenderDayInterface) => {
  const [osis, setOsis] = useState(getFormattedReference(day.osis || ''));

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

  return (
    <InputGroup>
      <Form.Control
        readOnly={!isFreeform}
        value={refForVerses.length > 0 ? refForVerses : osis}
        type="text"
        name={day.id}
        id={day.id}
        onChange={(e) => {
          setOsis(e.currentTarget.value);
        }}
        onBlur={(e) => {
          if (isReferenceValid(e.currentTarget.value)) {
            day.osis = getOSISForReference(e.currentTarget.value);
            updateCallback(day);
          }
        }}
        isInvalid={refForVerses.length > 0 ? isReferenceValid(refForVerses) : isReferenceValid(osis)}
      />
      <Form.Control.Feedback type="invalid">Invalid reference</Form.Control.Feedback>
      {!isFreeform ? (
        <>
          {dayNum > 1 ? (
            <Button variant="outline-secondary" onClick={() => incrementFunction(dayNum)}>
              <CaretUpFill />
            </Button>
          ) : (
            <></>
          )}
          {dayNum < maxDays ? (
            <Button variant="outline-secondary" onClick={() => decrementFunction(dayNum)}>
              <CaretDownFill />
            </Button>
          ) : (
            <></>
          )}
          {day.verses ? <b>{`${day.verses.length} verses`}</b> : <></>}
        </>
      ) : (
        <></>
      )}
    </InputGroup>
  );
};

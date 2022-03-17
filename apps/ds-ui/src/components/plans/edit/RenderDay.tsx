import React, { useState, useMemo } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ChevronUp, ChevronDoubleUp, ChevronDown, ChevronDoubleDown } from 'react-bootstrap-icons';
import { getFormattedReference, isReferenceValid, getOSISForReference } from '@devouringscripture/refparse';
import { DayForPlan } from './Helpers';

interface RenderDayInterface {
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

  let isInvalid: boolean = false;
  if (refForVerses.trim().length > 0) {
    isInvalid = !isReferenceValid(refForVerses);
  } else {
    if (osis.trim().length > 0) {
      isInvalid = !isReferenceValid(osis);
    }
  }

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
        isInvalid={isInvalid}
      />
      {!isFreeform ? (
        <>
          {dayNum > 1 ? (
            <Button variant="outline-secondary" onClick={() => downFunction(dayNum)}>
              <ChevronDown />
            </Button>
          ) : (
            <></>
          )}
          {dayNum > 2 ? (
            <Button variant="outline-secondary" onClick={() => downFunction(dayNum, true)}>
              <ChevronDoubleDown />
            </Button>
          ) : (
            <></>
          )}
          {dayNum < maxDays ? (
            <Button variant="outline-secondary" onClick={() => upFunction(dayNum)}>
              <ChevronUp />
            </Button>
          ) : (
            <></>
          )}
          {dayNum < maxDays - 1 ? (
            <Button variant="outline-secondary" onClick={() => upFunction(dayNum, true)}>
              <ChevronDoubleUp />
            </Button>
          ) : (
            <></>
          )}
          {day.verses ? <b className="ms-2">{`${day.verses.length} verses`}</b> : <></>}
        </>
      ) : (
        <></>
      )}
      <Form.Control.Feedback type="invalid">Invalid reference</Form.Control.Feedback>
    </InputGroup>
  );
};

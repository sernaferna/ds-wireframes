import React, { useState, useMemo, ChangeEvent, FocusEvent, useCallback } from 'react';
import { InputGroup, Form, Button, Row, Col } from 'react-bootstrap';
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

  const valueToShow = useMemo(() => {
    if (day.verses === undefined || day.verses.length < 1) {
      if (dirty || !isReferenceValid(reference)) {
        return reference;
      }

      return getFormattedReference(reference);
    }

    let tempOsis: string = '';
    for (const verse of day.verses!) {
      tempOsis += verse.osis + ',';
    }
    return getFormattedReference(tempOsis);
  }, [day.verses, reference, dirty]);

  const isInvalid: boolean = useMemo(() => {
    if (valueToShow.trim().length > 0) {
      return !isReferenceValid(valueToShow);
    } else {
      return false;
    }
  }, [valueToShow]);

  const refChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setReference(e.currentTarget.value);
      setDirty(true);
    },
    [setReference, setDirty]
  );

  const refBlurred = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (isReferenceValid(e.currentTarget.value)) {
        day.osis = getOSISForReference(e.currentTarget.value);
      } else {
        day.osis = e.currentTarget.value;
      }

      setDirty(true);
      updateCallback(day);
    },
    [setDirty, updateCallback, day]
  );

  const handleDown = useCallback(
    (day: number) => {
      return () => {
        downFunction(day);
      };
    },
    [downFunction]
  );

  const handleDoubleDown = useCallback(
    (day: number) => {
      return () => {
        downFunction(day, true);
      };
    },
    [downFunction]
  );

  const handleUp = useCallback(
    (day: number) => {
      return () => {
        upFunction(day);
      };
    },
    [upFunction]
  );

  const handleDoubleUp = useCallback(
    (day: number) => {
      return () => {
        upFunction(day, true);
      };
    },
    [upFunction]
  );

  const buttonGroup = useMemo(() => {
    return (
      <>
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
      </>
    );
  }, [isFreeform, dayNum, handleDown, handleDoubleDown, handleUp, handleDoubleUp, maxDays, day.verses]);

  return (
    <>
      <div className="d-block d-sm-none">
        <Row>
          <Col xs="12">
            <Form.Control
              readOnly={!isFreeform}
              value={valueToShow}
              type="text"
              name={day.id}
              id={day.id}
              onChange={refChanged}
              onBlur={refBlurred}
              isInvalid={isInvalid}
            />
            <Form.Control.Feedback type="invalid">Invalid reference</Form.Control.Feedback>
          </Col>
          <Col xs="12">{buttonGroup}</Col>
        </Row>
      </div>
      <div className="d-none d-sm-block">
        <InputGroup>
          <Form.Control
            readOnly={!isFreeform}
            value={valueToShow}
            type="text"
            name={day.id}
            id={day.id}
            onChange={refChanged}
            onBlur={refBlurred}
            isInvalid={isInvalid}
          />
          {buttonGroup}
          <Form.Control.Feedback type="invalid">Invalid reference</Form.Control.Feedback>
        </InputGroup>
      </div>
    </>
  );
};

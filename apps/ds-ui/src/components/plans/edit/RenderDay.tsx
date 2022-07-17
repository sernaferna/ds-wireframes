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

/**
 * Renders a `DayForPlan` object to the screen, with the logic needed
 * to show the day properly. Only performs logic for rendering; updates
 * are handled via callbacks.
 *
 * It *does,* however, have logic for rendering the value that
 * should be shown, which could come from a calculation based on
 * the array of `Verse` objects on the day (if any), or could
 * come from the `osis` stored for that day. Whichever is chosen,
 * `getFormattedReference()` is used to show a "pretty" version
 * to the user.
 *
 * A set of callbacks are defined for moving verses up/down, but
 * these are wrappers to the `upFunction` and `downFunction` params.
 *
 * The `dayNum` and `maxDays` params are used to know when to show
 * 1/2/3/4 verse up/down buttons for the day.
 *
 * @param dayNum This day's index in the overall list of days
 * @param maxDays The number of days in the overall list.
 * @param isFreeform Day should have its own, self-contained reference (true) or use the embedded list of verses (false)
 * @param day The `DayForPlan` object to be displayed
 * @param upFunction Callback function when a verse is moved "up" from one day to another
 * @param downFunction Callback function when a verse is moved "down" from one day to another
 * @param updateCallback Callback function to call when the data is updated
 */
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

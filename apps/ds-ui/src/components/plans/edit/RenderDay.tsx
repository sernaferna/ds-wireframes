import React, { useState, useMemo } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { ChevronUp, ChevronDoubleUp, ChevronDown, ChevronDoubleDown } from 'react-bootstrap-icons';
import { getFormattedReference, isReferenceValid, getOSISForReference } from '@devouringscripture/refparse';
import { DayForPlan } from './Helpers';

const moveUpPopover = (
  <Popover id="moveUpPopover">
    <Popover.Body>Move a verse up from below.</Popover.Body>
  </Popover>
);

const cascadeMoveUpPopover = (
  <Popover id="cascadeMoveUpPopover">
    <Popover.Body>Move a verse up from below, and cascade pulling up from subsequent days.</Popover.Body>
  </Popover>
);

const moveDownPopover = (
  <Popover id="moveDownPopover">
    <Popover.Body>Move a verse down from above.</Popover.Body>
  </Popover>
);

const cascadeMoveDownPopover = (
  <Popover id="cascadeMoveDownPopover">
    <Popover.Body>Move a verse down from above, and cascade pulling down from previous days.</Popover.Body>
  </Popover>
);

interface RenderDayInterface {
  dayNum: number;
  maxDays: number;
  isFreeform: boolean;
  day: DayForPlan;
  incrementFunction(day: number, cascade?: boolean): void;
  decrementFunction(day: number, cascade?: boolean): void;
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
            <OverlayTrigger trigger={['focus', 'hover']} overlay={moveDownPopover}>
              <Button variant="outline-secondary" onClick={() => decrementFunction(dayNum)}>
                <ChevronDown />
              </Button>
            </OverlayTrigger>
          ) : (
            <></>
          )}
          {dayNum > 2 ? (
            <OverlayTrigger trigger={['focus', 'hover']} overlay={cascadeMoveDownPopover}>
              <Button variant="outline-secondary" onClick={() => decrementFunction(dayNum, true)}>
                <ChevronDoubleDown />
              </Button>
            </OverlayTrigger>
          ) : (
            <></>
          )}
          {dayNum < maxDays ? (
            <OverlayTrigger trigger={['focus', 'hover']} overlay={moveUpPopover}>
              <Button variant="outline-secondary" onClick={() => incrementFunction(dayNum)}>
                <ChevronUp />
              </Button>
            </OverlayTrigger>
          ) : (
            <></>
          )}
          {dayNum < maxDays - 1 ? (
            <OverlayTrigger trigger={['focus', 'hover']} overlay={cascadeMoveUpPopover}>
              <Button variant="outline-secondary" onClick={() => incrementFunction(dayNum, true)}>
                <ChevronDoubleUp />
              </Button>
            </OverlayTrigger>
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

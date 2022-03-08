import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';
import { Verse } from '@devouringscripture/common';
import { getFormattedReference } from '@devouringscripture/refparse';

interface RenderDayInterface {
  dayNum: number;
  maxDays: number;
  isFreeform: boolean;
  osis?: string;
  verses?: Verse[];
  incrementFunction(day: number): void;
  decrementFunction(day: number): void;
}

export const RenderDay = ({
  dayNum,
  maxDays,
  isFreeform,
  osis,
  verses,
  incrementFunction,
  decrementFunction,
}: RenderDayInterface) => {
  let renderedText: string = '';

  if (osis !== undefined) {
    renderedText = osis;
  } else if (verses !== undefined) {
    let tempOsis: string = '';
    for (const verse of verses!) {
      tempOsis += verse.osis + ',';
      renderedText = getFormattedReference(tempOsis);
    }
  }

  return (
    <InputGroup>
      <Form.Control readOnly={!isFreeform} value={renderedText} />
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
        </>
      ) : (
        <></>
      )}
    </InputGroup>
  );
};

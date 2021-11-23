import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDateForActions, updateDateShowingInActions } from '../../stores/UISlice';
import { CaretLeft, CaretRight } from 'react-bootstrap-icons';

export function ActionsWidget() {
  const dateToShow = new Date(useSelector(getDateForActions));
  const dispatch = useDispatch();

  const handleDateScroll = (increase: boolean) => {
    let newDate = new Date(dateToShow);
    if (increase) {
      newDate.setDate(dateToShow.getDate() + 1);
    } else {
      newDate.setDate(dateToShow.getDate() - 1);
    }

    dispatch(updateDateShowingInActions(newDate.toISOString().split('T')[0]));
  };

  return (
    <div>
      <h4>
        <CaretLeft onClick={() => handleDateScroll(false)} />
        {dateToShow.toISOString().split('T')[0]}
        <CaretRight onClick={() => handleDateScroll(true)} />
      </h4>
    </div>
  );
}

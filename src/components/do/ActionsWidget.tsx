import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDateForActions, updateDateShowingInActions } from '../../stores/UISlice';
import { CaretLeft, CaretRight } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import { useGetActionByDateQuery } from '../../services/ActionsService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { ActionsForDay } from '../../datamodel/Action';

const generateBoxesForActionDay = (day: ActionsForDay) => {
  const customItems = day.customActions.map((item) => {
    return (
      <li key={item.id}>
        {item.displayName}: {item.completed ? 'Yes' : 'No'}
      </li>
    );
  });

  const stringForItem = (id: string) => {
    const itemObj = day.defaultActions.find((item) => {
      return item.id === id;
    });

    try {
      const str = itemObj!.completed ? 'Yes' : 'No';
    } catch (err) {
      console.log(id);
    }
    return itemObj!.completed ? 'Yes' : 'No';
  };

  return (
    <ul>
      <li key="actions/default/shortotpass">Read Short OT Passage: {stringForItem('actions/default/shortotpass')}</li>
      <li key="actions/default/rsntpass">Read Short NT Passage: {stringForItem('actions/default/rsntpass')}</li>
      <li key="actions/default/rlotpass">Read Long OT Passage: {stringForItem('actions/default/rlotpass')}</li>
      <li key="actions/default/rlntpass">Read Long NT Passage: {stringForItem('actions/default/rlntpass')}</li>
      <li key="actions/default/journ">Journalled: {stringForItem('actions/default/journ')}</li>
      <li key="actions/default/pray">Prayed: {stringForItem('actions/default/pray')}</li>
      <li key="actions/default/create">Did Something Creative for God: {stringForItem('actions/default/create')}</li>
      <li key="actions/default/converse">Had a Spiritual Conversation: {stringForItem('actions/default/converse')}</li>
      {customItems}
    </ul>
  );
};

export function ActionsWidget() {
  const dateToShow = new Date(useSelector(getDateForActions));
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetActionByDateQuery(dateToShow.toISOString().split('T')[0]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

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
    <Card className="m-0">
      <Card.Body>
        <h4>
          <CaretLeft onClick={() => handleDateScroll(false)} />
          {dateToShow.toISOString().split('T')[0]}
          <CaretRight onClick={() => handleDateScroll(true)} />
        </h4>
        {generateBoxesForActionDay(data!)}
      </Card.Body>
    </Card>
  );
}

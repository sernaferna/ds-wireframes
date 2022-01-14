import React from 'react';
import { ActionsForDay } from '@devouringscripture/common';
import { ActionCheckItem } from './ActionCheckItem';
import { useMarkItemReadForDayMutation } from '../../services/ActionsService';

interface ActionWidgetFormInterface {
  day: ActionsForDay;
}
export function ActionWidgetForm({ day }: ActionWidgetFormInterface) {
  const [markReadUnread] = useMarkItemReadForDayMutation();

  const itemClicked = (id: string) => {
    markReadUnread({
      idForDay: day.id,
      idForItem: id,
      dataForDay: day,
    }).catch((err) => {
      console.log(err);
    });
  };

  const defaultItems = day.defaultActions.map((item) => (
    <ActionCheckItem key={item.id} item={item} clickFunction={itemClicked} />
  ));
  const customItems = day.customActions.map((item) => (
    <ActionCheckItem key={item.id} item={item} clickFunction={itemClicked} />
  ));

  return (
    <ul>
      {defaultItems}
      {customItems}
    </ul>
  );
}

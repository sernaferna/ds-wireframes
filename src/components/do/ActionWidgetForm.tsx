import React from 'react';
import { ActionsForDay } from '../../datamodel/Action';
import { ActionCheckItem } from './ActionCheckItem';
import { useMarkItemReadForDayMutation } from '../../services/ActionsService';

interface ActionWidgetFormInterface {
  day: ActionsForDay;
}

export function ActionWidgetForm(data: ActionWidgetFormInterface) {
  const [markReadUnread] = useMarkItemReadForDayMutation();

  const itemClicked = (id: string) => {
    markReadUnread({
      idForDay: data.day.id,
      idForItem: id,
    }).catch((err) => {
      console.log(err);
    });
  };

  const defaultItems = data.day.defaultActions.map((item) => <ActionCheckItem item={item} clickFunction={itemClicked} />);
  const customItems = data.day.customActions.map((item) => <ActionCheckItem item={item} clickFunction={itemClicked} />);

  return (
    <ul>
      {defaultItems}
      {customItems}
    </ul>
  );
}

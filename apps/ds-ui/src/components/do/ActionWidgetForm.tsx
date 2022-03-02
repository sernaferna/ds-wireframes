import React, { useCallback, useMemo } from 'react';
import { ActionsForDay } from '@devouringscripture/common';
import { ActionCheckItem } from './ActionCheckItem';
import { useMarkItemReadForDayMutation } from '../../services/ActionsService';

interface ActionWidgetFormInterface {
  day: ActionsForDay;
}
export function ActionWidgetForm({ day }: ActionWidgetFormInterface) {
  const [markReadUnread] = useMarkItemReadForDayMutation();

  const itemClicked = useCallback(
    (id: string) => {
      markReadUnread({
        idForDay: day.id,
        idForItem: id,
        dataForDay: day,
      }).catch((err) => {
        console.log(err);
      });
    },
    [markReadUnread, day]
  );

  const defaultItems = useMemo(
    () => day.defaultActions.map((item) => <ActionCheckItem key={item.id} item={item} clickFunction={itemClicked} />),
    [day.defaultActions, itemClicked]
  );
  const customItems = useMemo(
    () => day.customActions.map((item) => <ActionCheckItem key={item.id} item={item} clickFunction={itemClicked} />),
    [day.customActions, itemClicked]
  );

  return (
    <ul>
      {defaultItems}
      {customItems}
    </ul>
  );
}

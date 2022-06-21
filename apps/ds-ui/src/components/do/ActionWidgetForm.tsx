import React, { useCallback, useMemo } from 'react';
import { ActionsForDay } from '@devouringscripture/common';
import { ActionCheckItem } from './ActionCheckItem';
import { useMarkItemReadForDayMutation } from '../../services/ActionsService';
import { SetMessageFunction } from '../../hooks/ErrorsAndWarning';

interface IActionWidgetForm {
  day: ActionsForDay;
  setErrorMessage: SetMessageFunction;
}
export function ActionWidgetForm({ day, setErrorMessage }: IActionWidgetForm) {
  const [markReadUnread] = useMarkItemReadForDayMutation();

  const itemClicked = useCallback(
    (id: string) => {
      markReadUnread({
        idForDay: day.id,
        idForItem: id,
        dataForDay: day,
      }).catch((err) => {
        setErrorMessage('Error changing status of item');
      });
    },
    [markReadUnread, day, setErrorMessage]
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

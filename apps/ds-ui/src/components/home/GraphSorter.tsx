import React from 'react';
import { useGetUserByIdQuery, HARDCODED_USER_ID, useUpdateUserMutation } from '../../services/UserService';
import { ErrorLoadingDataMessage, LoadingMessage } from '../common/loading';
import Stack from 'react-bootstrap/Stack';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';
import { UserAttributes } from '@devouringscripture/common';

const sortVizList = (
  list: { name: string; active: boolean; order: number }[]
): { name: string; active: boolean; order: number }[] => {
  return list.slice().sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });
};

const updateOrderNoInList = (
  initialList: { name: string; active: boolean; order: number }[]
): { name: string; active: boolean; order: number }[] => {
  let listToReturn: { name: string; active: boolean; order: number }[] = [];

  for (let i = 0; i < initialList.length; i++) {
    const item = { name: initialList[i].name, active: initialList[i].active, order: i };
    listToReturn.push(item);
  }

  return listToReturn;
};

const moveItemUpInList = (initialList: { name: string; active: boolean; order: number }[], name: string) => {
  const list = sortVizList(initialList);
  const index = list.findIndex((item) => item.name === name);

  [list[index], list[index - 1]] = [list[index - 1], list[index]];
  const returnList = updateOrderNoInList(list);

  return returnList;
};

const moveItemDownInList = (initialList: { name: string; active: boolean; order: number }[], name: string) => {
  const list = sortVizList(initialList);
  const index = list.findIndex((item) => item.name === name);

  [list[index], list[index + 1]] = [list[index + 1], list[index]];
  const returnList = updateOrderNoInList(list);

  return returnList;
};

export const GraphSorter = () => {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const sortedItems = sortVizList(data!.settings.home.vizualizationsOrder);

  const handleActiveInactive = (itemName: string) => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data!));
    newUser.settings.home.vizualizationsOrder.forEach((item) => {
      if (item.name === itemName) {
        item.active = !item.active;
      }
    });
    update(newUser);
  };

  const handleSorterClick = (itemName: string, moveUp: boolean) => {
    const newList = moveUp ? moveItemUpInList(sortedItems, itemName) : moveItemDownInList(sortedItems, itemName);
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data!));
    newUser.settings.home.vizualizationsOrder = newList;
    update(newUser);
  };

  const vizualizationList = sortedItems.map((item, index) => {
    return (
      <div className="bg-light border p-2" key={`sort-item-${item.name}`}>
        {index > 0 ? <CaretLeftFill className="fs-3" onClick={() => handleSorterClick(item.name, true)} /> : ''}
        <ToggleButton
          type="checkbox"
          className="mx-1"
          variant="outline-primary"
          id={item.name}
          value={item.name}
          checked={item.active}
          onClick={() => handleActiveInactive(item.name)}
        >
          {item.name}
        </ToggleButton>
        {index < sortedItems.length - 1 ? (
          <CaretRightFill className="fs-3" onClick={() => handleSorterClick(item.name, false)} />
        ) : (
          ''
        )}
      </div>
    );
  });

  return (
    <>
      <h1>Graph Sorter</h1>
      <Stack direction="horizontal">{vizualizationList}</Stack>
    </>
  );
};

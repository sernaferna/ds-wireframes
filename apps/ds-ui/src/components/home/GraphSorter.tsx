import React, { useMemo, useCallback } from 'react';
import { useGetUserByIdQuery, HARDCODED_USER_ID, useUpdateUserMutation } from '../../services/UserService';
import { ErrorLoadingDataMessage, LoadingMessage } from '../common/loading';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';
import { UserAttributes, VizualizationListItem } from '@devouringscripture/common';

const sortVizList = (list: VizualizationListItem[]): VizualizationListItem[] => {
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

const updateOrderNoInList = (initialList: VizualizationListItem[]): VizualizationListItem[] => {
  const listToReturn: VizualizationListItem[] = [];

  for (let i = 0; i < initialList.length; i++) {
    const item: VizualizationListItem = { name: initialList[i].name, active: initialList[i].active, order: i };
    listToReturn.push(item);
  }

  return listToReturn;
};

const moveItemUpInList = (initialList: VizualizationListItem[], name: string) => {
  const list = sortVizList(initialList);
  const index = list.findIndex((item) => item.name === name);

  [list[index], list[index - 1]] = [list[index - 1], list[index]];
  const returnList = updateOrderNoInList(list);

  return returnList;
};

const moveItemDownInList = (initialList: VizualizationListItem[], name: string) => {
  const list = sortVizList(initialList);
  const index = list.findIndex((item) => item.name === name);

  [list[index], list[index + 1]] = [list[index + 1], list[index]];
  const returnList = updateOrderNoInList(list);

  return returnList;
};

export const GraphSorter = () => {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  const sortedItems = useMemo(() => sortVizList(data!.settings.home.vizualizationsOrder), [data]);

  const handleActiveInactive = useCallback(
    (itemName: string) => {
      return () => {
        const newUser: UserAttributes = JSON.parse(JSON.stringify(data!));
        newUser.settings.home.vizualizationsOrder.forEach((item) => {
          if (item.name === itemName) {
            item.active = !item.active;
          }
        });
        update(newUser);
      };
    },
    [data, update]
  );

  const handleSorterClick = useCallback(
    (itemName: string, moveUp: boolean) => {
      return () => {
        const newList = moveUp ? moveItemUpInList(sortedItems, itemName) : moveItemDownInList(sortedItems, itemName);
        const newUser: UserAttributes = JSON.parse(JSON.stringify(data!));
        newUser.settings.home.vizualizationsOrder = newList;
        update(newUser);
      };
    },
    [sortedItems, update, data]
  );

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const vizualizationList = sortedItems.map((item, index) => {
    return (
      <Col key={`sort-item-${item.name}`}>
        {index > 0 ? <CaretLeftFill onClick={handleSorterClick(item.name, true)} /> : ''}
        <ToggleButton
          type="checkbox"
          variant="outline-primary"
          id={item.name}
          value={item.name}
          checked={item.active}
          onClick={handleActiveInactive(item.name)}
        >
          {item.name}
        </ToggleButton>
        {index < sortedItems.length - 1 ? <CaretRightFill onClick={handleSorterClick(item.name, false)} /> : ''}
      </Col>
    );
  });

  return (
    <>
      <h4>Graph Sorter</h4>
      <Row className="graph-sorter-list">{vizualizationList}</Row>
    </>
  );
};

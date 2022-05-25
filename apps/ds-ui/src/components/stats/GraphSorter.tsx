import React, { useMemo, useCallback } from 'react';
import { Col, ToggleButton, Row } from 'react-bootstrap';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';
import { VizualizationListItem, UserAttributes } from '@devouringscripture/common';
import { useUserSettings } from '../../helpers/UserSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';

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

// TODO can this be refactored to use array.map instead of a for loop?
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
  const [userData, userResponseError, userLoading, , , , , getUserCopy, updateBulkUser] = useUserSettings();

  const sortedItems = useMemo(() => sortVizList(userData!.settings.stats.vizualizationsOrder), [userData]);

  const handleActiveInactive = useCallback(
    (itemName: string) => {
      return () => {
        const newUser: UserAttributes = getUserCopy();
        newUser.settings.stats.vizualizationsOrder.forEach((item) => {
          if (item.name === itemName) {
            item.active = !item.active;
          }
        });
        updateBulkUser(newUser);
      };
    },
    [getUserCopy, updateBulkUser]
  );

  const handleSorterClick = useCallback(
    (itemName: string, moveUp: boolean) => {
      return () => {
        const newList = moveUp ? moveItemUpInList(sortedItems, itemName) : moveItemDownInList(sortedItems, itemName);
        const newUser: UserAttributes = getUserCopy();
        newUser.settings.stats.vizualizationsOrder = newList;
        updateBulkUser(newUser);
      };
    },
    [sortedItems, updateBulkUser, getUserCopy]
  );

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  const vizList = sortedItems.map((item, index) => {
    return (
      <Col key={`sort-item-${item.name}`} className="bg-light border p-2 text-center">
        {index > 0 ? (
          <span className="fs-3 btn p-0 m-0" onClick={handleSorterClick(item.name, true)}>
            <CaretLeftFill />
          </span>
        ) : (
          <></>
        )}
        <ToggleButton
          className="mx-0"
          type="checkbox"
          variant="outline-primary"
          id={item.name}
          value={item.name}
          checked={item.active}
          onClick={handleActiveInactive(item.name)}
        >
          {item.name}
        </ToggleButton>
        {index < sortedItems.length - 1 ? (
          <span className="fs-3 btn p-0 m-0" onClick={handleSorterClick(item.name, false)}>
            <CaretRightFill />
          </span>
        ) : (
          <></>
        )}
      </Col>
    );
  });

  return (
    <>
      <h4>Graph Sorter</h4>
      <Row xs="1" sm="2" md="3" xl="4" xxl="5">
        {vizList}
      </Row>
    </>
  );
};

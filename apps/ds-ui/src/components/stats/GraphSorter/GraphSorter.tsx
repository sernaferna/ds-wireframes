import React, { useCallback, useState, useEffect } from 'react';
import { Row, Button } from 'react-bootstrap';
import { VizualizationListItem, UserAttributes } from '@devouringscripture/common';
import { useUserSettings } from '../../../helpers/UserSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ListItem } from './ListItem';
import { useErrorsAndWarnings } from '../../../helpers/ErrorsAndWarning';

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
  const activeList = initialList.filter((item) => item.active);
  const inactiveList = initialList.filter((item) => !item.active);

  const newList = activeList.map((item, index) => ({
    name: item.name,
    active: item.active,
    order: index,
  }));

  for (const item of inactiveList) {
    newList.push({
      name: item.name,
      active: false,
      order: newList.length,
    });
  }

  return newList;
};

export const GraphSorter = () => {
  const [userData, userResponseError, userLoading, , , , , getUserCopy, updateBulkUser] = useUserSettings();
  const [vizItems, updateVizItems] = useState<VizualizationListItem[]>([]);
  const [warningID, setWarningID] = useState<string | undefined>(undefined);
  const [AlertUI, , addWarningMessage, , removeWarningMessage] = useErrorsAndWarnings();

  useEffect(() => {
    if (!userData) {
      return;
    }

    updateVizItems(sortVizList(userData!.settings.stats.vizualizationsOrder));
  }, [userData]);

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

  const uploadChanges = useCallback(() => {
    const newUser = getUserCopy();
    newUser.settings.stats.vizualizationsOrder = updateOrderNoInList(vizItems);
    updateBulkUser(newUser);
    if (warningID !== undefined) {
      removeWarningMessage(warningID);
      setWarningID(undefined);
    }
  }, [getUserCopy, vizItems, updateBulkUser, warningID, removeWarningMessage, setWarningID]);

  const moveListItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = vizItems[dragIndex];
      const hoverItem = vizItems[hoverIndex];

      const updatedItems = vizItems.slice();
      updatedItems[dragIndex] = hoverItem;
      updatedItems[hoverIndex] = dragItem;
      updateVizItems(updatedItems);
      if (warningID === undefined) {
        const warnID = addWarningMessage('Unsaved changes');
        setWarningID(warnID);
      }
    },
    [updateVizItems, vizItems, warningID, addWarningMessage, setWarningID]
  );

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  const vizList = vizItems.map((item, index) => (
    <ListItem
      key={`viz-list-${index}`}
      text={item.name}
      index={item.order}
      moveListItem={moveListItem}
      isActive={item.active}
      handleActiveInactive={handleActiveInactive}
    />
  ));

  return (
    <>
      <AlertUI />
      <h4>Graph Sorter</h4>

      <DndProvider backend={HTML5Backend}>
        <Row xs="1" md="2" xxl="3">
          {vizList}
        </Row>
      </DndProvider>

      <Button variant="primary" onClick={uploadChanges}>
        Upload
      </Button>
    </>
  );
};

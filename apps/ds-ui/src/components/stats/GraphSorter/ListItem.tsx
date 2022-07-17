import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Col, Form } from 'react-bootstrap';

interface IListItem {
  text: string;
  index: number;
  isActive: boolean;
  moveListItem(dragIndex: number, hoverIndex: number): void;
  handleActiveInactive(itemName: string): () => void;
}

/**
 * An item to be rendered within the `GraphSorter` component, leveraging
 * the `react-dnd` library for the drag-n-drop capabilities.
 *
 * @param text The text to be shown for this item
 * @param index The index of the item within the overall list
 * @param isActive Whether the item is active (the graph is displayed in the UI) or not
 * @param moveListItem Callback function to be called when the item is moved within the list
 * @param handleActiveInactive Callback function to handle the user clicking the active checkbox
 */
export const ListItem = ({ text, index, isActive, moveListItem, handleActiveInactive }: IListItem) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: 'item',
    hover: (item: IListItem) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const dragDropRef = dragRef(dropRef(ref));

  let classNames = 'bg-light border my-2 p-2';
  classNames += isDragging ? ' opacity-25' : ' opacity-100';
  if (isOver) {
    classNames += ' border-warning';
  }

  return (
    <Col ref={dragDropRef}>
      <div className={classNames}>
        <span className="lead">{text}</span>
        <Form.Check type="checkbox" label="Active?" checked={isActive} onChange={handleActiveInactive(text)} />
      </div>
    </Col>
  );
};

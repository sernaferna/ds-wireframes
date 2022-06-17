import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Col, Form } from 'react-bootstrap';

interface IListItem {
  text: string;
  index: number;
  isActive: boolean;
  moveListItem(dragIndex: number, hoverIndex: number): void;
  handleActiveInactive(itemName: string): void;
}
export const ListItem = ({ text, index, isActive, moveListItem, handleActiveInactive }: IListItem) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'item',
    hover: (item: IListItem, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const dragDropRef = dragRef(dropRef(ref));

  return (
    <Col ref={dragDropRef} className={isDragging ? 'opacity-25' : 'opacity-100'}>
      <div className="bg-light border">
        <p>{text}</p>
        <Form.Check type="checkbox" label="Active?" checked={isActive} onChange={() => handleActiveInactive(text)} />
      </div>
    </Col>
  );
};

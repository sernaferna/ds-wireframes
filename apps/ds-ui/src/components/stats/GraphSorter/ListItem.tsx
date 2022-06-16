import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Col } from 'react-bootstrap';

interface IListItem {
  text: string;
  index: number;
  moveListItem(dragIndex: number, hoverIndex: number): void;
}
export const ListItem = ({ text, index, moveListItem }: IListItem) => {
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
      const hoverBoundingRect = ref.current!.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) {
        return;
      }

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const dragDropRef = dragRef(dropRef(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <Col ref={dragDropRef} style={{ opacity }}>
      {text}
    </Col>
  );
};

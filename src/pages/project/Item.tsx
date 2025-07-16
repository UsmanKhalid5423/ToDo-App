import React from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

export interface DragItem {
  id: string;
  name: string;
  fromBucketId: string;
}

interface ItemProps {
  id: string;
  name: string;
  fromBucketId: string;
}

const Item: React.FC<ItemProps> = ({ id, name, fromBucketId }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id, name, fromBucketId },
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: 8,
        margin: 4,
        background: "#fff",
        border: "1px solid #ccc",
      }}
    >
      {name}
    </div>
  );
};

export default Item;

import React from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

export interface DragItem {
  id: string;
  name: string;
  fromBucketId: string;
}

interface ItemProps {
  n_Id: number;
  s_Title: string;
  fromBucketId: number;
}

const Item: React.FC<ItemProps> = ({ n_Id, s_Title, fromBucketId }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { n_Id, s_Title, fromBucketId },
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
      {s_Title}
    </div>
  );
};

export default Item;

import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Status from "./../status/index";

export interface DragItem {
  id: string;
  name: string;
  fromBucketId: string;
}

interface ItemProps {
  n_Id: number;
  S_Title: string;
  S_Description: string;
  n_FromBucketId: number;
  StatusDescription: string;
  PriorityDescription: string;
  TaskTypeDescription: string;
}

const Item: React.FC<ItemProps> = ({
  n_Id,
  S_Title,
  S_Description,
  n_FromBucketId,
  StatusDescription,
  PriorityDescription,
  TaskTypeDescription,
}) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { n_Id, S_Title, n_FromBucketId },
  }));

  return (
    <div
      ref={drag}
      className="p-2 m-1 bg-white border border-gray-300 rounded shadow-sm h-36"
    >
      <h3 className="text-lg font-bold text-gray-800">{S_Title}</h3>
      <p className=" text-gray-800">{S_Description}</p>
      <p className="text-gray-800">
        Task Type: <span className="text-blue-600">{TaskTypeDescription}</span>
      </p>
      <p className="text-gray-800">
        Priority: <span className="text-blue-600">{PriorityDescription}</span>
      </p>
      <p className="text-gray-800">
        Status: <span className="text-blue-600">{StatusDescription}</span>
      </p>
    </div>
  );
};

export default Item;

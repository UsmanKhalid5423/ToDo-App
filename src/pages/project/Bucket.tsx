import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Item from "./Item";
import type { DragItem } from "./Item";
import { Plus } from "lucide-react";
import AddTask from "./../task/add";

interface ProjectBucketTasks {
  n_Id: number;
  S_Title: string;
  S_Description: string;
  n_FromBucketId: number;
}

interface BucketProps {
  id: number;
  name: string;
  items: ProjectBucketTasks[];
  onDrop: (item: ProjectBucketTasks, toBucketId: number) => void;
}

const Bucket: React.FC<BucketProps> = ({ id, name, items, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: ProjectBucketTasks) => onDrop(item, id),
  }));

  const [isAddNew, setIsAddNew] = useState(false);

  const handleAddTask = () => {
    setIsAddNew(true);
  };

  return (
    <div
      ref={drop}
      className="m-2 p-4 min-w-72 h-80 shrink-0 bg-gray-100 border-2 border-gray-400 rounded-md flex flex-col"
    >
      <div className="mb-3 flex justify-between items-center">
        <strong>{name}</strong>
        <Plus
          onClick={handleAddTask}
          className="cursor-pointer text-black-600 hover:text-blue-800"
          size={24}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {items.length > 0 ? (
          items.map((item) => (
            // <Item key={item.n_Id} {...item} fromBucketId={id} />
            <Item key={item.n_Id} {...item} fromBucketId={item.n_Id} />
          ))
        ) : (
          <p className="text-gray-500 italic">No items</p>
        )}
      </div>
      <AddTask
        isAddNew={isAddNew}
        setIsAddNew={setIsAddNew}
        defaultProjectId={1}
      />
    </div>
  );
};

export default Bucket;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Bucket from "./Bucket";
import type { DragItem } from "./Item";
import { Plus } from "lucide-react";
import AddBucket from "./addBucket";
import { useGetAllBuckets } from "../../hooks/common/query";

interface BucketData {
  n_Id: string;
  s_Description: string;
  items: DragItem[];
}

const DragDropPage: React.FC = () => {
  const { id } = useParams();
  const projectId = Number(id);

  console.log("projectId == ", projectId);

  const [lastMove, setLastMove] = useState<string>("");
  const [isAddNew, setIsAddNew] = useState(false);
  const [buckets, setBuckets] = useState<BucketData[]>([]);
  // const { data: bucketsData, refetch: refetchBucketsData } = useGetAllBuckets(projectId);
  const { data: bucketsData, refetch } = useGetAllBuckets(projectId);

  const handleDrop = (item: DragItem, toBucketId: string) => {
    if (item.fromBucketId === toBucketId) return;

    setBuckets((prevBuckets) => {
      const updatedBuckets = prevBuckets.map((bucket) => {
        if (bucket.n_Id === item.fromBucketId) {
          return {
            ...bucket,
            items: bucket.items.filter((i) => i.id !== item.id),
          };
        }

        if (bucket.n_Id === toBucketId) {
          return {
            ...bucket,
            items: [...bucket.items, { ...item, fromBucketId: toBucketId }],
          };
        }

        return bucket;
      });

      return updatedBuckets;
    });

    const fromBucket = buckets.find(
      (b) => b.n_Id === item.fromBucketId
    )?.s_Description;
    const toBucket = buckets.find((b) => b.n_Id === toBucketId)?.s_Description;

    setLastMove(`Moved "${item.name}" from ${fromBucket} to ${toBucket}`);
  };

  const handleAddBucket = () => {
    setIsAddNew(true);
  };

  useEffect(() => {
    if (projectId) {
      refetch();
    }
    if (bucketsData && Array.isArray(bucketsData)) {
      setBuckets(bucketsData);
    } else {
      setBuckets([]);
    }
  }, [bucketsData, projectId]);

  return (
    <DndProvider backend={HTML5Backend}>
      <h2 className="flex items-center text-2xl font-semibold mb-4">
        Buckets
        <Plus
          onClick={handleAddBucket}
          className="ml-2 cursor-pointer text-black-600 hover:text-blue-800"
          size={24}
        />
      </h2>

      <div className="min-h-full flex gap-4 overflow-x-auto flex-nowrap pb-2">
        {buckets.length > 0 ? (
          buckets.map((bucket) => (
            <Bucket
              key={bucket.n_Id}
              id={bucket.n_Id}
              name={bucket.s_Description}
              items={bucket.items || []}
              onDrop={handleDrop}
            />
          ))
        ) : (
          <p>No buckets available.</p>
        )}
      </div>

      {lastMove && <div className="mt-5 italic text-green-600">{lastMove}</div>}

      <AddBucket
        isAddNew={isAddNew}
        setIsAddNew={setIsAddNew}
        defaultProjectId={projectId}
      />
    </DndProvider>
  );
};

export default DragDropPage;

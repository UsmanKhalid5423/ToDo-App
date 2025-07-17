import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Bucket from "./Bucket";
import type { DragItem } from "./Item";
import { Plus } from "lucide-react";
import AddBucket from "./addBucket";
import { useGetAllBuckets } from "../../hooks/common/query";
import { useUpdateTaskBucket } from "../../hooks/common/mutation";

interface ProjectBucketTasks {
  n_Id: number;
  S_Title: string;
  S_Description: string;
  n_FromBucketId: number;
}

interface BucketData {
  n_Id: number;
  s_Description: string;
  // items: DragItem[];
  tasks: ProjectBucketTasks[];
}

const DragDropPage: React.FC = () => {
  const { id } = useParams();
  const projectId = Number(id);

  const [lastMove, setLastMove] = useState<string>("");
  const [isAddNew, setIsAddNew] = useState(false);
  const [buckets, setBuckets] = useState<BucketData[]>([]);
  const [taskId, setTaskId] = useState<number>(0);

  // const { data: bucketsData, refetch: refetchBucketsData } = useGetAllBuckets(projectId);
  const { data: bucketsData, refetch } = useGetAllBuckets(projectId);

  const updateTaskMutation = useUpdateTaskBucket();

  // const handleDrop = (item: DragItem, toBucketId: string) => {
  const handleDrop = (item: ProjectBucketTasks, toBucketId: number) => {
    if (item.n_FromBucketId === toBucketId) return;

    setBuckets((prevBuckets) => {
      return prevBuckets.map((bucket) => {
        if (bucket.n_Id === item.n_FromBucketId) {
          return {
            ...bucket,
            tasks: bucket.tasks.filter((task) => task.n_Id !== item.n_Id),
          };
        } else if (bucket.n_Id === toBucketId) {
          return {
            ...bucket,
            tasks: [...bucket.tasks, { ...item, n_FromBucketId: toBucketId }],
          };
        }
        return bucket;
      });
    });

    const fromBucket = buckets.find(
      (b) => b.n_Id === item.n_FromBucketId
    )?.s_Description;
    const toBucket = buckets.find((b) => b.n_Id === toBucketId)?.s_Description;

    // need to call update api
    setLastMove(`Moved "${item.S_Title}" from ${fromBucket} to ${toBucket}`);

    console.log(
      `Moved "${item.S_Title}" "${item.n_Id}" from ${fromBucket} to ${toBucket}`
    );

    updateTaskMutation.mutate(
      {
        id: Number(item.n_Id),
        body: {
          N_BucketId: toBucketId,
        },
      },
      {
        onSuccess: () => {
          // setFormData({
          //   taskName: "",
          //   taskDescription: "",
          //   dueDate: "",
          //   priority: "",
          //   assignedTo: "",
          // });
          setIsAddNew(false);
        },
        onError: (error) => {
          console.error("Error adding task:", error);
        },
      }
    );
  };

  const handleAddBucket = () => {
    setIsAddNew(true);
  };

  useEffect(() => {
    if (projectId) {
      refetch();
    }

    if (bucketsData && Array.isArray(bucketsData)) {
      const transformed = bucketsData.map((bucket) => ({
        n_Id: bucket.n_BucketId,
        s_Description: bucket.s_Description,
        tasks: bucket.tasks.map((task) => ({
          ...task,
          S_Title: task.s_Title,
          S_Description: task.s_Description,
          n_FromBucketId: task.n_BucketId, // for drag source
          StatusDescription: task.statusDescription,
          PriorityDescription: task.priorityDescription,
          TaskTypeDescription: task.taskTypeDescription,
        })),
      }));

      setBuckets(transformed);
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
              items={bucket.tasks || []}
              onDrop={handleDrop}
              bucketId={bucket.n_Id}
              projectId={projectId}
            />
          ))
        ) : (
          <p>No buckets available.</p>
        )}
      </div>

      {lastMove && <div className="mt-5 italic text-green-600">{lastMove}</div>}
      {isAddNew && (
        <AddBucket
          isAddNew={isAddNew}
          setIsAddNew={setIsAddNew}
          defaultProjectId={projectId}
        />
      )}
    </DndProvider>
  );
};

export default DragDropPage;

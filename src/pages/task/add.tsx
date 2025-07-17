import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddBucket, useAddTask } from "../../hooks/common/mutation";
import {
  useGetAllPriorities,
  useGetAllStatus,
  useGetAllTaskTypes,
  useGetAllTasks,
} from "../../hooks/common/query/index";

import { MultiSelect } from "@/components/ui/multiSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface AddBucketProps {
  isAddNew: boolean;
  setIsAddNew: (value: boolean) => void;
  defaultProjectId: number;
}

// Define interface for form data
interface FormData {
  S_Title: string;
  S_Description: string;
  N_PriorityId: number;
  N_TaskTypeId: number;
  N_StatusId: number;
  N_ProjectId: number;
  N_BucketId: number;
  // add more fields here as needed
}

type PrioritiesInterfance = {
  n_Id: number;
  s_Description: string;
};

const OPTIONS = [
  { label: "Apple", value: "apple" },
  { label: "Orange", value: "orange" },
  { label: "Banana", value: "banana" },
  { label: "Grape", value: "grape" },
];

export default function AddTask({
  isAddNew,
  setIsAddNew,
  defaultProjectId,
}: AddBucketProps) {
  const [formData, setFormData] = useState<FormData>({
    S_Title: "",
    S_Description: "",
    N_BucketId: 0,
    N_PriorityId: 0,
    N_TaskTypeId: 0,
    N_StatusId: 0,
    N_ProjectId: defaultProjectId,
  });

  const [inputError, setInputError] = useState("");
  const [selectedFruits, setSelectedFruits] = useState<string[]>([]);

  const addBucketMutation = useAddBucket();
  const addTaskMutation = useAddTask();
  const { data: prioritiesData } = useGetAllPriorities();
  const { data: tasksData } = useGetAllTaskTypes();
  const { data: statusesData } = useGetAllStatus();

  const handleChange = (selected: string[]) => {
    setSelectedFruits(selected);
    console.log("selectd values", selectedFruits);
  };
  // console.log("selectd values", selectedFruits);

  // Generic change handler for inputs and textarea
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (inputError) setInputError("");
  };

  const handleSave = () => {
    addTaskMutation.mutate(
      {
        S_Title: formData.S_Title,
        S_Description: formData.S_Description,
        N_PriorityId: formData.N_PriorityId,
        N_TaskTypeId: formData.N_TaskTypeId,
        N_StatusId: formData.N_StatusId,
        N_ProjectId: formData.N_ProjectId,
        N_BucketId: 1,
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
          setInputError("");
        },
        onError: (error) => {
          console.error("Error adding task:", error);
          setInputError("Failed to add task");
        },
      }
    );
  };

  const handleDialogClose = () => {
    setInputError("");
    setIsAddNew(false);
    // setFormData({
    //   taskName: "",
    //   taskDescription: "",
    //   dueDate: "",
    //   priority: "",
    //   assignedTo: "",
    // });
  };

  useEffect(() => {}, [prioritiesData]);

  return (
    <Dialog open={isAddNew} onOpenChange={handleDialogClose}>
      <DialogContent className="fixed top-[50%] left-[50%] w-[95vw] h-[90vh] max-w-[95vw] max-h-[90vh] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-lg border p-6 shadow-lg bg-background z-50">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Please enter the details for the task.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            name="S_Title"
            placeholder="Enter task name..."
            value={formData.S_Title}
            onChange={handleInputChange}
          />
          {inputError && <p className="text-sm text-red-500">{inputError}</p>}

          <Textarea
            name="S_Description"
            placeholder="Enter task description..."
            value={formData.S_Description}
            onChange={handleInputChange}
            className="h-40"
          />
          <Select
            value={formData.N_PriorityId.toString()}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                N_PriorityId: parseInt(value),
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              {prioritiesData &&
                prioritiesData.map((priority: PrioritiesInterfance) => (
                  <SelectItem
                    key={priority.n_Id}
                    value={priority.n_Id.toString()}
                  >
                    {priority.s_Description}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select
            value={formData.N_TaskTypeId.toString()}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                N_TaskTypeId: parseInt(value),
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Task Type" />
            </SelectTrigger>
            <SelectContent>
              {tasksData &&
                tasksData.map((task: any) => (
                  <SelectItem key={task.n_Id} value={task.n_Id.toString()}>
                    {task.s_Description}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select
            value={formData.N_StatusId.toString()}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                N_StatusId: parseInt(value),
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {statusesData &&
                statusesData.map((status: any) => (
                  <SelectItem key={status.n_Id} value={status.n_Id.toString()}>
                    {status.s_Description}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* 
          <Input
            name="dueDate"
            placeholder="Enter due date"
            type="date"
            value={formData.dueDate}
            onChange={handleInputChange}
          /> */}

          {/* <Input
            name="priority"
            placeholder="Enter priority"
            value={formData.priority}
            onChange={handleInputChange}
          /> */}
          {/* 
          <MultiSelect
            options={OPTIONS}
            onValueChange={setSelectedFruits}
            defaultValue={selectedFruits}
            placeholder="Select frameworks"
            variant="inverted"
            animation={2}
            maxCount={3}
          /> */}

          {/* <Input
            name="assignedTo"
            placeholder="Assign to"
            value={formData.assignedTo}
            onChange={handleInputChange}
          /> */}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

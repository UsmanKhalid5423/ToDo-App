import { useState } from "react";
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
import { useAddBucket } from "../../hooks/common/mutation";

import { MultiSelect } from "@/components/ui/multiSelect";

interface AddBucketProps {
  isAddNew: boolean;
  setIsAddNew: (value: boolean) => void;
  defaultProjectId: number;
}

// Define interface for form data
interface FormData {
  taskName: string;
  taskDescription: string;
  dueDate: string;
  priority: string;
  assignedTo: string;
  // add more fields here as needed
}

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
    taskName: "",
    taskDescription: "",
    dueDate: "",
    priority: "",
    assignedTo: "",
  });

  const [inputError, setInputError] = useState("");
  const [selectedFruits, setSelectedFruits] = useState<string[]>([]);

  const addBucketMutation = useAddBucket();

  const handleChange = (selected: string[]) => {
    setSelectedFruits(selected);
    console.log("selectd values", selectedFruits);
  };
  console.log("selectd values", selectedFruits);

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
    if (formData.taskName.trim() === "") {
      setInputError("Task name must not be empty");
      return;
    }

    addBucketMutation.mutate(
      {
        s_Description: formData.taskName,
        N_ProjectId: defaultProjectId,
        // Pass additional fields as needed
        taskDescription: formData.taskDescription,
        dueDate: formData.dueDate,
        priority: formData.priority,
        assignedTo: formData.assignedTo,
      },
      {
        onSuccess: () => {
          setFormData({
            taskName: "",
            taskDescription: "",
            dueDate: "",
            priority: "",
            assignedTo: "",
          });
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
    setFormData({
      taskName: "",
      taskDescription: "",
      dueDate: "",
      priority: "",
      assignedTo: "",
    });
  };

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
            name="taskName"
            placeholder="Enter task name..."
            value={formData.taskName}
            onChange={handleInputChange}
          />
          {inputError && <p className="text-sm text-red-500">{inputError}</p>}

          <Textarea
            name="taskDescription"
            placeholder="Enter task description..."
            value={formData.taskDescription}
            onChange={handleInputChange}
            className="h-40"
          />

          <Input
            name="dueDate"
            placeholder="Enter due date"
            type="date"
            value={formData.dueDate}
            onChange={handleInputChange}
          />

          <Input
            name="priority"
            placeholder="Enter priority"
            value={formData.priority}
            onChange={handleInputChange}
          />

          <MultiSelect
            options={OPTIONS}
            onValueChange={setSelectedFruits}
            defaultValue={selectedFruits}
            placeholder="Select frameworks"
            variant="inverted"
            animation={2}
            maxCount={3}
          />

          <Input
            name="assignedTo"
            placeholder="Assign to"
            value={formData.assignedTo}
            onChange={handleInputChange}
          />
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

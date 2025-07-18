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

import { FileUploadDemo } from "@/components/ui/FileUploadDemo";

import { useAddTask } from "../../hooks/common/mutation";
import {
  useGetAllPriorities,
  useGetAllStatus,
  useGetAllTaskTypes,
  useGetAllDevelopers,
} from "../../hooks/common/query/index";

import { MultiSelect } from "@/components/ui/multiSelect";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AddBucketProps {
  isAddNew: boolean;
  setIsAddNew: (value: boolean) => void;
  defaultProjectId: number;
  bucketId: number;
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

interface TaskAssigneeType {
  N_UserId: number | string;
  N_ProjectId: number;
}

export default function AddTask({
  isAddNew,
  setIsAddNew,
  defaultProjectId,
  bucketId,
}: AddBucketProps) {
  const [formData, setFormData] = useState<FormData>({
    S_Title: "",
    S_Description: "",
    N_BucketId: bucketId,
    N_PriorityId: 0,
    N_TaskTypeId: 0,
    N_StatusId: 0,
    N_ProjectId: defaultProjectId,
  });

  const [inputError, setInputError] = useState("");
  const [selectedDevelopers, setSelectedDevelopers] = useState<number[]>([]);

  const addTaskMutation = useAddTask();
  const { data: prioritiesData } = useGetAllPriorities();
  const { data: tasksData } = useGetAllTaskTypes();
  const { data: statusesData } = useGetAllStatus();
  const { data: developersData } = useGetAllDevelopers();

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  console.log("selectd values", selectedDevelopers);

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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          // Remove data:...;base64, if needed
          const base64Content = result.split(",")[1];
          resolve(base64Content);
        } else {
          reject("File reading failed");
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // Base64 encoded
    });
  };

  const handleSave = async () => {
    const TaskDocuments = await Promise.all(
      uploadedFiles.map(async (file) => {
        const content = await fileToBase64(file);
        return {
          S_FileContent: content, // base64 encoded
          S_FileContentType: file.type,
          N_ProjectId: formData.N_ProjectId,
        };
      })
    );

    const TaskAssignee: TaskAssigneeType[] = [];

    for (let i = 0; i < selectedDevelopers.length; i++) {
      TaskAssignee.push({
        N_UserId: selectedDevelopers[i],
        N_ProjectId: formData.N_ProjectId,
      });
    }
    addTaskMutation.mutate(
      {
        S_Title: formData.S_Title,
        S_Description: formData.S_Description,
        N_PriorityId: formData.N_PriorityId,
        N_TaskTypeId: formData.N_TaskTypeId,
        N_StatusId: formData.N_StatusId,
        N_ProjectId: formData.N_ProjectId,
        N_BucketId: bucketId,
        TaskAssignee,
        TaskDocuments,
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
            value={
              formData.N_PriorityId
                ? formData.N_PriorityId.toString()
                : undefined
            }
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
              {prioritiesData?.map((priority: PrioritiesInterfance) => (
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
            value={
              formData.N_TaskTypeId
                ? formData.N_TaskTypeId.toString()
                : undefined
            }
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
              {tasksData?.map((task: any) => (
                <SelectItem key={task.n_Id} value={task.n_Id.toString()}>
                  {task.s_Description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={
              formData.N_StatusId ? formData.N_StatusId.toString() : undefined
            }
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
              {statusesData?.map((status: any) => (
                <SelectItem key={status.n_Id} value={status.n_Id.toString()}>
                  {status.s_Description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <MultiSelect
            options={
              developersData?.map((dev: any) => ({
                label: dev.s_FullName,
                value: dev.n_Id,
                icon: dev.iconComponent,
              })) ?? []
            }
            onValueChange={setSelectedDevelopers}
            defaultValue={selectedDevelopers}
            placeholder="Select Assignee"
            variant="inverted"
            animation={2}
            maxCount={3}
          />

          <FileUploadDemo onFilesChange={setUploadedFiles} />
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

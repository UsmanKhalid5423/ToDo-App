import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";

import { useGetAllStatus, getByIdStatus } from "../../hooks/common/query/index";
import {
  useAddStatus,
  useUpdateStatus,
  useDeleteStatus,
} from "../../hooks/common/mutation/index";

import { keys } from "../../hooks/common/keys";

type StatusInterfance = {
  n_Id: number;
  s_Description: string;
};

export default function Status() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [isAddNew, setIsAddNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [seletedId, setSeletedId] = useState(Number);
  const [seletedEditId, setSeletedEditId] = useState<number>(0);
  const [addedTaskDescription, setAddedTaskDescription] = useState("");
  const [inputError, setInputError] = useState("");

  const [statusDetails, setStatusDetails] = useState<StatusInterfance[]>([]);

  const { data: statusData } = useGetAllStatus();
  const addStatusMutation = useAddStatus();
  const updateStatusMutation = useUpdateStatus();
  const deleteStatusMutation = useDeleteStatus(seletedId);

  // const { data: priorityDetails, refetch: refetchTaskType } =
  //   useGetByIdPriorities(seletedEditId > 0 ? seletedEditId : 0);

  useEffect(() => {
    if (statusData) {
      setStatusDetails(statusData);
    }
  }, [statusData, seletedId, seletedEditId, isEdit, isAddNew]);

  const filteredTaskTypes = statusDetails.filter((status) =>
    status.s_Description.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (addedTaskDescription.trim() === "") {
      setInputError("Priority must not be empty");
      return;
    }
    addStatusMutation.mutate(
      {
        s_Description: addedTaskDescription,
      },
      {
        onSuccess: () => {
          setAddedTaskDescription("");
          setIsAddNew(false);
          setIsEdit(false);
          setInputError("");
        },
        onError: (error) => {
          console.error("Error adding Priority:", error);
          setInputError("Failed to add priority");
        },
      }
    );

    console.log("Edit Priority with ID:");
  };

  const handleUdate = () => {
    if (addedTaskDescription.trim() === "") {
      setInputError("Priority must not be empty");
      return;
    }

    updateStatusMutation.mutate(
      {
        id: seletedEditId,
        body: {
          s_Description: addedTaskDescription,
        },
      },
      {
        onSuccess: () => {
          setAddedTaskDescription("");
          setIsAddNew(false);
          setIsEdit(false);
          setInputError("");
        },
        onError: (error) => {
          console.error("Error adding Priority:", error);
          setInputError("Failed to add priority");
        },
      }
    );

    console.log("Edit Priority with ID:");
  };

  const handleEdit = async (id: number) => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: [keys.GET_BY_ID_STATUS, id],
        queryFn: () => getByIdStatus(id),
        staleTime: 0,
        gcTime: 0,
      });
      if (data) {
        setSeletedEditId(id);
        setAddedTaskDescription(data.s_Description);
        setIsEdit(true);
        setIsAddNew(false);
      }
    } catch (error) {
      console.error("Error fetching task type:", error);
    }
  };

  const handleDelete = (id: number) => {
    console.log("Delete task type with ID:", id);

    deleteStatusMutation.mutate(id, {
      onSuccess: () => {
        setAddedTaskDescription("");
        setIsAddNew(false);
        setInputError("");
      },
      onError: (error) => {
        console.error("Error adding task type:", error);
        setInputError("Failed to add task type");
      },
    });
  };

  const handleDialog = () => {
    setInputError("");
    setIsAddNew(false);
    setAddedTaskDescription("");
    setSeletedEditId(0);
    setIsEdit(false);
  };

  return (
    <>
      <div className="min-h-screen w-full px-6 py-6 bg-gray-50 overflow-x-hidden">
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold">Status</h1>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="md:w-96"
            />
            <Button
              onClick={() => {
                setIsEdit(false);
                setIsAddNew(true);
              }}
            >
              Add New Status
            </Button>
          </div>
        </div>

        <div className="w-full rounded-md border overflow-x-auto">
          <Table className="w-full table-auto min-w-[100%]">
            {/* <TableCaption>A list of your task types.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right w-[140px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTaskTypes.map((task) => (
                <TableRow key={task.n_Id}>
                  <TableCell className="font-medium">{task.n_Id}</TableCell>
                  <TableCell>{task.s_Description}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(task.n_Id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(task.n_Id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Conditional Dialog */}
        <Dialog open={isAddNew || isEdit} onOpenChange={() => handleDialog()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Status</DialogTitle>
              <DialogDescription>
                Please enter a description for the new status.
              </DialogDescription>
            </DialogHeader>

            {/* Move the input and validation outside of DialogDescription */}
            <div className="space-y-2 mt-4">
              <Input
                placeholder="Enter status..."
                value={addedTaskDescription}
                onChange={(e) => {
                  setAddedTaskDescription(e.target.value);
                  if (inputError) setInputError("");
                }}
                className="md:w-full"
              />
              {inputError && (
                <p className="text-sm text-red-500">{inputError}</p>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => handleDialog()}>
                Cancel
              </Button>
              <Button onClick={isEdit ? handleUdate : handleSave}>
                {" "}
                {isEdit ? "Update" : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

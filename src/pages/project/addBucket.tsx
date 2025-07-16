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
import { useAddBucket } from "../../hooks/common/mutation";

interface AddBucketProps {
  isAddNew: boolean;
  setIsAddNew: (value: boolean) => void;
  defaultProjectId: number;
}

export default function AddBucket({
  isAddNew,
  setIsAddNew,
  defaultProjectId,
}: AddBucketProps) {
  const [addedTaskDescription, setAddedTaskDescription] = useState("");
  const [inputError, setInputError] = useState("");
  const addBucketMutation = useAddBucket();
  const handleSave = () => {
    if (addedTaskDescription.trim() === "") {
      setInputError("Bucket name must not be empty");
      return;
    }

    addBucketMutation.mutate(
      {
        s_Description: addedTaskDescription,
        N_ProjectId: defaultProjectId,
      },
      {
        onSuccess: () => {
          setAddedTaskDescription("");
          setIsAddNew(false);
          setInputError("");
        },
        onError: (error) => {
          console.error("Error adding Bucket:", error);
          setInputError("Failed to add Bucket");
        },
      }
    );
  };

  const handleDialogClose = () => {
    setInputError("");
    setIsAddNew(false);
    setAddedTaskDescription("");
  };

  return (
    <Dialog open={isAddNew} onOpenChange={handleDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Bucket</DialogTitle>
          <DialogDescription>
            Please enter a title for the Bucket.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          <Input
            placeholder="Enter bucket name..."
            value={addedTaskDescription}
            onChange={(e) => {
              setAddedTaskDescription(e.target.value);
              if (inputError) setInputError("");
            }}
          />
          {inputError && <p className="text-sm text-red-500">{inputError}</p>}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

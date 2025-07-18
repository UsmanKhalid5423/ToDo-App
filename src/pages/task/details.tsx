// import { useParams } from "react-router-dom"; // or your routing logic
// import { useEffect, useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   useGetTaskById,
//   useGetAllPriorities,
//   useGetAllStatus,
//   useGetAllTaskTypes,
//   useGetAllDevelopers,
// } from "../../hooks/common/query";

// interface TaskDetailsViewProps {
//   taskId?: number;
// }

// export default function TaskDetailsView({ taskId }: TaskDetailsViewProps) {
//   // You can alternatively get taskId from route: const { taskId } = useParams();
//   const { data: task, isLoading, error } = useGetTaskById(3);
//   const { data: prioritiesData } = useGetAllPriorities();
//   const { data: statusesData } = useGetAllStatus();
//   const { data: taskTypesData } = useGetAllTaskTypes();
//   const { data: developersData } = useGetAllDevelopers();

//   const getLabel = (data: any[], id: number, key: string = "s_Description") =>
//     data?.find((item) => item.n_Id === id)?.[key] || "N/A";

//   const getDeveloperNames = (ids: number[]) => {
//     return (
//       developersData
//         ?.filter((dev) => ids.includes(dev.n_Id))
//         .map((dev) => dev.s_FullName)
//         .join(", ") || "N/A"
//     );
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error || !task) return <p>Error loading task details.</p>;

//   return (
//     <div className="min-h-screen w-full px-6 py-6 bg-gray-50">
//       <h1 className="text-2xl font-bold mb-4">Task Details</h1>

//       <Card className="max-w-3xl space-y-4 p-6 bg-white shadow">
//         <CardContent className="space-y-4">
//           <div>
//             <Label className="text-muted-foreground">Title</Label>
//             <Input
//               name="S_Title"
//               placeholder="Enter task name..."
//               value={task.s_Title}
//               //onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <Label className="text-muted-foreground">Description</Label>
//             <Textarea
//               name="S_Description"
//               placeholder="Enter task description..."
//               value={task.s_Description}
//               // onChange={handleInputChange}
//               className="h-40"
//             />
//           </div>

//           <div>
//             <Label className="text-muted-foreground">Priority</Label>
//             <Select
//               value={
//                 task.n_PriorityId ? task.n_PriorityId.toString() : undefined
//               }
//               // onValueChange={(value) =>
//               //   setFormData((prev) => ({
//               //     ...prev,
//               //     N_PriorityId: parseInt(value),
//               //   }))
//               // }
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select Priority" />
//               </SelectTrigger>

//               <SelectContent>
//                 {prioritiesData?.map((priority) => (
//                   <SelectItem
//                     key={priority.n_Id}
//                     value={priority.n_Id.toString()}
//                   >
//                     {priority.s_Description}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label className="text-muted-foreground">Task Type</Label>
//             <Select
//               value={
//                 task.n_TaskTypeId ? task.n_TaskTypeId.toString() : undefined
//               }
//               // onValueChange={(value) =>
//               //   setFormData((prev) => ({
//               //     ...prev,
//               //     N_TaskTypeId: parseInt(value),
//               //   }))
//               // }
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select Task Type" />
//               </SelectTrigger>

//               <SelectContent>
//                 {taskTypesData?.map((task: any) => (
//                   <SelectItem key={task.n_Id} value={task.n_Id.toString()}>
//                     {task.s_Description}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* <div>
//             <Label className="text-muted-foreground">Task Type</Label>
//             <p>{getLabel(taskTypesData, task.n_TaskTypeId)}</p>
//           </div> */}

//           <div>
//             <Label className="text-muted-foreground">Status</Label>
//             <Select
//               value={task.n_StatusId ? task.n_StatusId.toString() : undefined}
//               // onValueChange={(value) =>
//               //   setFormData((prev) => ({
//               //     ...prev,
//               //     N_TaskTypeId: parseInt(value),
//               //   }))
//               // }
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select Task Type" />
//               </SelectTrigger>

//               <SelectContent>
//                 {statusesData?.map((status: any) => (
//                   <SelectItem key={status.n_Id} value={status.n_Id.toString()}>
//                     {status.s_Description}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* <div>
//             <Label className="text-muted-foreground">Assigned Developers</Label>
//             <p>
//               {getDeveloperNames(
//                 task?.TaskAssignee?.map((a: any) => a.N_UserId) || []
//               )}
//             </p>
//           </div> */}

//           {/* Add uploaded files section if files are available */}
//           {/* <div>
//             <Label className="text-muted-foreground">Attachments</Label>
//             <ul className="list-disc pl-4">
//               {task.attachments?.map((file: any) => (
//                 <li key={file.id}>
//                   <a href={file.url} target="_blank" rel="noopener noreferrer">
//                     {file.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div> */}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  useGetTaskById,
  useGetAllPriorities,
  useGetAllStatus,
  useGetAllTaskTypes,
  useGetAllDevelopers,
} from "../../hooks/common/query";

interface TaskDetailsViewProps {
  taskId?: number;
}

export default function TaskDetailsView({ taskId }: TaskDetailsViewProps) {
  const { id } = useParams();
  const incomingTaskId = Number(id);
  const { data: task, isLoading, error } = useGetTaskById(incomingTaskId); // Replace 20 with taskId if dynamic
  const { data: prioritiesData } = useGetAllPriorities();
  const { data: statusesData } = useGetAllStatus();
  const { data: taskTypesData } = useGetAllTaskTypes();
  const { data: developersData } = useGetAllDevelopers();

  const getDeveloperNames = (ids: number[]) => {
    return (
      developersData
        ?.filter((dev) => ids.includes(dev.n_Id))
        .map((dev) => dev.s_FullName)
        .join(", ") || "N/A"
    );
  };

  const getFileTypeLabel = (mimeType: string) => {
    if (mimeType.includes("pdf")) return "PDF Document";
    if (mimeType.includes("excel")) return "Excel Sheet";
    if (mimeType.includes("spreadsheet")) return "Spreadsheet";
    if (mimeType.includes("word")) return "Word Document";
    if (mimeType.includes("text")) return "Text File";
    if (mimeType.includes("zip")) return "ZIP Archive";
    return mimeType.split("/")[1]?.toUpperCase() || "File";
  };

  if (isLoading) return <p>Loading...</p>;
  if (error || !task) return <p>Error loading task details.</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left: Task Details */}
      <div className="w-full lg:w-2/3 p-6">
        <h1 className="text-2xl font-bold mb-4">Task Details</h1>

        <Card className="space-y-4 p-6 bg-white shadow">
          <CardContent className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Title</Label>
              <Input name="S_Title" value={task.s_Title} readOnly />
            </div>

            <div>
              <Label className="text-muted-foreground">Description</Label>
              <Textarea
                name="S_Description"
                value={task.s_Description}
                readOnly
                className="h-40"
              />
            </div>

            <div>
              <Label className="text-muted-foreground">Priority</Label>
              <Select value={task.n_PriorityId?.toString()}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  {prioritiesData?.map((priority) => (
                    <SelectItem
                      key={priority.n_Id}
                      value={priority.n_Id.toString()}
                    >
                      {priority.s_Description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-muted-foreground">Task Type</Label>
              <Select value={task.n_TaskTypeId?.toString()}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Task Type" />
                </SelectTrigger>
                <SelectContent>
                  {taskTypesData?.map((taskType: any) => (
                    <SelectItem
                      key={taskType.n_Id}
                      value={taskType.n_Id.toString()}
                    >
                      {taskType.s_Description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-muted-foreground">Status</Label>
              <Select value={task.n_StatusId?.toString()}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusesData?.map((status: any) => (
                    <SelectItem
                      key={status.n_Id}
                      value={status.n_Id.toString()}
                    >
                      {status.s_Description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Attachments Section */}
            <div className="mt-6 bg-white p-4 rounded shadow overflow-x-auto whitespace-nowrap">
              <h2 className="text-lg font-semibold mb-4">
                Attachments ({task.taskDocuments?.length || 0})
              </h2>

              {task.taskDocuments && task.taskDocuments.length > 0 ? (
                <div className="flex flex-row gap-4">
                  {task.taskDocuments.map((doc: any, index: number) => {
                    const { s_FileContent, s_FileContentType } = doc;
                    const fileType = s_FileContentType.split("/")[0];
                    const fileBlob = new Blob(
                      [
                        Uint8Array.from(atob(s_FileContent), (c) =>
                          c.charCodeAt(0)
                        ),
                      ],
                      { type: s_FileContentType }
                    );
                    const fileUrl = URL.createObjectURL(fileBlob);
                    const openInNewTab = () => window.open(fileUrl, "_blank");

                    return (
                      <div
                        key={index}
                        className="min-w-[130px] flex flex-col items-center p-2 border rounded hover:bg-gray-50 transition cursor-pointer"
                        onClick={openInNewTab}
                      >
                        {fileType === "image" ? (
                          <img
                            src={fileUrl}
                            alt={`Attachment ${index + 1}`}
                            className="w-24 h-24 object-cover rounded"
                          />
                        ) : fileType === "video" ? (
                          <video className="w-24 h-24 rounded" muted>
                            <source src={fileUrl} type={s_FileContentType} />
                          </video>
                        ) : (
                          <div className="w-24 h-24 bg-gray-100 flex flex-col items-center justify-center rounded text-center">
                            <span className="text-sm text-gray-700 px-2">
                              {getFileTypeLabel(s_FileContentType)}
                            </span>
                            <span className="text-xs text-blue-500 mt-1 underline">
                              Open
                            </span>
                          </div>
                        )}

                        <p className="text-xs text-gray-600 mt-1 text-center">
                          Attachment {index + 1}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No attachments available.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right: Activity Log */}
      <aside className="hidden lg:flex w-1/3 p-4 sticky top-0 h-screen">
        <div className="flex flex-col w-full bg-white rounded-lg shadow-md p-4 max-h-full">
          <h2 className="text-lg font-semibold mb-4">Activity Log</h2>

          {/* Scrollable log entries */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="text-sm text-gray-600 border-l-4 pl-3 border-green-500"
              >
                <p className="font-medium">User {index + 1}</p>
                <p>Commented on task: “This is a sample comment.”</p>
                <p className="text-xs text-gray-400">Just now</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t mt-4 pt-4">
            <Label htmlFor="newComment" className="text-muted-foreground">
              Add Comment
            </Label>
            <Textarea
              id="newComment"
              placeholder="Write a comment..."
              className="h-24 mt-2"
            />
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Post Comment
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

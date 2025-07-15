
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Post,Get,DeleteById,Delete,Put } from '../../../utils/apiService'

const baseUrl = 'http://localhost:5034/api/'//process.env.REACT_APP_API_URL;

const apiUrl = {
    GET_TASK_TYPES:  "TaskTypes/GetAll",
    ADD_TASK_TYPES:  "TaskTypes/Create",
    DELETE_TASK_TYPES:  "TaskTypes/Delete",
    GET_BY_ID_TASK_TYPES:  "TaskTypes/Get",
    UPDATE_TASK_TYPES:  "TaskTypes/Update",
}


const getAllTaskTypes = async () => {
  return Get({
    url: `${baseUrl}${apiUrl.GET_TASK_TYPES}`,
  });
};

export const useGetAllTaskTypes = () => {
  return useQuery({
    queryKey: ["GET_ALL_TASK_TYPES"],
    queryFn: () => getAllTaskTypes(),
    //enabled: !!body.encryptedId,
  });
};


const addTaskTypes = async (body:any) => {
  return Post({
    url: `${baseUrl}${apiUrl.ADD_TASK_TYPES}`,
    body
  });
};

// export const useAddTaskTypes = (body: any) => {
//   return useQuery({
//     queryKey: ["GET_ALL_TASK_TYPES"],
//     queryFn: () => addTaskTypes(body),
//     //enabled: !!body.encryptedId,
//   });
// };

export const useAddTaskTypes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: any) => addTaskTypes(body),
    onSuccess: () => {
      // Invalidate to refetch task types
      queryClient.invalidateQueries(["GET_ALL_TASK_TYPES"]);
    },
  });
};



const deleteTaskTypes = async (id:any) => {
  return Delete({
    url: `${baseUrl}${apiUrl.DELETE_TASK_TYPES}/${id}`
  });
};


export const useDeleteTaskTypes = (id:number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTaskTypes(id),
    onSuccess: () => {
      // Invalidate to refetch task types
      queryClient.invalidateQueries(["GET_ALL_TASK_TYPES"]);
    },
  });
};



export const getByIdTaskTypes = async (id:number) => {
  return Get({
    url: `${baseUrl}${apiUrl.GET_BY_ID_TASK_TYPES}/${id}`,
  });
};

export const useGetByIdTaskTypes = (id: number) => {
  return useQuery({
    queryKey: ["GET_BY_ID_TASK_TYPES", id],
    queryFn: () => getByIdTaskTypes(id), // Non-null assertion
    enabled: id > 0,
  });
};




const updateTaskTypes = async (id:number, body:any) => {
  console.log("Updating with URL:", `${baseUrl}${apiUrl.UPDATE_TASK_TYPES}/${id}`);
  return Put({
    url: `${baseUrl}${apiUrl.UPDATE_TASK_TYPES}/${id}`,
    body
  });
};

export const useUpdateTaskTypes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: any }) => updateTaskTypes(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries(["GET_ALL_TASK_TYPES"]);
    },
  });
};


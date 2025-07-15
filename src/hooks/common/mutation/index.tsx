import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post,Delete,Put } from '../../../utils/apiService'
import {apiUrl} from '../apiUrls'
import {keys} from '../keys'
const baseUrl = 'http://localhost:5034/api/'//process.env.REACT_APP_API_URL;


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
      queryClient.invalidateQueries([keys.GET_ALLL_TASK_TYPES]);
    },
  });
};


const addTaskTypes = async (body:any) => {
  return Post({
    url: `${baseUrl}${apiUrl.ADD_TASK_TYPES}`,
    body
  });
};

export const useAddTaskTypes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: any) => addTaskTypes(body),
    onSuccess: () => {
      // Invalidate to refetch task types
      queryClient.invalidateQueries([keys.GET_ALLL_TASK_TYPES]);
    },
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
      queryClient.invalidateQueries([keys.GET_ALLL_TASK_TYPES]);
    },
  });
};


import { useQuery } from '@tanstack/react-query';
import { Get } from '../../../utils/apiService'
import {apiUrl} from '../apiUrls'
import {keys} from '../keys'
const baseUrl = 'http://localhost:5034/api/'//process.env.REACT_APP_API_URL;


const getAllTaskTypes = async () => {
  return Get({
    url: `${baseUrl}${apiUrl.GET_TASK_TYPES}`,
  });
};

export const useGetAllTaskTypes = () => {
  return useQuery({
    queryKey: [keys.GET_ALLL_TASK_TYPES],
    queryFn: () => getAllTaskTypes(),
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
    queryFn: () => getByIdTaskTypes(id),
    enabled: id > 0,
  });
};





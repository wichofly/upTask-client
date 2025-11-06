import { isAxiosError } from 'axios';
import api from '../lib/axios';
import type { Project, TaskFormData } from '../types';

type TaskAPIType = {
  formData: TaskFormData;
  id: Project['_id'];
};

export const createTask = async ({ formData, id }: TaskAPIType) => {
  try {
    const { data } = await api.post<string>(`/projects/${id}/tasks`, formData);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

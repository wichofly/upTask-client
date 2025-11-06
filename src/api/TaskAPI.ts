import { isAxiosError } from 'axios';
import api from '../lib/axios';
import type { Project, TaskFormData } from '../types';

type TaskAPIType = {
  formData: TaskFormData;
  projectId: Project['_id'];
};

export const createTask = async ({ formData, projectId }: TaskAPIType) => {
  try {
    const { data } = await api.post<string>(`/projects/${projectId}/tasks`, formData);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

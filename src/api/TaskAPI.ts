import { isAxiosError } from 'axios';
import api from '../lib/axios';
import type { Project, Task, TaskFormData } from '../types';

type TaskAPIType = {
  formData: TaskFormData;
  projectId: Project['_id'];
  taskId: Task['_id'];
};

export const createTask = async ({
  formData,
  projectId,
}: Pick<TaskAPIType, 'formData' | 'projectId'>) => {
  try {
    const { data } = await api.post<string>(
      `/projects/${projectId}/tasks`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getTaskById = async ({
  projectId,
  taskId,
}: Pick<TaskAPIType, 'projectId' | 'taskId'>) => {
  try {
    const { data } = await api(`/projects/${projectId}/tasks/${taskId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const updateTask = async ({
  formData,
  projectId,
  taskId,
}: Pick<TaskAPIType, 'formData' | 'projectId' | 'taskId'>) => {
  try {
    const { data } = await api.put<string>(
      `/projects/${projectId}/tasks/${taskId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const deleteTask = async ({
  projectId,
  taskId,
}: Pick<TaskAPIType, 'projectId' | 'taskId'>) => {
  try {
    const { data } = await api.delete<string>(
      `/projects/${projectId}/tasks/${taskId}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

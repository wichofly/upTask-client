import { isAxiosError } from 'axios';
import api from '../lib/axios';
import {
  TaskSchema,
  type Project,
  type Task,
  type TaskFormData,
} from '../types';

type TaskAPIType = {
  formData: TaskFormData;
  projectId: Project['_id'];
  taskId: Task['_id'];
  status: Task['status'];
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
    const response = TaskSchema.safeParse(data);
    if (response.success) return response.data;
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

export const updateStatus = async ({
  projectId,
  taskId,
  status,
}: Pick<TaskAPIType, 'projectId' | 'taskId' | 'status'>) => {
  try {
    const { data } = await api.post<string>(
      `/projects/${projectId}/tasks/${taskId}/status`,
      { status }
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

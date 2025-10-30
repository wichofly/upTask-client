import { isAxiosError } from 'axios';
import api from '../lib/axios';
import type { ProjectFormData } from '../types';

export const createProject = async (formData: ProjectFormData) => {
  try {
    const { data } = await api.post('/projects', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getProjects = async () => {
  try {
    const { data } = await api('/projects');
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

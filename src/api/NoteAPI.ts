import { isAxiosError } from 'axios';
import api from '../lib/axios';
import type { NoteFormData, Project, Task } from '../types';

type NoteAPIType = {
  formData: NoteFormData;
  projectId: Project['_id'];
  taskId: Task['_id'];
};

export const createNote = async ({
  formData,
  projectId,
  taskId,
}: Pick<NoteAPIType, 'formData' | 'projectId' | 'taskId'>) => {
  try {
    const { data } = await api.post<string>(
      `/projects/${projectId}/tasks/${taskId}/notes`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

import { isAxiosError } from 'axios';
import api from '../lib/axios';
import type { Project, TeamMember, TeamMemberForm } from '../types';

type TeamAPIType = {
  formData?: TeamMemberForm;
  projectId?: Project['_id'];
  memberId?: TeamMember['_id'];
};

export const findUserByEmail = async ({ formData, projectId }: TeamAPIType) => {
  try {
    const { data } = await api.post(
      `/projects/${projectId}/team/find`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const addUserToProject = async ({
  projectId,
  memberId,
}: TeamAPIType) => {
  try {
    const { data } = await api.post<string>(`/projects/${projectId}/team`, {
      memberId,
    }); // "id" must be inside of an object
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getProjectTeam = async ({ projectId }: TeamAPIType) => {
  try {
    const { data } = await api(`/projects/${projectId}/team`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const removeMemberFromProject = async ({
  projectId,
  memberId,
}: TeamAPIType) => {
  try {
    const { data } = await api.delete<string>(
      `/projects/${projectId}/team/${memberId}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

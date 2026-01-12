import { isAxiosError } from 'axios';
import api from '../lib/axios';
import type { UpdatePasswordForm, UserProfileForm } from '../types';

export const changePassword = async (formData: UpdatePasswordForm) => {
  try {
    const { data } = await api.post<string>('/auth/update-password', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const updateProfile = async (formData: UserProfileForm) => {
  try {
    const { data } = await api.put<string>('/auth/profile', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

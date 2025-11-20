import { isAxiosError } from 'axios';
import api from '../lib/axios';
import type { UserRegistrationForm } from '../types';

export const createAccount = async (formData: UserRegistrationForm) => {
  try {
    const { data } = await api.post<string>('/auth/create-account', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

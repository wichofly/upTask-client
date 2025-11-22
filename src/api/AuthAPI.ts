import { isAxiosError } from 'axios';
import api from '../lib/axios';
import type {
  ConfirmToken,
  RequestNewCodeForm,
  UserLoginForm,
  UserRegistrationForm,
} from '../types';

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

export const confirmAccount = async (formData: ConfirmToken) => {
  try {
    const { data } = await api.post<string>('/auth/confirm-account', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const requestConfirmationCode = async (formData: RequestNewCodeForm) => {
  try {
    const { data } = await api.post<string>('/auth/request-code', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const loginUser = async (formData: UserLoginForm) => {
  try {
    const { data } = await api.post<string>('/auth/login', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

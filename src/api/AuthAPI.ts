import { isAxiosError } from 'axios';
import api from '../lib/axios';
import {
  userSchema,
  type ConfirmToken,
  type ForgotPasswordForm,
  type RequestNewCodeForm,
  type ResetPasswordForm,
  type User,
  type UserLoginForm,
  type UserRegistrationForm,
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
    localStorage.setItem('AUTH_TOKEN', data); // Store token in localStorage
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const forgotPassword = async (formData: ForgotPasswordForm) => {
  try {
    const { data } = await api.post<string>('/auth/forgot-password', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const validateToken = async (formData: ConfirmToken) => {
  try {
    const { data } = await api.post<string>('/auth/validate-token', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const updatePasswordWithToken = async ({
  formData,
  token,
}: {
  formData: ResetPasswordForm;
  token: ConfirmToken['token'];
}) => {
  try {
    const { data } = await api.post<string>(
      `/auth/update-password/${token}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getUser = async () => {
  try {
    const { data } = await api.get<User>('auth/user-profile');
    const response = userSchema.safeParse(data);
    if (response.success) return response.data;

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

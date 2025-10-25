// hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { loginStart, loginSuccess, loginFailure, logout } from '../store/reducers/userReducer';
import { authApi } from '../services/api/authApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userData, loading, error } = useSelector((state) => state.user);

  const login = useCallback(async (email, password) => {
    dispatch(loginStart());
    try {
      const response = await authApi.login(email, password);
      dispatch(loginSuccess(response.user));
      return { success: true };
    } catch (error) {
      dispatch(loginFailure(error.message));
      return { success: false, error: error.message };
    }
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const updateProfile = useCallback(async (profileData) => {
    try {
      const response = await authApi.updateProfile(profileData);
      dispatch(loginSuccess(response.user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [dispatch]);

  return {
    isAuthenticated,
    userData,
    loading,
    error,
    login,
    logout: logoutUser,
    updateProfile,
  };
};

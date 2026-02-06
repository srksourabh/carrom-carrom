import React, { useEffect } from 'react';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';
import { useAuthStore } from '../stores/authStore';
import { setAuthStoreGetter } from '../services/api';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export function RootNavigator() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    setAuthStoreGetter(() => useAuthStore.getState());
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading..." />;
  }

  return isAuthenticated ? <MainTabs /> : <AuthStack />;
}

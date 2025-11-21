// navigation/AppNavigator.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const user = useSelector((state) => state.auth?.user);
  
  useEffect(() => {
    console.log('=== Auth State Changed ===');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);
    console.log('========================');
  }, [isAuthenticated, user]);
  
  console.log('AppNavigator rendering - isAuthenticated:', isAuthenticated);
  
  return (
    <NavigationContainer>
      {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;

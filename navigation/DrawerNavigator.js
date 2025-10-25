// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import StackNavigator from './StackNavigator'; // Changed from TabNavigator to StackNavigator

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#3498db',
        drawerInactiveTintColor: '#7f8c8d',
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Main"
        component={StackNavigator}  // Changed from TabNavigator to StackNavigator
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
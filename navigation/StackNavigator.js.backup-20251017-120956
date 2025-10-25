// navigation/StackNavigator.js - Updated with Route Planning
import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AttendanceScreen from '../screens/attendance/AttendanceScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';

import ReportsScreen from '../screens/reports/ReportsScreen';

// Billing & Invoicing screens
import InvoicesScreen from '../screens/billing/InvoicesScreen';
import InvoiceDetailsScreen from '../screens/billing/InvoiceDetailsScreen';
import CreateInvoiceScreen from '../screens/billing/CreateInvoiceScreen';

// Inventory Management screens
import InventoryScreen from '../screens/inventory/InventoryScreen';
import ItemDetailsScreen from '../screens/inventory/ItemDetailsScreen';
import AddItemScreen from '../screens/inventory/AddItemScreen';
import StockMovementScreen from '../screens/inventory/StockMovementScreen';

// Customer Management screens
import CustomersScreen from '../screens/customers/CustomersScreen';
import CustomerDetailsScreen from '../screens/customers/CustomerDetailsScreen';
import AddCustomerScreen from '../screens/customers/AddCustomerScreen';
import EditCustomerScreen from '../screens/customers/EditCustomerScreen';

// Settings screens
import SettingsScreen from '../screens/settings/SettingsScreen';
import EditProfileScreen from '../screens/settings/EditProfileScreen';

// Shipment Tracking screens
import ShipmentsScreen from '../screens/shipments/ShipmentsScreen';
import ShipmentDetailsScreen from '../screens/shipments/ShipmentDetailsScreen';
import AddShipmentScreen from '../screens/shipments/AddShipmentScreen';

// Import your main tab navigator
import TabNavigator from './TabNavigator';

//import analytics
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
// Import GroupChat
import GroupChat from '../components/communication/GroupChat';

// Import the TypeScript OrderManagementScreen
import OrderManagementScreen from '../screens/orders/OrderManagementScreen.js';

// Import Fleet Management Screens
  import FleetOverview from '../screens/fleet/FleetOverview';
  import VehicleDetails from '../screens/fleet/VehicleDetails';
  import AddVehicle from '../screens/fleet/AddVehicle';

// ? Import Route Planning Screens
import RoutesScreen from '../screens/routes/RoutesScreen';

//import metricsScreen
import MetricsScreen from '../screens/metrics/MetricsScreen';

//import create order
import CreateOrderScreen from '../screens/orders/CreateOrderScreen';

//import add driver
import AddDriverScreen from '../screens/fleet/AddDriverScreen';

//import track package
import TrackPackageScreen from '../screens/shipments/TrackPackageScreen';

//import pending order and delivery metrics
import PendingOrdersScreen from '../screens/orders/PendingOrdersScreen';
import DeliveryMetricsScreen from '../screens/analytics/DeliveryMetricsScreen';

// Placeholder component for screens that don't exist yet
const PlaceholderScreen = ({ route }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 18, marginBottom: 10 }}>
      {route.params?.title || 'Screen'} Coming Soon
    </Text>
    <Text style={{ color: '#666' }}>
      This screen will be implemented next.
    </Text>
  </View>
);

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      {/* Main Tab Navigator as the initial screen */}
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* Notifications Screen */}
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />


      {/* GroupChat Screen */}
      <Stack.Screen
        name="GroupChat"
        component={GroupChat}
        options={{ headerShown: false }}
      />

      {/* Attendance Screen */}
      <Stack.Screen
        name="Attendance"
        component={AttendanceScreen}
        options={{ headerShown: false }}
       />
       
       {/* report Screen */}
       <Stack.Screen
         name="Reports"
         component={ReportsScreen}
         options={{ headerShown: false }}
       />

      {/* Shipment Tracking Screens */}
      <Stack.Screen
        name="Shipments"
        component={ShipmentsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShipmentDetails"
        component={ShipmentDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrackPackage"
        component={TrackPackageScreen}
        options={{ headerShown: false }}
       />
      <Stack.Screen
        name="AddShipment"
        component={AddShipmentScreen}
        options={{ headerShown: false }}
      />
      
      {/* Billing & Invoicing Screens */}
      <Stack.Screen
        name="Invoices"
        component={InvoicesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InvoiceDetails"
        component={InvoiceDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateInvoice"
        component={CreateInvoiceScreen}
        options={{ headerShown: false }}
      />
       {/* Inventory Management Screens */}
      <Stack.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemDetails"
        component={ItemDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItemScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StockMovement"
        component={StockMovementScreen}
        options={{ headerShown: false }}
      />
     {/* Customer Management Screens */}
      <Stack.Screen
        name="Customers"
        component={CustomersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomerDetails"
        component={CustomerDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCustomer"
        component={AddCustomerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditCustomer"
        component={EditCustomerScreen}
        options={{ headerShown: false }}
      />
     {/* Settings Screens */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      {/* Order Management Screen - Enhanced TypeScript Version */}
      <Stack.Screen
        name="OrderManagement"
        component={OrderManagementScreen}
        options={{
          headerShown: false,
          title: 'Order Management'
        }}
      />

      {/* Keep the old OrderDetails for backward compatibility if needed */}
      <Stack.Screen
        name="OrderDetails"
        component={PlaceholderScreen}
        options={{ title: 'Order Details' }}
        initialParams={{ title: 'Order Details' }}
      />

      {/* Additional order-related screens */}
      <Stack.Screen
      name="CreateOrder"
      component={CreateOrderScreen}
      options={{ headerShown: false }}
       />

      <Stack.Screen
        name="EditOrder"
        component={PlaceholderScreen}
        options={{ title: 'Edit Order' }}
        initialParams={{ title: 'Edit Order' }}
      />

      {/*Fleet Management Screens*/}
      <Stack.Screen
        name="FleetOverview"
        component={FleetOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
         name="Metrics"
         component={MetricsScreen}
         options={{ headerShown: false }}
       />
      <Stack.Screen
        name="VehicleDetails"
        component={VehicleDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddVehicle"
        component={AddVehicle}
        options={{ headerShown: false }}
      />
      <Stack.Screen
       name="AddDriver"
       component={AddDriverScreen}
       options={{ headerShown: false }}
       />

      {/* ? ROUTE PLANNING SCREENS */}
      <Stack.Screen
        name="Routes"
        component={RoutesScreen}
        options={{ headerShown: false }}
      />
       
              <Stack.Screen
        name="CreateRoute"
        component={PlaceholderScreen}
        options={{ title: 'Create Route' }}
        initialParams={{ title: 'Create Route' }}
      />

      <Stack.Screen
         name="Analytics"
         component={AnalyticsScreen}
         options={{ headerShown: false }}
       />
      <Stack.Screen
         name="PendingOrders"
         component={PendingOrdersScreen}
         options={{ headerShown: false }}
       />
      <Stack.Screen
        name="DeliveryMetrics"
        component={DeliveryMetricsScreen}
        options={{ headerShown: false }}
       />

      <Stack.Screen
        name="EditRoute"
        component={PlaceholderScreen}
        options={{ title: 'Edit Route' }}
        initialParams={{ title: 'Edit Route' }}
      />

      <Stack.Screen
        name="TrackRoute"
        component={PlaceholderScreen}
        options={{ title: 'Track Route' }}
        initialParams={{ title: 'Track Route' }}
      />

      {/* Other screens */}
      <Stack.Screen
        name="CustomerDetailsView"
        component={PlaceholderScreen}
        options={{ title: 'CustomerDetailsView' }}
        initialParams={{ title: 'CustomerDetailsView' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;





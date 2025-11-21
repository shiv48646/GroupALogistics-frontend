import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { store, persistor } from './store';
import AppNavigator from './navigation/AppNavigator';
import { LogBox } from 'react-native';

console.log('=== APP.JS LOADED ===');
console.log('Store:', store);
console.log('Store state:', store.getState());
console.log('Auth state from store:', store.getState().auth);
console.log('====================');

LogBox.ignoreLogs(['Setting a timer']);

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#3498db" />
    <Text style={styles.loadingText}>Loading GroupA Logistics...</Text>
  </View>
);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <AppNavigator />
          <StatusBar style="auto" />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
  },
});

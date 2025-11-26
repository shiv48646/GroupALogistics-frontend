// TEST FILE - Delete this after testing
// Run: node testServices.js

import authService from './src/services/authService';

const testAPI = async () => {
  console.log('🧪 Testing API Services...\n');

  try {
    // Test 1: Login
    console.log('1️⃣ Testing login...');
    const loginResult = await authService.login('admin@test.com', 'Test@123');
    console.log('✅ Login successful!');
    console.log('User:', loginResult.data.user.name);
    console.log('Token received!\n');

    // Add more tests here as needed
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testAPI();

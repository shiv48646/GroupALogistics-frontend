// components/auth/LoginForm.tsx - Fixed Syntax Error
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { loginStart, loginSuccess, loginFailure } from '../../store/reducers/userReducer';

//const { width } = Dimensions.get('window');

interface LoginFormProps {
  navigation?: any;
}

const LoginForm: React.FC<LoginFormProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.user);
  
  const [email, setEmail] = useState('demo@groupalogistics.com');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Authentication Required', 'Please enter both email and password');
      return;
    }

    dispatch(loginStart());

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        id: 1,
        name: 'Sarah Johnson',
        email: email,
        role: 'Fleet Manager',
        company: 'GroupA Logistics',
        permissions: ['view_dashboard', 'manage_fleet', 'manage_orders'],
        department: 'Operations',
        lastLogin: new Date().toISOString(),
      };

      dispatch(loginSuccess(userData));
      Alert.alert('Welcome Back!', 'Hello ' + userData.name + ', welcome to GroupA Logistics Dashboard');
    } catch (error) {
      dispatch(loginFailure('Authentication failed. Please verify your credentials and try again.'));
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.background}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="business" size={40} color="#fff" />
          </View>
          <Text style={styles.companyName}>GroupA Logistics</Text>
          <Text style={styles.tagline}>Fleet Management System</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.signInText}>Sign in to continue</Text>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#7f8c8d" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Email Address"
              placeholderTextColor="#bdc3c7"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#7f8c8d" style={styles.inputIcon} />
            <TextInput
              style={[styles.textInput, { flex: 1 }]}
              placeholder="Password"
              placeholderTextColor="#bdc3c7"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="#7f8c8d" 
              />
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color="#e74c3c" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.loadingText}>Signing In...</Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Sign In</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
              </View>
            )}
          </TouchableOpacity>

          {/* Demo Info */}
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Demo Account Ready</Text>
            <View style={styles.demoCredentials}>
              <View style={styles.demoItem}>
                <Ionicons name="checkmark-circle" size={16} color="#27ae60" />
                <Text style={styles.demoText}>Email: demo@groupalogistics.com</Text>
              </View>
              <View style={styles.demoItem}>
                <Ionicons name="checkmark-circle" size={16} color="#27ae60" />
                <Text style={styles.demoText}>Password: demo123</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}> 2025 GroupA Logistics. All rights reserved.</Text>
          <Text style={styles.versionText}>Version 2.1.0</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { 
    flex: 1, 
    backgroundColor: '#2c3e50', 
    paddingHorizontal: 20 
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 80,
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  signInText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  inputIcon: { marginRight: 10 },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
  },
  eyeIcon: { padding: 5 },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdf2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 25,
  },
  loginButtonDisabled: { backgroundColor: '#bdc3c7' },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  demoContainer: { marginTop: 10 },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
  },
  demoCredentials: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
  },
  demoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 13,
    color: '#2c3e50',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
  },
});

export default LoginForm;

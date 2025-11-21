// screens/auth/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { authService } from '../../services/authService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const demoUsers = [
    { email: 'testnew@example.com', password: 'Password123!', role: 'admin', name: 'Test User New' },
    { email: 'admin@logistics.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      console.log('=== Before Login ===');
      console.log('Auth State:', authState);
      
      const response = await authService.login(email, password);
      
      console.log('=== Login API Response ===');
      console.log('Response:', response);
      
      const payload = {
        user: response.user,
        token: response.accessToken,
      };
      
      console.log('=== Dispatching loginSuccess ===');
      console.log('Payload:', payload);
      
      dispatch(loginSuccess(payload));
      
      console.log('=== After Dispatch ===');
      console.log('Auth State should update now...');
      
      // Small delay to let Redux update
      setTimeout(() => {
        console.log('Auth State after dispatch:', authState);
      }, 100);

      Alert.alert('Success', 'Welcome ' + response.user.name + '!');
      
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (index) => {
    const user = demoUsers[index];
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Icon name="truck-fast" size={64} color="#2563EB" />
          <Text style={styles.appName}>GroupA Logistics</Text>
          <Text style={styles.tagline}>Smart Delivery Management</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View style={styles.inputContainer}>
            <Icon name="email-outline" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-outline" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Icon
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <View style={styles.demoSection}>
            <Text style={styles.demoTitle}>Quick Login (Demo)</Text>
            <View style={styles.demoButtons}>
              <TouchableOpacity
                style={styles.demoButton}
                onPress={() => fillDemoCredentials(0)}
              >
                <Icon name="shield-account" size={16} color="#2563EB" />
                <Text style={styles.demoButtonText}>Test Admin</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.demoButton}
                onPress={() => fillDemoCredentials(1)}
              >
                <Icon name="account-tie" size={16} color="#2563EB" />
                <Text style={styles.demoButtonText}>Demo Admin</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.apiNote}>? API Connected!</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#111827',
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  demoSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  demoTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'center',
  },
  demoButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  demoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  demoButtonText: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '600',
  },
  apiNote: {
    fontSize: 11,
    color: '#10B981',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '600',
  },
  footer: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 24,
  },
  signupLink: {
    color: '#2563EB',
    fontWeight: '600',
  },
});

export default LoginScreen;

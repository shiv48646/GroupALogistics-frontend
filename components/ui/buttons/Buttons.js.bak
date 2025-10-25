import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  disabled = false, 
  loading = false,
  style,
  textStyle,
  icon,
  ...props 
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style
  ];

  const textStyleCombined = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={disabled || loading ? 1 : 0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'secondary' ? '#007AFF' : '#FFFFFF'} 
          size="small" 
        />
      ) : (
        <>
          {icon && icon}
          <Text style={textStyleCombined}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  
  // Variants
  primary: {
    backgroundColor: '#007AFF',
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  success: {
    backgroundColor: '#28A745',
    borderWidth: 0,
  },
  danger: {
    backgroundColor: '#DC3545',
    borderWidth: 0,
  },
  warning: {
    backgroundColor: '#FFC107',
    borderWidth: 0,
  },
  info: {
    backgroundColor: '#17A2B8',
    borderWidth: 0,
  },
  light: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  dark: {
    backgroundColor: '#343A40',
    borderWidth: 0,
  },

  // Sizes
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 52,
  },

  // Disabled state
  disabled: {
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },

  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#007AFF',
  },
  successText: {
    color: '#FFFFFF',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  warningText: {
    color: '#212529',
  },
  infoText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#495057',
  },
  darkText: {
    color: '#FFFFFF',
  },

  // Text sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },

  disabledText: {
    opacity: 0.8,
  },
});# Navigate to the Button.js file
cd components\ui

# Backup your current file
Copy-Item Button.js Button.js.backup

# Create new Button.js with working content
@"
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  disabled = false, 
  loading = false,
  style,
  textStyle,
  icon,
  ...props 
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant] || styles.primary,
    styles[size] || styles.medium,
    disabled && styles.disabled,
    style
  ];

  const textStyleCombined = [
    styles.text,
    styles[variant + 'Text'] || styles.primaryText,
    styles[size + 'Text'] || styles.mediumText,
    disabled && styles.disabledText,
    textStyle
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={disabled || loading ? 1 : 0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'secondary' ? '#007AFF' : '#FFFFFF'} 
          size="small" 
        />
      ) : (
        <>
          {icon && icon}
          <Text style={textStyleCombined}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#007AFF',
  },
  mediumText: {
    fontSize: 16,
  },
  disabledText: {
    opacity: 0.8,
  },
});

export default Button;
"@ | Out-File -FilePath "Button.js" -Encoding UTF8

# Go back to project root
cd ..\..

export default Button;
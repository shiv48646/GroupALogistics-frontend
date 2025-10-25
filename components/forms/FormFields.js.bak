import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';

// Reusable Input Field Component
export const FormInput = ({ 
  label, 
  value, 
  onChangeText, 
  error, 
  required = false,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  editable = true,
  secureTextEntry = false,
  maxLength,
  style = {},
  inputStyle = {},
  labelStyle = {},
  errorStyle = {}
}) => (
  <View style={[styles.inputContainer, style]}>
    {label && (
      <Text style={[styles.inputLabel, labelStyle]}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
    )}
    <TextInput
      style={[
        styles.input,
        multiline && styles.textArea,
        error && styles.inputError,
        !editable && styles.inputDisabled,
        inputStyle
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || `Enter ${label?.toLowerCase() || 'text'}`}
      placeholderTextColor="#999"
      multiline={multiline}
      numberOfLines={numberOfLines}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      editable={editable}
      secureTextEntry={secureTextEntry}
      maxLength={maxLength}
    />
    {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
  </View>
);

// Reusable Picker Component (Horizontal Scrolling Options)
export const FormPicker = ({ 
  label, 
  value, 
  onValueChange, 
  options = [], 
  required = false,
  error,
  style = {},
  labelStyle = {},
  optionStyle = {},
  selectedOptionStyle = {}
}) => (
  <View style={[styles.inputContainer, style]}>
    {label && (
      <Text style={[styles.inputLabel, labelStyle]}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
    )}
    <View style={styles.pickerContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.pickerOption,
              optionStyle,
              value === option && styles.pickerOptionSelected,
              value === option && selectedOptionStyle
            ]}
            onPress={() => onValueChange(option)}
          >
            <Text style={[
              styles.pickerOptionText,
              value === option && styles.pickerOptionTextSelected
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

// Reusable Switch Component
export const FormSwitch = ({ 
  label, 
  value, 
  onValueChange, 
  description,
  style = {},
  labelStyle = {},
  descriptionStyle = {}
}) => (
  <View style={[styles.switchContainer, style]}>
    <View style={styles.switchInfo}>
      <Text style={[styles.switchLabel, labelStyle]}>{label}</Text>
      {description && (
        <Text style={[styles.switchDescription, descriptionStyle]}>
          {description}
        </Text>
      )}
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#ccc', true: '#2196F3' }}
      thumbColor={value ? '#fff' : '#f4f3f4'}
    />
  </View>
);

// Reusable Selector Component (for modals)
export const FormSelector = ({ 
  label, 
  value, 
  onPress, 
  placeholder = 'Select option',
  required = false,
  error,
  rightElement,
  style = {},
  labelStyle = {},
  selectorStyle = {}
}) => (
  <View style={[styles.inputContainer, style]}>
    {label && (
      <Text style={[styles.inputLabel, labelStyle]}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
    )}
    <TouchableOpacity
      style={[styles.selector, error && styles.inputError, selectorStyle]}
      onPress={onPress}
    >
      <Text style={[
        styles.selectorText,
        !value && styles.placeholderText
      ]}>
        {value || placeholder}
      </Text>
      {rightElement || <Text style={styles.selectorArrow}>›</Text>}
    </TouchableOpacity>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

// Date Input Component
export const FormDateInput = ({ 
  label, 
  value, 
  onChangeText, 
  error, 
  required = false,
  placeholder = 'YYYY-MM-DD',
  style = {},
  ...props
}) => (
  <FormInput
    label={label}
    value={value}
    onChangeText={onChangeText}
    error={error}
    required={required}
    placeholder={placeholder}
    keyboardType="numeric"
    maxLength={10}
    style={style}
    {...props}
  />
);

// Currency Input Component
export const FormCurrencyInput = ({ 
  label, 
  value, 
  onChangeText, 
  error, 
  required = false,
  currency = '$',
  style = {},
  labelStyle = {}
}) => (
  <View style={[styles.inputContainer, style]}>
    {label && (
      <Text style={[styles.inputLabel, labelStyle]}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
    )}
    <View style={[styles.currencyInputContainer, error && styles.inputError]}>
      <Text style={styles.currencySymbol}>{currency}</Text>
      <TextInput
        style={styles.currencyInput}
        value={value}
        onChangeText={onChangeText}
        placeholder="0.00"
        placeholderTextColor="#999"
        keyboardType="decimal-pad"
      />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

// Phone Input Component
export const FormPhoneInput = ({ 
  label, 
  value, 
  onChangeText, 
  error, 
  required = false,
  countryCode = '+1',
  style = {},
  labelStyle = {}
}) => (
  <View style={[styles.inputContainer, style]}>
    {label && (
      <Text style={[styles.inputLabel, labelStyle]}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
    )}
    <View style={[styles.phoneInputContainer, error && styles.inputError]}>
      <Text style={styles.countryCode}>{countryCode}</Text>
      <TextInput
        style={styles.phoneInput}
        value={value}
        onChangeText={onChangeText}
        placeholder="555-0123"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
      />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

// Form Section Component
export const FormSection = ({ 
  title, 
  children, 
  style = {},
  titleStyle = {} 
}) => (
  <View style={[styles.section, style]}>
    {title && <Text style={[styles.sectionTitle, titleStyle]}>{title}</Text>}
    {children}
  </View>
);

// Form Row Component (for side-by-side fields)
export const FormRow = ({ 
  children, 
  style = {},
  spacing = 10 
}) => (
  <View style={[styles.rowContainer, { marginHorizontal: -spacing/2 }, style]}>
    {React.Children.map(children, (child, index) => (
      <View key={index} style={[styles.rowItem, { marginHorizontal: spacing/2 }]}>
        {child}
      </View>
    ))}
  </View>
);

// Form Button Component
export const FormButton = ({ 
  title, 
  onPress, 
  type = 'primary', // 'primary', 'secondary', 'danger'
  size = 'medium', // 'small', 'medium', 'large'
  disabled = false,
  loading = false,
  style = {},
  textStyle = {},
  icon,
  ...props
}) => {
  const getButtonStyle = () => {
    let buttonStyle = [styles.button];
    
    // Type styles
    switch (type) {
      case 'primary':
        buttonStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        buttonStyle.push(styles.secondaryButton);
        break;
      case 'danger':
        buttonStyle.push(styles.dangerButton);
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        buttonStyle.push(styles.smallButton);
        break;
      case 'large':
        buttonStyle.push(styles.largeButton);
        break;
    }
    
    if (disabled || loading) {
      buttonStyle.push(styles.buttonDisabled);
    }
    
    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyleArray = [styles.buttonText];
    
    switch (type) {
      case 'primary':
        textStyleArray.push(styles.primaryButtonText);
        break;
      case 'secondary':
        textStyleArray.push(styles.secondaryButtonText);
        break;
      case 'danger':
        textStyleArray.push(styles.dangerButtonText);
        break;
    }
    
    switch (size) {
      case 'small':
        textStyleArray.push(styles.smallButtonText);
        break;
      case 'large':
        textStyleArray.push(styles.largeButtonText);
        break;
    }
    
    return textStyleArray;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      {...props}
    >
      <View style={styles.buttonContent}>
        {icon && <View style={styles.buttonIcon}>{icon}</View>}
        <Text style={[...getTextStyle(), textStyle]}>
          {loading ? 'Loading...' : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Form Header Component
export const FormHeader = ({ 
  title, 
  subtitle, 
  style = {},
  titleStyle = {},
  subtitleStyle = {} 
}) => (
  <View style={[styles.header, style]}>
    <Text style={[styles.title, titleStyle]}>{title}</Text>
    {subtitle && (
      <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
    )}
  </View>
);

// Multi-Select Component
export const FormMultiSelect = ({
  label,
  value = [],
  onValueChange,
  options = [],
  error,
  required = false,
  placeholder = 'Select options',
  style = {},
  maxSelections = null
}) => {
  const toggleOption = (option) => {
    if (value.includes(option)) {
      onValueChange(value.filter(item => item !== option));
    } else {
      if (maxSelections && value.length >= maxSelections) {
        return; // Don't add more if max reached
      }
      onValueChange([...value, option]);
    }
  };

  return (
    <View style={[styles.inputContainer, style]}>
      {label && (
        <Text style={styles.inputLabel}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View style={styles.multiSelectContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {options.map(option => {
            const isSelected = value.includes(option);
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.multiSelectOption,
                  isSelected && styles.multiSelectOptionSelected
                ]}
                onPress={() => toggleOption(option)}
              >
                <Text style={[
                  styles.multiSelectOptionText,
                  isSelected && styles.multiSelectOptionTextSelected
                ]}>
                  {option} {isSelected && '✓'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {value.length > 0 && (
        <Text style={styles.multiSelectSummary}>
          Selected: {value.join(', ')}
        </Text>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// Rating Component
export const FormRating = ({
  label,
  value = 0,
  onValueChange,
  maxRating = 5,
  error,
  required = false,
  style = {},
  starSize = 30,
  starColor = '#FFD700',
  emptyStarColor = '#E0E0E0'
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      {label && (
        <Text style={styles.inputLabel}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View style={styles.ratingContainer}>
        {[...Array(maxRating)].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onValueChange(index + 1)}
            style={styles.starButton}
          >
            <Text style={[
              styles.star,
              { 
                fontSize: starSize,
                color: index < value ? starColor : emptyStarColor 
              }
            ]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.ratingValue}>({value}/{maxRating})</Text>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  // Input styles
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#F44336',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  inputError: {
    borderColor: '#F44336',
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#999',
  },
  textArea: {
    textAlignVertical: 'top',
    minHeight: 80,
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    marginTop: 5,
  },

  // Picker styles
  pickerContainer: {
    marginBottom: 5,
  },
  pickerOption: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  pickerOptionSelected: {
    backgroundColor: '#2196F3',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#666',
  },
  pickerOptionTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },

  // Switch styles
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  switchInfo: {
    flex: 1,
    marginRight: 15,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  switchDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  // Selector styles
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  selectorArrow: {
    fontSize: 18,
    color: '#999',
  },

  // Currency input styles
  currencyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  currencySymbol: {
    fontSize: 16,
    color: '#333',
    paddingLeft: 15,
    paddingRight: 5,
  },
  currencyInput: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 15,
    fontSize: 16,
    color: '#333',
  },

  // Phone input styles
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  countryCode: {
    fontSize: 16,
    color: '#333',
    paddingLeft: 15,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },

  // Section styles
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 5,
  },

  // Row styles
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: {
    flex: 1,
  },

  // Button styles
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dangerButton: {
    backgroundColor: '#F44336',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#333',
  },
  dangerButtonText: {
    color: '#fff',
  },
  smallButtonText: {
    fontSize: 14,
  },
  largeButtonText: {
    fontSize: 18,
  },

  // Header styles
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },

  // Multi-select styles
  multiSelectContainer: {
    marginBottom: 5,
  },
  multiSelectOption: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  multiSelectOptionSelected: {
    backgroundColor: '#4CAF50',
  },
  multiSelectOptionText: {
    fontSize: 14,
    color: '#666',
  },
  multiSelectOptionTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  multiSelectSummary: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
  },

  // Rating styles
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starButton: {
    marginRight: 5,
  },
  star: {
    fontSize: 30,
  },
  ratingValue: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
});

// Export all components
export default {
  FormInput,
  FormPicker,
  FormSwitch,
  FormSelector,
  FormDateInput,
  FormCurrencyInput,
  FormPhoneInput,
  FormSection,
  FormRow,
  FormButton,
  FormHeader,
  FormMultiSelect,
  FormRating,
};
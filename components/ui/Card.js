// components/ui/Card.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

const Card = ({
  children,
  onPress,
  style,
  variant = 'default',
  padding = 'medium',
}) => {
  const Component = onPress ? TouchableOpacity : View;
  
  const cardStyles = [
    styles.card,
    styles[variant],
    styles[padding],
    style,
  ];

  return (
    <Component style={cardStyles} onPress={onPress} activeOpacity={0.7}>
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  default: {
    // Default styling already applied above
  },
  elevated: {
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  flat: {
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 0,
  },
  small: {
    padding: 8,
  },
  medium: {
    padding: 16,
  },
  large: {
    padding: 24,
  },
  none: {
    padding: 0,
  },
});

export default Card;

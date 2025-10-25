// screens/analytics/AnalyticsScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnalyticsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Analytics & Reports</Text>
          <Text style={styles.subtitle}>Business performance insights</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Icon name="chart-line" size={48} color="#3B82F6" />
          <Text style={styles.message}>Analytics Module Active</Text>
          <Text style={styles.description}>Full features will be enabled once data flow is confirmed.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1F2937' },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  content: { flex: 1 },
  section: { padding: 40, alignItems: 'center' },
  message: { fontSize: 18, fontWeight: 'bold', marginTop: 16, color: '#1F2937' },
  description: { fontSize: 14, color: '#6B7280', marginTop: 8, textAlign: 'center' }
});

export default AnalyticsScreen;

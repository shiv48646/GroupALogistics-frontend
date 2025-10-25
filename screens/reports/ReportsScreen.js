// screens/reports/ReportsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ReportsScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Report templates
  const reportTemplates = [
    {
      id: 'revenue',
      title: 'Revenue Report',
      description: 'Detailed revenue breakdown by period',
      icon: 'currency-inr',
      color: '#10B981',
      data: { total: 3250000, growth: '+12.5%' }
    },
    {
      id: 'orders',
      title: 'Orders Report',
      description: 'Order history and status summary',
      icon: 'clipboard-list',
      color: '#3B82F6',
      data: { total: 1358, completed: 1138 }
    },
    {
      id: 'fleet',
      title: 'Fleet Performance',
      description: 'Vehicle utilization and efficiency',
      icon: 'truck',
      color: '#F59E0B',
      data: { vehicles: 45, utilization: '84.4%' }
    },
    {
      id: 'customers',
      title: 'Customer Analytics',
      description: 'Customer orders and revenue analysis',
      icon: 'account-group',
      color: '#8B5CF6',
      data: { total: 342, active: 287 }
    },
    {
      id: 'routes',
      title: 'Routes Report',
      description: 'Route performance and statistics',
      icon: 'map-marker-path',
      color: '#EC4899',
      data: { total: 156, onTime: '91.2%' }
    },
    {
      id: 'expenses',
      title: 'Expense Report',
      description: 'Operating costs breakdown',
      icon: 'cash-minus',
      color: '#EF4444',
      data: { total: 1850000, fuel: '47.3%' }
    }
  ];

  const periods = [
    { id: 'day', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' },
    { id: 'custom', label: 'Custom Range' }
  ];

  const handleGenerateReport = (reportType) => {
    Alert.alert(
      'Generate Report',
      'Select export format:',
      [
        {
          text: 'PDF',
          onPress: () => exportReport(reportType, 'pdf')
        },
        {
          text: 'Excel',
          onPress: () => exportReport(reportType, 'excel')
        },
        {
          text: 'CSV',
          onPress: () => exportReport(reportType, 'csv')
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const exportReport = async (reportType, format) => {
    // Simulate report generation
    Alert.alert(
      'Success',
      String(reportType) + ' report generated successfully!\\n\\nFormat: ' + String(format).toUpperCase() + '\\nPeriod: ' + String(selectedPeriod),
      [
        {
          text: 'Share',
          onPress: () => shareReport(reportType, format)
        },
        { text: 'OK' }
      ]
    );
  };

  const shareReport = async (reportType, format) => {
    try {
      await Share.share({
        message: String(reportType) + ' Report (' + String(format).toUpperCase() + ')\\nGenerated on: ' + new Date().toLocaleDateString(),
        title: String(reportType) + ' Report'
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share report');
    }
  };

  const formatValue = (value) => {
    if (typeof value === 'number' && value >= 100000) {
      return '\\u20B9' + (value / 100000).toFixed(1) + 'L';
    }
    return String(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Reports & Exports</Text>
          <Text style={styles.headerSubtitle}>Generate business reports</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <View style={styles.periodSelector}>
        <Text style={styles.periodLabel}>Report Period:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodScroll}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[styles.periodButton, selectedPeriod === period.id && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[styles.periodButtonText, selectedPeriod === period.id && styles.periodButtonTextActive]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Reports</Text>
          <TouchableOpacity style={styles.quickReportCard} onPress={() => handleGenerateReport('Summary')}>
            <View style={[styles.quickIcon, { backgroundColor: '#3B82F620' }]}>
              <Icon name="file-document" size={28} color="#3B82F6" />
            </View>
            <View style={styles.quickInfo}>
              <Text style={styles.quickTitle}>Complete Summary Report</Text>
              <Text style={styles.quickSubtitle}>All metrics and KPIs in one report</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report Templates</Text>
          {reportTemplates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={styles.reportCard}
              onPress={() => handleGenerateReport(template.title)}
            >
              <View style={[styles.reportIcon, { backgroundColor: template.color + '20' }]}>
                <Icon name={template.icon} size={24} color={template.color} />
              </View>
              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>{template.title}</Text>
                <Text style={styles.reportDescription}>{template.description}</Text>
                <View style={styles.reportData}>
                  {Object.entries(template.data).map(([key, value], index) => (
                    <Text key={index} style={styles.reportDataText}>
                      {key}: <Text style={styles.reportDataValue}>{formatValue(value)}</Text>
                    </Text>
                  ))}
                </View>
              </View>
              <TouchableOpacity
                style={styles.exportButton}
                onPress={() => handleGenerateReport(template.title)}
              >
                <Icon name="download" size={20} color="#3B82F6" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scheduled Reports</Text>
          <TouchableOpacity style={styles.scheduledCard} onPress={() => Alert.alert('Coming Soon', 'Scheduled reports feature')}>
            <Icon name="calendar-clock" size={24} color="#6B7280" />
            <Text style={styles.scheduledText}>Set up automatic report generation</Text>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { backgroundColor: '#fff', padding: 20, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1F2937' },
  headerSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  periodSelector: { backgroundColor: '#fff', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  periodLabel: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  periodScroll: { flexDirection: 'row' },
  periodButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#F3F4F6', marginRight: 8 },
  periodButtonActive: { backgroundColor: '#3B82F6' },
  periodButtonText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  periodButtonTextActive: { color: '#fff' },
  content: { flex: 1 },
  section: { backgroundColor: '#fff', marginTop: 12, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  quickReportCard: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#F9FAFB', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  quickIcon: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  quickInfo: { flex: 1 },
  quickTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  quickSubtitle: { fontSize: 14, color: '#6B7280' },
  reportCard: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#F9FAFB', borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  reportIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  reportInfo: { flex: 1 },
  reportTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  reportDescription: { fontSize: 13, color: '#6B7280', marginBottom: 6 },
  reportData: { flexDirection: 'row', flexWrap: 'wrap' },
  reportDataText: { fontSize: 12, color: '#9CA3AF', marginRight: 12 },
  reportDataValue: { fontWeight: '600', color: '#374151' },
  exportButton: { padding: 8 },
  scheduledCard: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#F9FAFB', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', borderStyle: 'dashed' },
  scheduledText: { flex: 1, fontSize: 14, color: '#6B7280', marginLeft: 12 },
  bottomSpace: { height: 40 }
});

export default ReportsScreen;

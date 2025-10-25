// screens/billing/InvoiceDetailsScreen.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InvoiceDetailsScreen = ({ route, navigation }) => {
  const { invoice } = route.params || {};

  if (!invoice) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Invoice not found</Text>
      </View>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'overdue': return '#EF4444';
      case 'partial': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const formatCurrency = (amount) => {
    return '?' + amount.toLocaleString('en-IN');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleDownloadPDF = () => {
    Alert.alert('Download PDF', 'PDF generation will be implemented');
  };

  const handleSendEmail = () => {
    Alert.alert('Send Email', 'Email sending will be implemented');
  };

  const handleRecordPayment = () => {
    Alert.alert('Record Payment', 'Payment recording will be implemented');
  };

  const balance = invoice.amount - invoice.paid;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invoice Details</Text>
        <TouchableOpacity onPress={handleDownloadPDF} style={styles.iconButton}>
          <Ionicons name="download-outline" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.invoiceHeader}>
            <View>
              <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
              <Text style={styles.invoiceDate}>Issued: {formatDate(invoice.date)}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(invoice.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(invoice.status) }]}>
                {invoice.status.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="business-outline" size={18} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Customer</Text>
              <Text style={styles.infoValue}>{invoice.customer}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="pricetag-outline" size={18} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Customer ID</Text>
              <Text style={styles.infoValue}>{invoice.customerId}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={18} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Due Date</Text>
              <Text style={styles.infoValue}>{formatDate(invoice.dueDate)}</Text>
            </View>
          </View>
          <View style={styles.paymentSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Invoice Amount</Text>
              <Text style={styles.summaryValue}>{formatCurrency(invoice.amount)}</Text>
            </View>
            {invoice.paid > 0 && (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: '#10B981' }]}>Paid</Text>
                <Text style={[styles.summaryValue, { color: '#10B981' }]}>-{formatCurrency(invoice.paid)}</Text>
              </View>
            )}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Balance Due</Text>
              <Text style={[styles.totalValue, { color: balance > 0 ? '#EF4444' : '#10B981' }]}>
                {formatCurrency(balance)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Line Items</Text>
          {invoice.items.map((item, index) => (
            <View key={index} style={styles.lineItem}>
              <View style={styles.lineItemHeader}>
                <Text style={styles.lineItemDescription}>{item.description}</Text>
                <Text style={styles.lineItemAmount}>{formatCurrency(item.amount)}</Text>
              </View>
              <Text style={styles.lineItemDetails}>
                Qty: {item.quantity}  {formatCurrency(item.rate)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsCard}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSendEmail}>
            <Ionicons name="mail-outline" size={20} color="#3B82F6" />
            <Text style={styles.actionButtonText}>Send via Email</Text>
          </TouchableOpacity>
          {balance > 0 && (
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]} onPress={handleRecordPayment}>
              <Ionicons name="cash-outline" size={20} color="#fff" />
              <Text style={[styles.actionButtonText, styles.primaryButtonText]}>Record Payment</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { backgroundColor: '#fff', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backButton: { marginRight: 16 },
  headerTitle: { flex: 1, fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  iconButton: { padding: 8 },
  content: { flex: 1 },
  card: { backgroundColor: '#fff', margin: 16, marginBottom: 0, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  invoiceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  invoiceNumber: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  invoiceDate: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  infoContent: { marginLeft: 12, flex: 1 },
  infoLabel: { fontSize: 12, color: '#9CA3AF', marginBottom: 2 },
  infoValue: { fontSize: 14, fontWeight: '500', color: '#1F2937' },
  paymentSummary: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: '#6B7280' },
  summaryValue: { fontSize: 14, fontWeight: '500', color: '#1F2937' },
  totalRow: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  totalValue: { fontSize: 18, fontWeight: 'bold' },
  lineItem: { marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  lineItemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  lineItemDescription: { fontSize: 14, fontWeight: '500', color: '#1F2937', flex: 1 },
  lineItemAmount: { fontSize: 14, fontWeight: 'bold', color: '#1F2937' },
  lineItemDetails: { fontSize: 12, color: '#9CA3AF' },
  actionsCard: { margin: 16, marginBottom: 32 },
  actionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 12 },
  actionButtonText: { fontSize: 14, fontWeight: '600', color: '#3B82F6', marginLeft: 8 },
  primaryButton: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
  primaryButtonText: { color: '#fff' },
  errorText: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginTop: 50 }
});

export default InvoiceDetailsScreen;

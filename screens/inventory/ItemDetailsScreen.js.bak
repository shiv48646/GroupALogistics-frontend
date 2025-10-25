// screens/inventory/ItemDetailsScreen.js
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

const ItemDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params || {};

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Item not found</Text>
      </View>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock': return '#10B981';
      case 'low-stock': return '#F59E0B';
      case 'out-of-stock': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const handleStockIn = () => {
    navigation.navigate('StockMovement', { item, type: 'in' });
  };

  const handleStockOut = () => {
    navigation.navigate('StockMovement', { item, type: 'out' });
  };

  const handleEdit = () => {
    navigation.navigate('EditItem', { item });
  };

  // Sample stock movement history
  const movements = [
    { id: 1, type: 'in', quantity: 100, date: '2025-01-28', reference: 'PO-1234', note: 'Supplier delivery' },
    { id: 2, type: 'out', quantity: 50, date: '2025-01-27', reference: 'SHIP-001', note: 'Customer shipment' },
    { id: 3, type: 'in', quantity: 200, date: '2025-01-25', reference: 'PO-1233', note: 'Restock order' },
    { id: 4, type: 'out', quantity: 100, date: '2025-01-24', reference: 'SHIP-002', note: 'Customer shipment' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Item Details</Text>
        <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
          <Ionicons name="create-outline" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.itemHeader}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSku}>SKU: {item.sku}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                {item.status.toUpperCase().replace('-', ' ')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Stock Information</Text>
          <View style={styles.stockInfo}>
            <View style={styles.stockItem}>
              <Text style={styles.stockLabel}>Current Quantity</Text>
              <Text style={[styles.stockValue, { color: getStatusColor(item.status) }]}>
                {item.quantity} {item.unit}
              </Text>
            </View>
            <View style={styles.stockItem}>
              <Text style={styles.stockLabel}>Reorder Level</Text>
              <Text style={styles.stockValue}>{item.reorderLevel} {item.unit}</Text>
            </View>
          </View>
          {item.quantity <= item.reorderLevel && (
            <View style={styles.alertBox}>
              <Ionicons name="alert-circle" size={20} color="#F59E0B" />
              <Text style={styles.alertText}>Stock is at or below reorder level</Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Item Details</Text>
          <View style={styles.infoRow}>
            <Ionicons name="pricetags-outline" size={18} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={styles.infoValue}>{item.category}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{item.location}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="cube-outline" size={18} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Unit of Measurement</Text>
              <Text style={styles.infoValue}>{item.unit}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Recent Movements</Text>
          {movements.map(movement => (
            <View key={movement.id} style={styles.movementItem}>
              <View style={styles.movementHeader}>
                <View style={[styles.movementType, { backgroundColor: movement.type === 'in' ? '#10B98120' : '#EF444420' }]}>
                  <Ionicons 
                    name={movement.type === 'in' ? 'arrow-down' : 'arrow-up'} 
                    size={16} 
                    color={movement.type === 'in' ? '#10B981' : '#EF4444'} 
                  />
                  <Text style={[styles.movementTypeText, { color: movement.type === 'in' ? '#10B981' : '#EF4444' }]}>
                    {movement.type === 'in' ? 'Stock In' : 'Stock Out'}
                  </Text>
                </View>
                <Text style={styles.movementQuantity}>
                  {movement.type === 'in' ? '+' : '-'}{movement.quantity} {item.unit}
                </Text>
              </View>
              <Text style={styles.movementDate}>{movement.date}  {movement.reference}</Text>
              <Text style={styles.movementNote}>{movement.note}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsCard}>
          <TouchableOpacity style={styles.actionButton} onPress={handleStockIn}>
            <Ionicons name="add-circle-outline" size={20} color="#10B981" />
            <Text style={[styles.actionButtonText, { color: '#10B981' }]}>Stock In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleStockOut}>
            <Ionicons name="remove-circle-outline" size={20} color="#EF4444" />
            <Text style={[styles.actionButtonText, { color: '#EF4444' }]}>Stock Out</Text>
          </TouchableOpacity>
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
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  itemName: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  itemSku: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  stockInfo: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  stockItem: { flex: 1, backgroundColor: '#F9FAFB', padding: 16, borderRadius: 8 },
  stockLabel: { fontSize: 12, color: '#6B7280', marginBottom: 8 },
  stockValue: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  alertBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', padding: 12, borderRadius: 8, gap: 8 },
  alertText: { fontSize: 13, color: '#92400E', flex: 1 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  infoContent: { marginLeft: 12, flex: 1 },
  infoLabel: { fontSize: 12, color: '#9CA3AF', marginBottom: 2 },
  infoValue: { fontSize: 14, fontWeight: '500', color: '#1F2937' },
  movementItem: { marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  movementHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  movementType: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  movementTypeText: { fontSize: 12, fontWeight: '600' },
  movementQuantity: { fontSize: 14, fontWeight: 'bold', color: '#1F2937' },
  movementDate: { fontSize: 12, color: '#9CA3AF', marginBottom: 4 },
  movementNote: { fontSize: 13, color: '#6B7280' },
  actionsCard: { margin: 16, marginBottom: 32, flexDirection: 'row', gap: 12 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', gap: 8 },
  actionButtonText: { fontSize: 14, fontWeight: '600' },
  errorText: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginTop: 50 }
});

export default ItemDetailsScreen;

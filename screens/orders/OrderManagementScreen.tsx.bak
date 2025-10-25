// screens/orders/OrderManagementScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Alert,
  StatusBar,
  SafeAreaView,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import Redux types and actions
import { AppDispatch } from '../../store';
import {
  Order,
  OrderItem,
  fetchOrders,
  createOrder,
  updateOrderAsync,
  deleteOrderAsync,
  setSelectedOrder,
  clearSelectedOrder,
  setFilter,
  updateOrderStatus,
  selectFilteredOrders,
  selectOrdersByStatus,
  selectOrdersLoading,
  selectOrdersError,
  selectSelectedOrder,
  selectOrdersFilters,
} from '../../store/slices/ordersSlice';

type ViewType = 'list' | 'details' | 'create' | 'edit';

interface NavigationProps {
  navigation: any;
}

const OrderManagementScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Redux selectors
  const filteredOrders = useSelector(typeof selectFilteredOrders !== 'undefined' ? selectFilteredOrders : (s) => s);
  const ordersStats = useSelector(typeof selectOrdersByStatus !== 'undefined' ? selectOrdersByStatus : (s) => s);
  const isLoading = useSelector(typeof selectOrdersLoading !== 'undefined' ? selectOrdersLoading : (s) => s);
  const error = useSelector(typeof selectOrdersError !== 'undefined' ? selectOrdersError : (s) => s);
  const selectedOrder = useSelector(typeof selectSelectedOrder !== 'undefined' ? selectSelectedOrder : (s) => s);
  const filters = useSelector(typeof selectOrdersFilters !== 'undefined' ? selectOrdersFilters : (s) => s);
  
  // Local state
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [searchQuery, setSearchQuery] = useState<string>(filters.search);
  const [statusFilter, setStatusFilter] = useState<string>(filters.status);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  // Load orders on mount
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Sync local search with Redux
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setFilter({ key: 'search', value: searchQuery }));
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, dispatch]);

  // Sync status filter with Redux
  useEffect(() => {
    dispatch(setFilter({ key: 'status', value: statusFilter }));
  }, [statusFilter, dispatch]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return styles.statusPending;
      case 'processing': return styles.statusProcessing;
      case 'shipped': return styles.statusShipped;
      case 'delivered': return styles.statusDelivered;
      case 'cancelled': return styles.statusCancelled;
      default: return styles.statusDefault;
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'time-outline';
      case 'processing': return 'cube-outline';
      case 'shipped': return 'send-outline';
      case 'delivered': return 'checkmark-circle-outline';
      case 'cancelled': return 'close-circle-outline';
      default: return 'help-circle-outline';
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  const handleDeleteOrder = (orderId: string) => {
    Alert.alert(
      'Delete Order',
      'Are you sure you want to delete this order?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteOrderAsync(orderId));
            if (selectedOrder && selectedOrder.id === orderId) {
              setCurrentView('list');
              dispatch(clearSelectedOrder());
            }
          }
        }
      ]
    );
  };

  const StatusFilterModal: React.FC = () => (
    <Modal
      visible={showFilterModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter by Status</Text>
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
            <TouchableOpacity
              key={status}
              style={[
                styles.modalOption,
                statusFilter === status && styles.modalOptionSelected
              ]}
              onPress={() => {
                setStatusFilter(status);
                setShowFilterModal(false);
              }}
            >
              <Text style={[
                styles.modalOptionText,
                statusFilter === status && styles.modalOptionTextSelected
              ]}>
                {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowFilterModal(false)}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const OrderListView: React.FC = () => {
    const renderOrderItem: ListRenderItem<Order> = ({ item }) => (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>{item.id}</Text>
            <View style={[styles.statusBadge, getStatusColor(item.status)]}>
              <Ionicons 
                name={getStatusIcon(item.status) as any} 
                size={12} 
                color="#ffffff" 
                style={styles.statusIcon}
              />
              <Text style={styles.statusText}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
          </View>
          <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
        </View>
        
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={styles.customerEmail}>{item.customerEmail}</Text>
        <Text style={styles.orderDate}>{item.orderDate}</Text>
        
        <View style={styles.orderActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              dispatch(setSelectedOrder(item));
              setCurrentView('details');
            }}
          >
            <Text style={styles.actionButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => {
              dispatch(setSelectedOrder(item));
              setCurrentView('edit');
            }}
          >
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteOrder(item.id)}
          >
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#3498db" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Management</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setCurrentView('create')}
          >
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>New</Text>
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#7f8c8d" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search orders..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Ionicons name="filter" size={18} color="#374151" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{ordersStats.all}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#f59e0b' }]}>
              {ordersStats.pending}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#3498db' }]}>
              {ordersStats.processing}
            </Text>
            <Text style={styles.statLabel}>Processing</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#10b981' }]}>
              {ordersStats.delivered}
            </Text>
            <Text style={styles.statLabel}>Delivered</Text>
          </View>
        </View>

        {/* Orders List */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading orders...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredOrders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id}
            style={styles.ordersList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.emptyState}>
                <Ionicons name="cube-outline" size={48} color="#9ca3af" />
                <Text style={styles.emptyStateText}>No orders found</Text>
                <Text style={styles.emptyStateSubtext}>
                  Try adjusting your search or filter criteria.
                </Text>
              </View>
            )}
          />
        )}

        <StatusFilterModal />
      </SafeAreaView>
    );
  };

  const OrderDetailsView: React.FC = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentView('list')}
        >
          <Ionicons name="arrow-back" size={24} color="#3498db" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <TouchableOpacity
          style={styles.editHeaderButton}
          onPress={() => setCurrentView('edit')}
        >
          <Ionicons name="pencil" size={18} color="#fff" />
          <Text style={styles.editHeaderButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {selectedOrder && (
        <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
          {/* Order Info */}
          <View style={styles.detailsCard}>
            <View style={styles.detailsHeader}>
              <Text style={styles.detailsCardTitle}>Order Information</Text>
              <View style={[styles.statusBadge, getStatusColor(selectedOrder.status)]}>
                <Ionicons 
                  name={getStatusIcon(selectedOrder.status) as any} 
                  size={12} 
                  color="#ffffff" 
                  style={styles.statusIcon}
                />
                <Text style={styles.statusText}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </Text>
              </View>
            </View>
            
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Order ID</Text>
              <Text style={styles.detailsValue}>{selectedOrder.id}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Order Date</Text>
              <Text style={styles.detailsValue}>{selectedOrder.orderDate}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Total Amount</Text>
              <Text style={[styles.detailsValue, styles.totalAmount]}>
                ${selectedOrder.total.toFixed(2)}
              </Text>
            </View>
            
            {selectedOrder.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.detailsLabel}>Notes</Text>
                <Text style={styles.detailsValue}>{selectedOrder.notes}</Text>
              </View>
            )}
          </View>

          {/* Customer Info */}
          <View style={styles.detailsCard}>
            <Text style={styles.detailsCardTitle}>Customer Information</Text>
            
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Name</Text>
              <Text style={styles.detailsValue}>{selectedOrder.customerName}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Email</Text>
              <Text style={styles.detailsValue}>{selectedOrder.customerEmail}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Phone</Text>
              <Text style={styles.detailsValue}>{selectedOrder.customerPhone}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Shipping Address</Text>
              <Text style={styles.detailsValue}>{selectedOrder.shippingAddress}</Text>
            </View>
          </View>

          {/* Order Items */}
          <View style={styles.detailsCard}>
            <Text style={styles.detailsCardTitle}>Order Items</Text>
            
            {selectedOrder.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
            ))}
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${selectedOrder.total.toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );

  const OrderFormView: React.FC = () => {
    const [formData, setFormData] = useState<Partial<Order>>(() => {
      if (currentView === 'edit' && selectedOrder) {
        return { ...selectedOrder };
      }
      return {
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        status: 'pending' as const,
        total: 0,
        items: [{ id: Date.now(), name: '', quantity: 1, price: 0 }],
        shippingAddress: '',
        orderDate: new Date().toISOString().split('T')[0],
        notes: ''
      };
    });

    const handleSubmit = () => {
      if (currentView === 'edit' && selectedOrder) {
        dispatch(updateOrderAsync({ ...formData, id: selectedOrder.id } as Order));
      } else {
        const newOrderData = {
          ...formData,
          total: formData.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
        };
        dispatch(createOrder(newOrderData as Omit<Order, 'id' | 'createdAt' | 'updatedAt'>));
      }
      setCurrentView('list');
    };

    const addItem = () => {
      setFormData({
        ...formData,
        items: [...(formData.items || []), { id: Date.now(), name: '', quantity: 1, price: 0 }]
      });
    };

    const removeItem = (itemId: number) => {
      setFormData({
        ...formData,
        items: formData.items?.filter(item => item.id !== itemId) || []
      });
    };

    const updateItem = (itemId: number, field: keyof OrderItem, value: string | number) => {
      const updatedItems = formData.items?.map(item =>
        item.id === itemId ? { 
          ...item, 
          [field]: field === 'quantity' || field === 'price' ? parseFloat(value.toString()) || 0 : value 
        } : item
      ) || [];
      
      setFormData({
        ...formData,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentView('list')}
          >
            <Ionicons name="arrow-back" size={24} color="#3498db" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {currentView === 'edit' ? 'Edit Order' : 'Create Order'}
          </Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit}
          >
            <Ionicons name="checkmark" size={18} color="#fff" />
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
          {/* Customer Information */}
          <View style={styles.formCard}>
            <Text style={styles.formCardTitle}>Customer Information</Text>
            
            <Text style={styles.inputLabel}>Customer Name</Text>
            <TextInput
              style={styles.textInput}
              value={formData.customerName || ''}
              onChangeText={(text) => setFormData({ ...formData, customerName: text })}
              placeholder="Enter customer name"
            />
            
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={formData.customerEmail || ''}
              onChangeText={(text) => setFormData({ ...formData, customerEmail: text })}
              placeholder="Enter email address"
              keyboardType="email-address"
            />
            
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.textInput}
              value={formData.customerPhone || ''}
              onChangeText={(text) => setFormData({ ...formData, customerPhone: text })}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
            
            <Text style={styles.inputLabel}>Shipping Address</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.shippingAddress || ''}
              onChangeText={(text) => setFormData({ ...formData, shippingAddress: text })}
              placeholder="Enter shipping address"
              multiline={true}
              numberOfLines={3}
            />
          </View>

          {/* Order Details */}
          <View style={styles.formCard}>
            <Text style={styles.formCardTitle}>Order Details</Text>
            
            <Text style={styles.inputLabel}>Order Date</Text>
            <TextInput
              style={styles.textInput}
              value={formData.orderDate || ''}
              onChangeText={(text) => setFormData({ ...formData, orderDate: text })}
              placeholder="YYYY-MM-DD"
            />
            
            <Text style={styles.inputLabel}>Notes</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.notes || ''}
              onChangeText={(text) => setFormData({ ...formData, notes: text })}
              placeholder="Order notes (optional)"
              multiline={true}
              numberOfLines={3}
            />
          </View>

          {/* Order Items */}
          <View style={styles.formCard}>
            <View style={styles.itemsHeader}>
              <Text style={styles.formCardTitle}>Order Items</Text>
              <TouchableOpacity style={styles.addItemButton} onPress={addItem}>
                <Ionicons name="add" size={16} color="#fff" />
                <Text style={styles.addItemButtonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
            
            {formData.items?.map((item, index) => (
              <View key={item.id} style={styles.itemFormRow}>
                <TextInput
                  style={[styles.textInput, styles.itemNameInput]}
                  value={item.name}
                  onChangeText={(text) => updateItem(item.id, 'name', text)}
                  placeholder="Item name"
                />
                <TextInput
                  style={[styles.textInput, styles.itemQuantityInput]}
                  value={item.quantity.toString()}
                  onChangeText={(text) => updateItem(item.id, 'quantity', text)}
                  placeholder="Qty"
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.textInput, styles.itemPriceInput]}
                  value={item.price.toString()}
                  onChangeText={(text) => updateItem(item.id, 'price', text)}
                  placeholder="Price"
                  keyboardType="numeric"
                />
                {(formData.items?.length || 0) > 1 && (
                  <TouchableOpacity
                    style={styles.removeItemButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Ionicons name="close" size={18} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            
            <View style={styles.totalFormRow}>
              <Text style={styles.totalFormLabel}>Total: ${(formData.total || 0).toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // Main render logic
  switch (currentView) {
    case 'details':
      return <OrderDetailsView />;
    case 'create':
    case 'edit':
      return <OrderFormView />;
    default:
      return <OrderListView />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 4,
  },
  editHeaderButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editHeaderButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 4,
  },
  saveButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 4,
  },
  
  // Search Styles
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginRight: 12,
  },
  searchIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 12,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#f9fafb',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'center',
  },
  filterButtonText: {
    color: '#374151',
    fontWeight: '500',
    marginLeft: 4,
  },
  
  // Stats Styles
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  
  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  
  // Order Card Styles
  ordersList: {
    flex: 1,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  customerName: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  customerEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 12,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 2,
  },
  editButton: {
    backgroundColor: '#dbeafe',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
  },
  actionButtonText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  
  // Status Styles
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  statusPending: {
    backgroundColor: '#f59e0b',
  },
  statusProcessing: {
    backgroundColor: '#3498db',
  },
  statusShipped: {
    backgroundColor: '#8b5cf6',
  },
  statusDelivered: {
    backgroundColor: '#10b981',
  },
  statusCancelled: {
    backgroundColor: '#ef4444',
  },
  statusDefault: {
    backgroundColor: '#6b7280',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  modalOptionSelected: {
    backgroundColor: '#dbeafe',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  modalOptionTextSelected: {
    color: '#3498db',
    fontWeight: '600',
  },
  modalCloseButton: {
    backgroundColor: '#6b7280',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  modalCloseButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '600',
  },
  
  // Details View Styles
  detailsContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailsCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  detailsLabel: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  detailsValue: {
    fontSize: 14,
    color: '#111827',
    flex: 2,
    textAlign: 'right',
  },
  totalAmount: {
    fontWeight: '700',
    fontSize: 16,
  },
  notesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  
  // Item Styles
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#e5e7eb',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  
  // Form Styles
  formContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  formCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  formCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
    marginTop: 12,
  },
  textInput: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    fontSize: 14,
    color: '#111827',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  
  // Items Form Styles
  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addItemButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addItemButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  itemFormRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemNameInput: {
    flex: 2,
    marginRight: 8,
  },
  itemQuantityInput: {
    flex: 0.5,
    marginRight: 8,
  },
  itemPriceInput: {
    flex: 0.7,
    marginRight: 8,
  },
  removeItemButton: {
    backgroundColor: '#ef4444',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalFormRow: {
    alignItems: 'flex-end',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#e5e7eb',
  },
  totalFormLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default OrderManagementScreen;

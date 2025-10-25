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
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const OrderManagementScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // Get orders from Redux store (you'll need to connect this to your actual store)
  const orders = useSelector(state => state.orders?.orders || []);
  
  // Removed filteredOrders state - using orders directly
  const [currentView, setCurrentView] = useState('list'); // 'list', 'details', 'create', 'edit'
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Sample order data - defined here so filtering logic can use it
  const sampleOrders = [
    {
      id: 'ORD-001',
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      customerPhone: '+1 234 567 8900',
      status: 'pending',
      total: 299.99,
      items: [
        { id: 1, name: 'Wireless Headphones', quantity: 1, price: 199.99 },
        { id: 2, name: 'Phone Case', quantity: 2, price: 50.00 }
      ],
      shippingAddress: '123 Main St, City, State 12345',
      orderDate: '2024-01-15',
      notes: 'Customer requested express delivery'
    },
    {
      id: 'ORD-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      customerPhone: '+1 234 567 8901',
      status: 'processing',
      total: 149.99,
      items: [{ id: 3, name: 'Bluetooth Speaker', quantity: 1, price: 149.99 }],
      shippingAddress: '456 Oak Ave, Town, State 67890',
      orderDate: '2024-01-14',
      notes: 'Gift wrapping requested'
    },
    {
      id: 'ORD-003',
      customerName: 'Mike Davis',
      customerEmail: 'mike@example.com',
      customerPhone: '+1 234 567 8902',
      status: 'shipped',
      total: 399.97,
      items: [
        { id: 4, name: 'Smart Watch', quantity: 1, price: 299.99 },
        { id: 5, name: 'Watch Band', quantity: 2, price: 49.99 }
      ],
      shippingAddress: '789 Pine St, Village, State 13579',
      orderDate: '2024-01-13',
      notes: ''
    },
    {
      id: 'ORD-004',
      customerName: 'Emily Brown',
      customerEmail: 'emily@example.com',
      customerPhone: '+1 234 567 8903',
      status: 'delivered',
      total: 89.99,
      items: [{ id: 6, name: 'USB Cable', quantity: 3, price: 29.99 }],
      shippingAddress: '321 Elm St, City, State 24680',
      orderDate: '2024-01-12',
      notes: 'Leave at door if not home'
    }
  ];

  // Compute filtered orders inline (avoids useEffect infinite loop)
  const sourceOrders = orders.length > 0 ? orders : sampleOrders;
  let filteredOrders = sourceOrders;
  
  if (searchQuery) {
    filteredOrders = filteredOrders.filter(order =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  if (statusFilter !== 'all') {
    filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
  }



  // Using orders directly from Redux // Only depend on length, not the array itself

  

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return styles.statusPending;
      case 'processing': return styles.statusProcessing;
      case 'shipped': return styles.statusShipped;
      case 'delivered': return styles.statusDelivered;
      case 'cancelled': return styles.statusCancelled;
      default: return styles.statusDefault;
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    // TODO: Dispatch Redux action to update order status
    // dispatch(updateOrder({ id: orderId, status: newStatus }));
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
  };

  const deleteOrder = (orderId) => {
    Alert.alert(
      'Delete Order',
      'Are you sure you want to delete this order?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Dispatch Redux action to delete order
            // dispatch(deleteOrder(orderId));
            console.log(`Deleting order: ${orderId}`);
            
            if (selectedOrder && selectedOrder.id === orderId) {
              setCurrentView('list');
              setSelectedOrder(null);
            }
          }
        }
      ]
    );
  };

  const StatusFilterModal = () => (
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

  const OrderListView = () => {
    const renderOrderItem = ({ item }) => (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>{item.id}</Text>
            <View style={[styles.statusBadge, getStatusColor(item.status)]}>
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
              setSelectedOrder(item);
              setCurrentView('details');
            }}
          >
            <Text style={styles.actionButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => {
              setSelectedOrder(item);
              setCurrentView('edit');
            }}
          >
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => deleteOrder(item.id)}
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
          <Text style={styles.headerTitle}>Order Management</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setCurrentView('create')}
          >
            <Text style={styles.addButtonText}>+ New Order</Text>
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search orders..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{filteredOrders.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#f59e0b' }]}>
              {filteredOrders.filter(o => o.status === 'pending').length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#3b82f6' }]}>
              {filteredOrders.filter(o => o.status === 'processing').length}
            </Text>
            <Text style={styles.statLabel}>Processing</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#10b981' }]}>
              {filteredOrders.filter(o => o.status === 'delivered').length}
            </Text>
            <Text style={styles.statLabel}>Delivered</Text>
          </View>
        </View>

        {/* Orders List */}
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          style={styles.ordersList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No orders found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or filter criteria.
              </Text>
            </View>
          )}
        />

        <StatusFilterModal />
      </SafeAreaView>
    );
  };

  const OrderDetailsView = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentView('list')}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
        </View>
        <TouchableOpacity
          style={styles.editHeaderButton}
          onPress={() => setCurrentView('edit')}
        >
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

  const OrderFormView = () => {
    const [formData, setFormData] = useState(
      currentView === 'edit' && selectedOrder ? { ...selectedOrder } : {
        id: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        status: 'pending',
        total: 0,
        items: [{ id: Date.now(), name: '', quantity: 1, price: 0 }],
        shippingAddress: '',
        orderDate: new Date().toISOString().split('T')[0],
        notes: ''
      }
    );

    const handleSubmit = () => {
      if (currentView === 'edit') {
        // TODO: Dispatch Redux action to update order
        // dispatch(updateOrder(formData));
        console.log('Updating order:', formData);
      } else {
        // TODO: Dispatch Redux action to create order
        const newOrder = {
          ...formData,
          id: `ORD-${String(Date.now()).slice(-3)}`,
          total: formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
        // dispatch(createOrder(newOrder));
        console.log('Creating order:', newOrder);
      }
      setCurrentView('list');
    };

    const addItem = () => {
      setFormData({
        ...formData,
        items: [...formData.items, { id: Date.now(), name: '', quantity: 1, price: 0 }]
      });
    };

    const removeItem = (itemId) => {
      setFormData({
        ...formData,
        items: formData.items.filter(item => item.id !== itemId)
      });
    };

    const updateItem = (itemId, field, value) => {
      const updatedItems = formData.items.map(item =>
        item.id === itemId ? { 
          ...item, 
          [field]: field === 'quantity' || field === 'price' ? parseFloat(value) || 0 : value 
        } : item
      );
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
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentView('list')}
            >
              <Text style={styles.backButtonText}>← Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {currentView === 'edit' ? 'Edit Order' : 'Create Order'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit}
          >
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
              value={formData.customerName}
              onChangeText={(text) => setFormData({ ...formData, customerName: text })}
              placeholder="Enter customer name"
            />
            
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={formData.customerEmail}
              onChangeText={(text) => setFormData({ ...formData, customerEmail: text })}
              placeholder="Enter email address"
              keyboardType="email-address"
            />
            
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.textInput}
              value={formData.customerPhone}
              onChangeText={(text) => setFormData({ ...formData, customerPhone: text })}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
            
            <Text style={styles.inputLabel}>Shipping Address</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.shippingAddress}
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
              value={formData.orderDate}
              onChangeText={(text) => setFormData({ ...formData, orderDate: text })}
              placeholder="YYYY-MM-DD"
            />
            
            <Text style={styles.inputLabel}>Notes</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.notes}
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
                <Text style={styles.addItemButtonText}>+ Add Item</Text>
              </TouchableOpacity>
            </View>
            
            {formData.items.map((item, index) => (
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
                {formData.items.length > 1 && (
                  <TouchableOpacity
                    style={styles.removeItemButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Text style={styles.removeItemButtonText}>×</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            
            <View style={styles.totalFormRow}>
              <Text style={styles.totalFormLabel}>Total: ${formData.total.toFixed(2)}</Text>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498db',
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  editHeaderButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editHeaderButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
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
  searchInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginRight: 12,
  },
  filterButton: {
    backgroundColor: '#f9fafb',
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addItemButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
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
  removeItemButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
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
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default OrderManagementScreen;





// screens/inventory/InventoryScreen.js - Updated with Categories
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InventoryScreen = ({ navigation }) => {
  const inventory = useSelector((state) => state.inventory || { items: [] });
  const items = inventory.items || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Available categories
  const categories = [
    { id: 'all', name: 'All Items', icon: 'view-grid', count: items.length },
    {
      id: 'packaging',
      name: 'Packaging',
      icon: 'package-variant',
      count: items.filter((i) => i.category === 'packaging').length,
    },
    {
      id: 'equipment',
      name: 'Equipment',
      icon: 'tools',
      count: items.filter((i) => i.category === 'equipment').length,
    },
    {
      id: 'vehicles',
      name: 'Vehicles',
      icon: 'truck',
      count: items.filter((i) => i.category === 'vehicles').length,
    },
    {
      id: 'office',
      name: 'Office Supplies',
      icon: 'office-building',
      count: items.filter((i) => i.category === 'office').length,
    },
    {
      id: 'safety',
      name: 'Safety Gear',
      icon: 'shield-check',
      count: items.filter((i) => i.category === 'safety').length,
    },
  ];

  // Filter by category and search
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate stats
  const lowStockItems = items.filter(
    (item) => item.currentStock <= item.reorderLevel
  );
  const outOfStockItems = items.filter((item) => item.currentStock === 0);
  const totalValue = items.reduce(
    (sum, item) => sum + item.currentStock * (item.price || 0),
    0
  );

  const getStockStatus = (item) => {
    if (item.currentStock === 0) return { status: 'Out of Stock', color: '#EF4444' };
    if (item.currentStock <= item.reorderLevel)
      return { status: 'Low Stock', color: '#F59E0B' };
    return { status: 'In Stock', color: '#10B981' };
  };

  const renderCategoryItem = ({ item: category }) => {
    const isSelected = selectedCategory === category.id;

    return (
      <TouchableOpacity
        style={[styles.categoryItem, isSelected && styles.categoryItemSelected]}
        onPress={() => {
          setSelectedCategory(category.id);
          setShowCategoryModal(false);
        }}
      >
        <View style={styles.categoryLeft}>
          <View
            style={[
              styles.categoryIcon,
              isSelected && styles.categoryIconSelected,
            ]}
          >
            <Icon
              name={category.icon}
              size={24}
              color={isSelected ? '#2563EB' : '#6B7280'}
            />
          </View>
          <View>
            <Text
              style={[
                styles.categoryName,
                isSelected && styles.categoryNameSelected,
              ]}
            >
              {category.name}
            </Text>
            <Text style={styles.categoryCount}>{category.count} items</Text>
          </View>
        </View>
        {isSelected && <Icon name="check-circle" size={24} color="#2563EB" />}
      </TouchableOpacity>
    );
  };

  const renderInventoryItem = ({ item }) => {
    const stockStatus = getStockStatus(item);

    return (
      <TouchableOpacity
        style={styles.itemCard}
        onPress={() => navigation.navigate('InventoryDetails', { itemId: item.id })}
      >
        <View style={styles.itemHeader}>
          <View style={styles.itemLeft}>
            <View style={styles.itemIcon}>
              <Icon name="cube-outline" size={24} color="#6B7280" />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSKU}>SKU: {item.sku}</Text>
            </View>
          </View>
          <View
            style={[styles.statusBadge, { backgroundColor: stockStatus.color + '20' }]}
          >
            <Text style={[styles.statusText, { color: stockStatus.color }]}>
              {stockStatus.status}
            </Text>
          </View>
        </View>

        <View style={styles.itemDetails}>
          <View style={styles.detailItem}>
            <Icon name="package-variant" size={16} color="#6B7280" />
            <Text style={styles.detailText}>
              Stock: <Text style={styles.detailValue}>{item.currentStock}</Text> /{' '}
              {item.reorderLevel}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Icon name="map-marker" size={16} color="#6B7280" />
            <Text style={styles.detailText}>
              Location: <Text style={styles.detailValue}>{item.location}</Text>
            </Text>
          </View>

          {item.price && (
            <View style={styles.detailItem}>
              <Icon name="currency-usd" size={16} color="#6B7280" />
              <Text style={styles.detailText}>
                Value:{' '}
                <Text style={styles.detailValue}>
                  ₹{(item.currentStock * item.price).toFixed(2)}
                </Text>
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{items.length}</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#F59E0B' }]}>
            {lowStockItems.length}
          </Text>
          <Text style={styles.statLabel}>Low Stock</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#10B981' }]}>
            ₹{totalValue.toFixed(0)}
          </Text>
          <Text style={styles.statLabel}>Total Value</Text>
        </View>
      </View>

      {/* Category Selector & Search */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={styles.categorySelector}
          onPress={() => setShowCategoryModal(true)}
        >
          <Icon
            name={
              categories.find((c) => c.id === selectedCategory)?.icon ||
              'view-grid'
            }
            size={20}
            color="#2563EB"
          />
          <Text style={styles.categoryText}>
            {categories.find((c) => c.id === selectedCategory)?.name || 'All Items'}
          </Text>
          <Icon name="chevron-down" size={20} color="#6B7280" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Items List */}
      <FlatList
        data={filteredItems}
        renderItem={renderInventoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="cube-off-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No Items Found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your filters or search
            </Text>
          </View>
        }
      />

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCategoryModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                <Icon name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Add Item FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddInventoryItem')}
      >
        <Icon name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  filtersContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  categoryText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#2563EB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#111827',
  },
  listContent: {
    padding: 16,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  itemSKU: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  itemDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#6B7280',
  },
  detailValue: {
    fontWeight: '600',
    color: '#111827',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryItemSelected: {
    backgroundColor: '#EFF6FF',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIconSelected: {
    backgroundColor: '#DBEAFE',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  categoryNameSelected: {
    color: '#2563EB',
  },
  categoryCount: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default InventoryScreen;

import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useCart } from './CartContext';

export default function SalesManagementScreen() {
  const { sales, deleteSale } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const filteredSales = sales.filter(sale => 
    sale.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
   
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Sale",
      "Are you sure you want to delete this sale?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {
            deleteSale(id);
        }}
      ]
    );
  };

  const handleEdit = (item) => {
    Alert.alert("Edit Sale", `Edit functionality for ${item.product} (ID: ${item.id}) would go here.`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.rowHeader}>
        <Text style={styles.customer}>{item.customer}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.product}>{item.product}</Text>
      <View style={styles.rowFooter}>
        <Text style={styles.amount}>Tsh {parseInt(item.amount).toLocaleString()}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.btn, styles.editBtn]} onPress={() => handleEdit(item)}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.deleteBtn]} onPress={() => handleDelete(item.id)}>
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by customer or product..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredSales}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No sales found matching "{searchQuery}"</Text>}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  customer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  product: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  rowFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  actions: {
    flexDirection: 'row',
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  editBtn: {
    backgroundColor: '#007AFF',
  },
  deleteBtn: {
    backgroundColor: '#FF3B30',
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});
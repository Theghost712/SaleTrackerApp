import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from './CartContext';

export default function TrackOrderScreen({ navigation }) {
  const { orders } = useCart();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);
    return (
      <View style={styles.orderCard}>
        <View style={styles.headerRow}>
          <Text style={styles.date}>{item.date}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>{item.status}</Text>
          </View>
        </View>
        <Text style={styles.productName}>{item.product}</Text>
        <Text style={styles.price}>{item.price}</Text>
        {item.status === 'Out for Delivery' && (
          <TouchableOpacity 
            style={styles.trackButton}
            onPress={() => navigation.navigate('Map')}
          >
            <Text style={styles.trackButtonText}>Track Live on Map</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return { backgroundColor: '#E8F5E9', color: '#2E7D32' };
      case 'Cancelled': return { backgroundColor: '#FFEBEE', color: '#C62828' };
      case 'Out for Delivery': return { backgroundColor: '#E3F2FD', color: '#1565C0' };
      default: return { backgroundColor: '#F5F5F5', color: '#616161' };
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listContent: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#868E96',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 4,
  },
  trackButton: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
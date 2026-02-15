import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useCart } from './CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity, checkout } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items before checking out.');
      return;
    }
    checkout();
    Alert.alert('Success', 'Order placed successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('TrackOrder') }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.qtyButton}><Text style={styles.qtyButtonText}>-</Text></TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity || 1}</Text>
        <TouchableOpacity onPress={() => addToCart(item)} style={styles.qtyButton}><Text style={styles.qtyButtonText}>+</Text></TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => item.id + index}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty.</Text>}
      />
      
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Checkout ({cartItems.length} items)</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  qtyButton: {
    backgroundColor: '#E0E0E0',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  removeButton: {
    padding: 8,
  },
  removeText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
    fontSize: 16,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
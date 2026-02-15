import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useCart } from './CartContext';

export default function ProductListScreen({ navigation, route }) {
  const { addToCart, products, deleteProduct } = useCart();
  const isAdmin = route.params?.isAdmin;

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={() => navigation.navigate('ProductDetails', { product: item, isAdmin })}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      {isAdmin ? (
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: '#FF3B30' }]}
          onPress={() => {
            deleteProduct(item.id);
            Alert.alert('Deleted', `${item.name} has been removed.`);
          }}
        >
          <Text style={styles.addButtonText}>Delete</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            addToCart(item);
            Alert.alert('Success', `${item.name} added to cart!`);
          }}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  itemInfo: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

export default function CustomerHomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
      <Text style={styles.header}>Welcome, Customer!</Text>
      
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TrackOrder')}>
        <Text style={styles.cardTitle}>Track Order</Text>
        <Text style={styles.cardContent}>View your active and past orders.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductList')}>
        <Text style={styles.buttonText}>Browse Products</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.cartButton]} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.buttonText}>View Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  cardContent: {
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cartButton: {
    backgroundColor: '#FF9500',
    marginTop: 15,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    marginTop: 15,
  },
});
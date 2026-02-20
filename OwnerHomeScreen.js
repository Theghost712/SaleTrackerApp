import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function SellerHomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Admin Dashboard</Text>
        <Text style={styles.subHeader}>Overview of your business performance</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total Sales Today</Text>
          <Text style={styles.cardValue}>Tsh 3,125,000</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Sales This Month</Text>
          <Text style={styles.cardValue}>Tsh 113,300,000</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Products Sold</Text>
          <Text style={styles.cardValue}>342</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total Revenue</Text>
          <Text style={styles.cardValue}>Tsh 850,000,000</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Online Sales</Text>
            <Text style={styles.rowValue}>Tsh 80,000,000</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>In-Store Sales</Text>
            <Text style={styles.rowValue}>Tsh 33,300,000</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('SalesManagement')}>
          <Text style={styles.actionButtonText}>Manage Sales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.productButton]} onPress={() => navigation.navigate('ProductList', { isAdmin: true })}>
          <Text style={styles.actionButtonText}>Manage Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.reportButton]} onPress={() => navigation.navigate('Reports')}>
          <Text style={styles.actionButtonText}>View Reports</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowLabel: {
    fontSize: 16,
    color: '#333',
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 5,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  productButton: {
    backgroundColor: '#5856D6',
  },
  reportButton: {
    backgroundColor: '#FF9500',
  },
});
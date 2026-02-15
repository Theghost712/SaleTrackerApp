import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function ReportsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Financial Reports</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Report (Today)</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Gross Sales</Text>
            <Text style={styles.value}>Tsh 3,125,000</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Net Sales</Text>
            <Text style={styles.value}>Tsh 2,800,000</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transactions</Text>
            <Text style={styles.value}>45</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Report (Current Month)</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Gross Sales</Text>
            <Text style={styles.value}>Tsh 113,300,000</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Net Sales</Text>
            <Text style={styles.value}>Tsh 98,500,000</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Orders</Text>
            <Text style={styles.value}>1,250</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total Revenue</Text>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Lifetime Revenue</Text>
          <Text style={styles.totalValue}>Tsh 850,000,000</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalCard: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  totalLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginBottom: 5,
  },
  totalValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useCart } from "./CartContext";

export default function ReportsScreen() {
  const { dailySales, transactions } = useCart();

 
  const today = new Date().toISOString().split("T")[0];
  const todaySales = dailySales.find((d) => d.date === today) || {
    total: "0",
    transactions: 0,
  };
  const totalRevenue = dailySales.reduce(
    (sum, day) => sum + parseInt(day.total || "0"),
    0,
  );
  const totalTransactions = transactions.length;

  
  const avgTransactionValue =
    totalTransactions > 0 ? Math.round(totalRevenue / totalTransactions) : 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Business Reports</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Summary</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Sales Today</Text>
            <Text style={styles.value}>
              Tsh {parseInt(todaySales.total).toLocaleString()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transactions Today</Text>
            <Text style={styles.value}>{todaySales.transactions}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overall Performance</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Total Revenue</Text>
            <Text style={styles.value}>
              Tsh {totalRevenue.toLocaleString()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Transactions</Text>
            <Text style={styles.value}>{totalTransactions}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Avg. Transaction Value</Text>
            <Text style={styles.value}>
              Tsh {avgTransactionValue.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Breakdown</Text>
        {dailySales.map((day, index) => (
          <View key={index} style={styles.dailyCard}>
            <View style={styles.dailyHeader}>
              <Text style={styles.dailyDate}>{day.date}</Text>
              <Text style={styles.dailyTransactions}>
                {day.transactions} transactions
              </Text>
            </View>
            <Text style={styles.dailyTotal}>
              Tsh {parseInt(day.total).toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  dailyCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  dailyHeader: {
    flex: 1,
  },
  dailyDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  dailyTransactions: {
    fontSize: 12,
    color: "#999",
  },
  dailyTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
});

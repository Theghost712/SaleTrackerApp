import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Reports</Text>
          <Text style={styles.headerSubtitle}>Business analytics</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <View style={styles.card}>
            <View style={styles.statRow}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>💰</Text>
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>Sales Today</Text>
                <Text style={styles.statValue}>
                  Tsh {parseInt(todaySales.total).toLocaleString()}
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.statRow}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>📋</Text>
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>Transactions Today</Text>
                <Text style={styles.statValue}>{todaySales.transactions}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Performance</Text>
          <View style={styles.card}>
            <View style={styles.statRow}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>🏦</Text>
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>Total Revenue</Text>
                <Text style={styles.statValue}>
                  Tsh {totalRevenue.toLocaleString()}
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.statRow}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>📊</Text>
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>Total Transactions</Text>
                <Text style={styles.statValue}>{totalTransactions}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.statRow}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>📈</Text>
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>Avg. Transaction Value</Text>
                <Text style={styles.statValue}>
                  Tsh {avgTransactionValue.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Breakdown</Text>
          {dailySales.map((day, index) => (
            <View key={index} style={styles.dailyCard}>
              <View style={styles.dailyLeft}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0F9FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  statIcon: {
    fontSize: 24,
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 8,
  },
  dailyCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  dailyLeft: {
    flex: 1,
  },
  dailyDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  dailyTransactions: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  dailyTotal: {
    fontSize: 20,
    fontWeight: "700",
    color: "#007AFF",
  },
});

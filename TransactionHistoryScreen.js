import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useCart } from "./CartContext";

export default function TransactionHistoryScreen({ navigation }) {
  const { transactions } = useCart();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.cardHeader}>
        <View style={styles.idContainer}>
          <Text style={styles.transactionId}>{item.id}</Text>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.cashierRow}>
        <Text style={styles.cashierLabel}>Cashier</Text>
        <Text style={styles.cashierName}>{item.cashier}</Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Items</Text>
          <Text style={styles.detailValue}>{item.items}</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Payment</Text>
          <Text style={styles.detailValue}>{item.paymentMethod}</Text>
        </View>
      </View>

      {item.amountPaid && (
        <View style={styles.changeRow}>
          <Text style={styles.changeLabel}>Change</Text>
          <Text style={styles.changeValue}>
            Tsh {parseInt(item.change).toLocaleString()}
          </Text>
        </View>
      )}

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>
          Tsh {parseInt(item.total).toLocaleString()}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Transactions</Text>
          <Text style={styles.headerSubtitle}>
            {transactions.length} records
          </Text>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>📭</Text>
              <Text style={styles.emptyText}>No transactions found</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
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
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  transactionCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  idContainer: {
    backgroundColor: "#E8F2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  transactionId: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
  date: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  cashierRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cashierLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  cashierName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#F8F9FA",
    padding: 12,
    borderRadius: 16,
  },
  detailItem: {
    alignItems: "center",
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  detailDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E5E7EB",
  },
  changeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  changeLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  changeValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#10B981",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#007AFF",
    letterSpacing: -0.5,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
  },
});

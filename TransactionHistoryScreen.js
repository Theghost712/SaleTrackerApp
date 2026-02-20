import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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
      <View style={styles.headerRow}>
        <Text style={styles.transactionId}>{item.id}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.cashier}>Cashier: {item.cashier}</Text>
        <Text style={styles.items}>{item.items} items</Text>
      </View>
      <View style={styles.footerRow}>
        <View>
          <Text style={styles.paymentMethod}>{item.paymentMethod}</Text>
          {item.amountPaid && (
            <Text style={styles.change}>
              Change: Tsh {parseInt(item.change).toLocaleString()}
            </Text>
          )}
        </View>
        <Text style={styles.total}>
          Tsh {parseInt(item.total).toLocaleString()}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  listContent: {
    padding: 16,
  },
  transactionCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  transactionId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  date: {
    fontSize: 12,
    color: "#868E96",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cashier: {
    fontSize: 14,
    color: "#495057",
  },
  items: {
    fontSize: 14,
    color: "#495057",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
  },
  paymentMethod: {
    fontSize: 14,
    color: "#28a745",
    fontWeight: "600",
    marginBottom: 4,
  },
  change: {
    fontSize: 12,
    color: "#868E96",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
    fontSize: 16,
  },
});

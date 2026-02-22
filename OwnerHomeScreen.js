import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useCart } from "./CartContext"; // <-- ADD THIS IMPORT

export default function SellerHomeScreen({ navigation }) {
  const { transactions } = useCart(); // <-- GET TRANSACTIONS FROM CONTEXT

  // Helper to get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Helper to get current year-month (YYYY-MM) for monthly filter
  const currentYearMonth = today.slice(0, 7); // e.g., "2026-02"

  // Compute today's total sales
  const todayTotal = transactions
    .filter((t) => t.date === today)
    .reduce((sum, t) => sum + parseInt(t.total || "0"), 0);

  // Compute monthly total sales
  const monthTotal = transactions
    .filter((t) => t.date.startsWith(currentYearMonth))
    .reduce((sum, t) => sum + parseInt(t.total || "0"), 0);

  // Compute total products sold (sum of item counts across all transactions)
  const totalProductsSold = transactions.reduce(
    (sum, t) => sum + (t.items || 0),
    0,
  );

  // Compute overall revenue (sum of all transaction totals)
  const totalRevenue = transactions.reduce(
    (sum, t) => sum + parseInt(t.total || "0"),
    0,
  );

  // Format numbers with commas as thousand separators
  const formatNumber = (num) => num.toLocaleString();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.header}>Admin</Text>
          <Text style={styles.subHeader}>Here's your business overview</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={[styles.card, styles.halfCard]}>
              <View style={styles.cardIconContainer}>
                <Text style={styles.cardIcon}>💰</Text>
              </View>
              <Text style={styles.cardLabel}>Today's Sales</Text>
              <Text style={styles.cardValue}>
                Tsh {formatNumber(todayTotal)}
              </Text>
            </View>
            <View style={[styles.card, styles.halfCard]}>
              <View style={styles.cardIconContainer}>
                <Text style={styles.cardIcon}>📈</Text>
              </View>
              <Text style={styles.cardLabel}>Month Sales</Text>
              <Text style={styles.cardValue}>
                Tsh {formatNumber(monthTotal)}
              </Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={[styles.card, styles.halfCard]}>
              <View style={styles.cardIconContainer}>
                <Text style={styles.cardIcon}>📦</Text>
              </View>
              <Text style={styles.cardLabel}>Products Sold</Text>
              <Text style={styles.cardValue}>
                {formatNumber(totalProductsSold)}
              </Text>
            </View>
            <View style={[styles.card, styles.halfCard]}>
              <View style={styles.cardIconContainer}>
                <Text style={styles.cardIcon}>🏦</Text>
              </View>
              <Text style={styles.cardLabel}>Total Revenue</Text>
              <Text style={styles.cardValue}>
                Tsh {formatNumber(totalRevenue)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>In-Store Sales</Text>
                <Text style={styles.summaryValue}>
                  Tsh {formatNumber(Math.round(totalRevenue * 0.3))}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate("SalesManagement")}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.actionIconContainer,
                  { backgroundColor: "#E8F2FF" },
                ]}
              >
                <Text style={styles.actionIcon}>📊</Text>
              </View>
              <Text style={styles.actionTitle}>Manage Sales</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() =>
                navigation.navigate("ProductList", { isAdmin: true })
              }
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.actionIconContainer,
                  { backgroundColor: "#F0E8FF" },
                ]}
              >
                <Text style={styles.actionIcon}>📦</Text>
              </View>
              <Text style={styles.actionTitle}>Manage Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate("AddProduct")}
            >
              <View
                style={[
                  styles.actionIconContainer,
                  { backgroundColor: "#E8F7E8" },
                ]}
              >
                <Text style={styles.actionIcon}>➕</Text>
              </View>
              <Text style={styles.actionTitle}>Add Product</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate("Reports")}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.actionIconContainer,
                  { backgroundColor: "#FFF4E5" },
                ]}
              >
                <Text style={styles.actionIcon}>📈</Text>
              </View>
              <Text style={styles.actionTitle}>View Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: "Login" }] })
          }
          activeOpacity={0.8}
        >
          <Text style={styles.logoutIcon}>↪️</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles remain exactly the same as before (no changes needed)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  header: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 14,
    color: "#6B7280",
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  halfCard: {
    width: "48%",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0F9FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1A1A1A",
  },
  summaryCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E7EB",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "center",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  logoutText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
});

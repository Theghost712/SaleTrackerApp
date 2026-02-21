import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useCart } from "./CartContext";

export default function CashierHomeScreen({ navigation }) {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop",
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.header}>Cashier</Text>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.statsIconContainer}>
              <Text style={styles.statsIcon}>🛒</Text>
            </View>
            <Text style={styles.statsLabel}>Current Transaction</Text>
            <Text style={styles.statsValue}>{itemCount}</Text>
            <Text style={styles.statsUnit}>items</Text>
          </View>

          <View style={styles.gridContainer}>
            <TouchableOpacity
              style={[styles.card, styles.gridItem]}
              onPress={() =>
                navigation.navigate("ProductList", { isAdmin: false })
              }
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.cardIconContainer,
                  { backgroundColor: "#E8F2FF" },
                ]}
              >
                <Text style={styles.cardIcon}>🛍️</Text>
              </View>
              <Text style={styles.cardTitle}>Browse</Text>
              <Text style={styles.cardSubtitle}>Products</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, styles.gridItem, styles.cartCard]}
              onPress={() => navigation.navigate("Cart")}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.cardIconContainer,
                  { backgroundColor: "#E8F7E8" },
                ]}
              >
                <Text style={styles.cardIcon}>🛒</Text>
                {itemCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{itemCount}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardTitle}>Cart</Text>
              <Text style={styles.cardSubtitle}>Checkout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, styles.gridItem, styles.historyCard]}
              onPress={() => navigation.navigate("TransactionHistory")}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.cardIconContainer,
                  { backgroundColor: "#FFF4E5" },
                ]}
              >
                <Text style={styles.cardIcon}>📜</Text>
              </View>
              <Text style={styles.cardTitle}>History</Text>
              <Text style={styles.cardSubtitle}>Transactions</Text>
            </TouchableOpacity>
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
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
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
  },
  statsCard: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 28,
    marginBottom: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  statsIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F0F9FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statsIcon: {
    fontSize: 28,
  },
  statsLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statsValue: {
    fontSize: 48,
    fontWeight: "700",
    color: "#1A1A1A",
    lineHeight: 52,
  },
  statsUnit: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  gridItem: {
    width: "48%",
    marginBottom: 16,
    alignItems: "center",
    padding: 20,
  },
  cardIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
  },
  cardIcon: {
    fontSize: 28,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FF3B30",
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#1A1A1A",
  },
  cardSubtitle: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
  },
  cartCard: {},
  historyCard: {},
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 10,
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

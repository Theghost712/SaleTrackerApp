import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
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
      <View style={styles.container}>
        <Text style={styles.header}>POS Cashier</Text>

        <View style={styles.statsCard}>
          <Text style={styles.statsLabel}>Current Transaction</Text>
          <Text style={styles.statsValue}>{itemCount} items</Text>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity
            style={[styles.card, styles.gridItem]}
            onPress={() => navigation.navigate("ProductList", { isAdmin: false })}
          >
            <Text style={styles.cardEmoji}>🛍️</Text>
            <Text style={styles.cardTitle}>Browse</Text>
            <Text style={styles.cardContent}>Products</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.gridItem, styles.cartCard]}
            onPress={() => navigation.navigate("Cart")}
          >
            <Text style={styles.cardEmoji}>🛒</Text>
            <Text style={styles.cardTitle}>Cart ({itemCount})</Text>
            <Text style={styles.cardContent}>Checkout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.gridItem, styles.historyCard]}
            onPress={() => navigation.navigate("TransactionHistory")}
          >
            <Text style={styles.cardEmoji}>📜</Text>
            <Text style={styles.cardTitle}>History</Text>
            <Text style={styles.cardContent}>Transactions</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: "Login" }] })
          }
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(245, 245, 245, 0.9)",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  statsCard: {
    backgroundColor: "#007AFF", 
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statsLabel: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statsValue: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridItem: {
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    paddingVertical: 25,
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  cardContent: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
  },
  cartCard: {},
  historyCard: {},
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    marginTop: 20,
  },
});

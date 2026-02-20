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

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ProductList", { isAdmin: false })}
        >
          <Text style={styles.cardTitle}>Browse Products</Text>
          <Text style={styles.cardContent}>
            Add items to current transaction
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cartCard]}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.cardTitle}>View Cart ({itemCount})</Text>
          <Text style={styles.cardContent}>Review items and checkout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.historyCard]}
          onPress={() => navigation.navigate("TransactionHistory")}
        >
          <Text style={styles.cardTitle}>Transaction History</Text>
          <Text style={styles.cardContent}>View past transactions</Text>
        </TouchableOpacity>

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
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  statsLabel: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    marginBottom: 5,
  },
  statsValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  cardContent: {
    color: "#666",
  },
  cartCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#FF9500",
  },
  historyCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#5856D6",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
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

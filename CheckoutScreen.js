import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { useCart } from "./CartContext";

export default function CheckoutScreen({ navigation }) {
  const { cartItems, calculateTotal, completeTransaction } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amountPaid, setAmountPaid] = useState("");

  const total = calculateTotal();
  const change = amountPaid ? parseInt(amountPaid) - total : 0;

  const handlePayment = () => {
    if (cartItems.length === 0) {
      Alert.alert("Error", "No items in cart");
      return;
    }

    if (
      paymentMethod === "Cash" &&
      (!amountPaid || parseInt(amountPaid) < total)
    ) {
      Alert.alert("Error", "Insufficient payment amount");
      return;
    }

    const transaction = completeTransaction(
      paymentMethod,
      amountPaid,
      change > 0 ? change : 0,
    );

    Alert.alert(
      "Success",
      `Transaction complete!\nChange: Tsh ${change > 0 ? change : 0}`,
      [{ text: "OK", onPress: () => navigation.navigate("CashierHome") }],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemName}>
              {item.name} x{item.quantity}
            </Text>
            <Text style={styles.itemPrice}>
              Tsh{" "}
              {(parseInt(item.price) * (item.quantity || 1)).toLocaleString()}
            </Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>Tsh {total.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethods}>
          {["Cash", "Card", "Mobile Money"].map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.paymentButton,
                paymentMethod === method && styles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod(method)}
            >
              <Text
                style={[
                  styles.paymentButtonText,
                  paymentMethod === method && styles.selectedPaymentText,
                ]}
              >
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {paymentMethod === "Cash" && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cash Payment</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount Paid"
            value={amountPaid}
            onChangeText={setAmountPaid}
            keyboardType="numeric"
          />
          {amountPaid ? (
            <View style={styles.changeRow}>
              <Text style={styles.changeLabel}>Change:</Text>
              <Text
                style={[
                  styles.changeAmount,
                  change >= 0 ? styles.positive : styles.negative,
                ]}
              >
                Tsh {change >= 0 ? change : 0}
              </Text>
            </View>
          ) : null}
        </View>
      )}

      <TouchableOpacity style={styles.checkoutButton} onPress={handlePayment}>
        <Text style={styles.checkoutButtonText}>Complete Transaction</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemName: {
    fontSize: 14,
    color: "#666",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  paymentButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedPayment: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  paymentButtonText: {
    color: "#333",
  },
  selectedPaymentText: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  changeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  changeLabel: {
    fontSize: 16,
    color: "#666",
  },
  changeAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  positive: {
    color: "#28a745",
  },
  negative: {
    color: "#dc3545",
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    margin: 15,
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

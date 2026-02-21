import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  SafeAreaView,
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Checkout</Text>
          <Text style={styles.headerSubtitle}>Review your order</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <Text style={styles.sectionCount}>{cartItems.length} items</Text>
          </View>
          <View style={styles.card}>
            {cartItems.map((item, index) => (
              <View key={item.id}>
                <View style={styles.itemRow}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemQuantity}>
                      Qty: {item.quantity}
                    </Text>
                  </View>
                  <Text style={styles.itemPrice}>
                    Tsh{" "}
                    {(
                      parseInt(item.price) * (item.quantity || 1)
                    ).toLocaleString()}
                  </Text>
                </View>
                {index < cartItems.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>
                Tsh {total.toLocaleString()}
              </Text>
            </View>
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
                activeOpacity={0.7}
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
            <View style={styles.card}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Amount Paid</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter amount"
                  placeholderTextColor="#9CA3AF"
                  value={amountPaid}
                  onChangeText={setAmountPaid}
                  keyboardType="numeric"
                />
              </View>

              {amountPaid ? (
                <View style={styles.changeContainer}>
                  <View style={styles.changeRow}>
                    <Text style={styles.changeLabel}>Change</Text>
                    <Text
                      style={[
                        styles.changeAmount,
                        change >= 0 ? styles.positive : styles.negative,
                      ]}
                    >
                      Tsh {change >= 0 ? change.toLocaleString() : 0}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handlePayment}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutButtonText}>Complete Transaction</Text>
        </TouchableOpacity>
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
  },
  header: {
    paddingHorizontal: 24,
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
  section: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  sectionCount: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
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
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 13,
    color: "#6B7280",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: "#F0F0F0",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#007AFF",
    letterSpacing: -0.5,
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  paymentButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  selectedPayment: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  paymentButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },
  selectedPaymentText: {
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    color: "#1A1A1A",
  },
  changeContainer: {
    backgroundColor: "#F0F9FF",
    borderRadius: 16,
    padding: 16,
  },
  changeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changeLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
  },
  changeAmount: {
    fontSize: 20,
    fontWeight: "700",
  },
  positive: {
    color: "#10B981",
  },
  negative: {
    color: "#EF4444",
  },
  checkoutButton: {
    backgroundColor: "#10B981",
    marginHorizontal: 24,
    marginBottom: 40,
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

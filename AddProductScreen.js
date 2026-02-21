import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useCart } from "./CartContext";

export default function AddProductScreen({ navigation }) {
  const { addProduct } = useCart();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [barcode, setBarcode] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = () => {
    if (!name || !price || !category) {
      Alert.alert(
        "Error",
        "Please fill in all required fields (Name, Price, Category)",
      );
      return;
    }

    // Basic validation for price (must be a number)
    if (isNaN(Number(price))) {
      Alert.alert("Error", "Price must be a number");
      return;
    }

    // Use a default image if the user doesn't provide one
    const productImage =
      image ||
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200";

    const newProduct = {
      name: name,
      price: price, // Keep as string for consistency with existing data
      category: category,
      barcode: barcode || `MANUAL${Date.now()}`, // Generate a simple barcode if not provided
      image: productImage,
    };

    addProduct(newProduct);
    Alert.alert("Success", "Product added successfully!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add Product</Text>
          <Text style={styles.headerSubtitle}>Fill in the product details</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>
            Product Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Milk 1L"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>
            Price (Tsh) <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 4500"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <Text style={styles.label}>
            Category <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Dairy"
            value={category}
            onChangeText={setCategory}
          />

          <Text style={styles.label}>Barcode (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Scan or enter barcode"
            value={barcode}
            onChangeText={setBarcode}
          />

          <Text style={styles.label}>Image URL (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="https://example.com/image.jpg"
            value={image}
            onChangeText={setImage}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Product</Text>
          </TouchableOpacity>
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
  form: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 8,
    marginTop: 16,
  },
  required: {
    color: "#FF3B30",
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#1A1A1A",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 32,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

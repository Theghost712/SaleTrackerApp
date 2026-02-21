import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { useCart } from "./CartContext";

export default function ProductDetailsScreen({ route, navigation }) {
  const { product, isAdmin } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert("Success", `${product.name} added to cart!`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{product.name}</Text>
            <View style={styles.priceTag}>
              <Text style={styles.price}>{product.price}</Text>
            </View>
          </View>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {product.category || "General"}
            </Text>
          </View>

          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>
            This is a high-quality {product.name}. It features state-of-the-art
            technology and is built to last. Perfect for your daily needs.
          </Text>

          {!isAdmin && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonIcon}>🛒</Text>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    flex: 1,
    letterSpacing: -0.5,
  },
  priceTag: {
    backgroundColor: "#E8F2FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },
  price: {
    fontSize: 20,
    color: "#007AFF",
    fontWeight: "700",
  },
  categoryBadge: {
    backgroundColor: "#F3F4F6",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "500",
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonIcon: {
    fontSize: 20,
    color: "#fff",
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

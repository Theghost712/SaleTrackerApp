import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./Validationschema";
import { ValidatedInput } from "./Inputvalidation";
import { useCart } from "./CartContext";

export default function RegisterScreen({ navigation }) {
  const { users, registerUser } = useCart();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [logoPressCount, setLogoPressCount] = useState(0);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Secret admin mode - tap logo 5 times
  const handleLogoPress = () => {
    const newCount = logoPressCount + 1;
    setLogoPressCount(newCount);

    if (newCount === 5) {
      // Reset counter and toggle admin mode
      setLogoPressCount(0);
      setIsAdminMode(!isAdminMode);

      Alert.alert(
        "🎭 Admin Mode",
        `Admin registration is now ${!isAdminMode ? "ENABLED" : "DISABLED"}`,
        [{ text: "OK" }],
      );
    } else if (newCount === 3) {
      // Hint after 3 taps
      Alert.alert("💡 Hint", `${5 - newCount} more taps for secret mode`);
    }
  };

  const onSubmit = (data) => {
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (emailExists) {
      Alert.alert("Registration Failed", `${data.email} already exists`);
      return;
    }

    registerUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: isAdminMode ? "admin" : "cashier",
    });

    console.log("Registration data:", data);
    console.log("Registered as:", isAdminMode ? "ADMIN" : "cashier");

    Alert.alert(
      "✅ Success",
      `Account created successfully as ${isAdminMode ? "ADMIN" : "cashier"}!`,
      [{ text: "OK", onPress: () => navigation.navigate("Login") }],
    );
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop",
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={handleLogoPress}
              activeOpacity={0.7}
              delayPressIn={100} // Small delay to prevent accidental triggers
            >
              <Text style={styles.logo}>📝</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join SalesTracker today</Text>
            {isAdminMode && (
              <View style={styles.adminBadge}>
                <Text style={styles.adminBadgeText}>👑 ADMIN MODE ACTIVE</Text>
              </View>
            )}
          </View>

          <View
            style={[
              styles.formContainer,
              isAdminMode && styles.adminFormContainer,
            ]}
          >
            <ValidatedInput
              control={control}
              name="fullName"
              placeholder="Full Name"
            />

            <ValidatedInput
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <ValidatedInput
              control={control}
              name="password"
              placeholder="Password"
              secureTextEntry
            />

            <ValidatedInput
              control={control}
              name="confirmPassword"
              placeholder="Confirm Password"
              secureTextEntry
            />

            <TouchableOpacity
              style={[styles.button, isAdminMode && styles.adminButton]}
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {isAdminMode ? "👑 Register as Admin" : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.linkText}>
                Already have an account? Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
  },
  container: {
    padding: 30,
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 8,
  },
  adminBadge: {
    backgroundColor: "#FBBF24",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  adminBadgeText: {
    color: "#92400E",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
  },
  adminFormContainer: {
    borderWidth: 2,
    borderColor: "#FBBF24",
    shadowColor: "#FBBF24",
    shadowOpacity: 0.2,
  },
  button: {
    backgroundColor: "#10B981",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  adminButton: {
    backgroundColor: "#92400E",
    shadowColor: "#92400E",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  linkText: {
    color: "#007AFF",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
});

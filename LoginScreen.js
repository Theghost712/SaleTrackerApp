import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";

import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./Validationschema";
import { ValidatedInput } from "./Inputvalidation";
import { useCart } from "./CartContext";

export default function AuthScreen({ navigation }) {
  const { users } = useCart();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => {
    console.log(data);

    const targetScreen = data.email.toLowerCase().includes("admin")
      ? "OwnerHome"
      : "CashierHome";

    Alert.alert("Success", "Login Successful!", [
      { text: "OK", onPress: () => navigation.navigate(targetScreen) },
    ]);
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
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>📊</Text>
            </View>
            <Text style={styles.appTitle}>SalesTracker</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.formContainer}>
            <ValidatedInput
              control={control}
              name="email"
              placeholder="Email Address"
              keyboardType="email-address"
            />
            <ValidatedInput
              control={control}
              name="password"
              placeholder="Password"
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.outlineButton}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.outlineButtonText}>Create Account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.outlineButton}
                onPress={() =>
                  Alert.alert("Info", "Password reset feature coming soon")
                }
              >
                <Text style={styles.outlineButtonText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#007AFF",
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
  formContainer: {
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  outlineButton: {
    borderColor: "#fff",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
  },
  outlineButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

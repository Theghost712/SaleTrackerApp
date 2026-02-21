import React from "react";
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
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

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
      role: "cashier",
    });

    console.log(data);
    Alert.alert("Success", "Account created successfully!", [
      { text: "OK", onPress: () => navigation.navigate("Login") },
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
              <Text style={styles.logo}>📝</Text>
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join SalesTracker today</Text>
          </View>

          <View style={styles.formContainer}>
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
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
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

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
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

    // Check if user exists in the registered users
    const user = users?.find(
      (u) =>
        u.email?.toLowerCase() === data.email?.toLowerCase() &&
        u.password === data.password,
    );

    if (user) {
      // User exists - allow login
      const targetScreen = user.role === "admin" ? "OwnerHome" : "CashierHome";
      Alert.alert("Success", "Login Successful!", [
        { text: "OK", onPress: () => navigation.navigate(targetScreen) },
      ]);
    } else {
      // User doesn't exist or credentials don't match - prevent login
      Alert.alert(
        "Login Failed",
        "Invalid email or password. Please register if you don't have an account.",
        [
          {
            text: "Register",
            onPress: () => navigation.navigate("Register"),
          },
          {
            text: "Try Again",
            style: "cancel",
          },
        ],
      );
    }
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
    marginBottom: 40,
    alignItems: "center",
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    fontSize: 40,
  },
  appTitle: {
    fontSize: 34,
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
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  outlineButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  outlineButtonText: {
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});

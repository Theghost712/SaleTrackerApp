import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CashierHomeScreen from "./CashierHomeScreen";
import ProductListScreen from "./ProductListScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import OwnerHomeScreen from "./OwnerHomeScreen";
import SalesManagementScreen from "./SalesManagementScreen";
import ReportsScreen from "./ReportsScreen";
import TransactionHistoryScreen from "./TransactionHistoryScreen";
import CheckoutScreen from "./CheckoutScreen";
import ProductDetailsScreen from "./ProductDetailsScreen";
import CartScreen from "./CartScreen";
import { CartProvider } from "./CartContext";
import AddProductScreen from "./AddProductScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: "#007AFF" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Register" }}
          />
          <Stack.Screen
            name="CashierHome"
            component={CashierHomeScreen}
            options={{ title: "POS Cashier" }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: "Current Transaction" }}
          />
          <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{ title: "Checkout" }}
          />
          <Stack.Screen
            name="TransactionHistory"
            component={TransactionHistoryScreen}
            options={{ title: "Transactions" }}
          />
          <Stack.Screen
            name="OwnerHome"
            component={OwnerHomeScreen}
            options={{ title: "Business Owner" }}
          />
          <Stack.Screen
            name="SalesManagement"
            component={SalesManagementScreen}
            options={{ title: "Sales Management" }}
          />
          <Stack.Screen
            name="Reports"
            component={ReportsScreen}
            options={{ title: "Business Reports" }}
          />
          <Stack.Screen
            name="ProductList"
            component={ProductListScreen}
            options={{ title: "Products" }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: "Product Details" }}
          />

          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{ title: "Add New Product" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

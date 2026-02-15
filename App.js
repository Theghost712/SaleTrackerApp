import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerHomeScreen from './CustomerHomeScreen';
import ProductListScreen from './ProductListScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import SellerHomeScreen from './SellerHomeScreen';
import SalesManagementScreen from './SalesManagementScreen';
import ReportsScreen from './ReportsScreen';
import TrackOrderScreen from './TrackOrderScreen';
import MapScreen from './MapScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import CartScreen from './CartScreen';
import { CartProvider } from './CartContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="CustomerHome" component={CustomerHomeScreen} options={{ title: 'Customer Dashboard' }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'My Cart' }} />
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} options={{ title: 'My Orders' }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Live Tracking' }} />
        <Stack.Screen name="SellerHome" component={SellerHomeScreen} options={{ title: 'Admin Dashboard' }} />
        <Stack.Screen name="SalesManagement" component={SalesManagementScreen} options={{ title: 'Manage Sales' }} />
        <Stack.Screen name="Reports" component={ReportsScreen} options={{ title: 'Reports' }} />
        <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Products' }} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}

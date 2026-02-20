import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './Validationschema';
import { ValidatedInput } from './Inputvalidation';
import { useCart } from './CartContext';

export default function RegisterScreen({ navigation }) {
  const { users, registerUser } = useCart();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data) => {
    const emailExists = users.some(user => user.email.toLowerCase() === data.email.toLowerCase());
    
    if (emailExists) {
      Alert.alert('Registration Failed', `${data.email} already exists`);
      return;
    }

    registerUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: 'cashier' // Default role for new registrations
    });

    console.log(data);
    Alert.alert('Success', 'Account created successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('Login') }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 14,
  },
});
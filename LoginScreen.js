import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './Validationschema'; 
import { ValidatedInput } from './Inputvalidation';

export default function AuthScreen({ navigation }) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema), 
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = (data) => {
    console.log(data);
    
    
    const targetScreen = data.email.toLowerCase().includes('admin') ? 'OwnerHome' : 'CashierHome';

    Alert.alert("Success", "Login Successful!", [
      { text: "OK", onPress: () => navigation.navigate(targetScreen) }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.appTitle}>SaleTracker</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>
      <ValidatedInput 
        control={control} 
        name="email" 
        placeholder="Email Address" 
        keyboardType="email-address"
      />
      <ValidatedInput control={control} name="password" placeholder="Password" secureTextEntry />
      
      <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.primaryButtonText}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity 
          style={[styles.outlineButton, styles.halfWidth]} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.outlineButtonText}>Register</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.outlineButton, styles.halfWidth]} 
          onPress={() => Alert.alert('Info', 'Password reset feature coming soon')}
        >
          <Text style={styles.outlineButtonText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 30, 
    justifyContent: 'center', 
    backgroundColor: '#fff' 
  },
  headerContainer: { marginBottom: 40, alignItems: 'center' },
  appTitle: { fontSize: 32, fontWeight: 'bold', color: '#007AFF', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666' },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfWidth: { width: '48%' },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6c757d',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  outlineButtonText: { color: '#6c757d', fontSize: 13, fontWeight: '600', textAlign: 'center' }
});
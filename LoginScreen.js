import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './Validationschema'; // or registerSchema
import { ValidatedInput } from './Inputvalidation';

export default function AuthScreen({ navigation }) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema), // Inject the schema here
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = (data) => {
    console.log(data);
    
    // Determine which screen to go to (Simulating role-based login)
    const targetScreen = data.email.toLowerCase().includes('admin') ? 'OwnerHome' : 'CashierHome';

    Alert.alert("Success", "Login Successful!", [
      { text: "OK", onPress: () => navigation.navigate(targetScreen) }
    ]);
  };

  return (
    <View style={styles.container}>
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
  container: { padding: 40 },
  primaryButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfWidth: { width: '48%' },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6c757d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  outlineButtonText: { color: '#6c757d', fontSize: 13, fontWeight: '600', textAlign: 'center' }
});
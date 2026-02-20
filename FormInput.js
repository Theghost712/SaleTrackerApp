import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const FormInput = ({ control, name, placeholder, secureTextEntry = false, ...rest }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            {...rest}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15, width: '100%' },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorInput: { borderColor: '#ff3333' },
  errorText: { color: '#ff3333', fontSize: 12, marginTop: 4, marginLeft: 5 },
});

export default FormInput;

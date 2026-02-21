import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

export const ValidatedInput = ({ control, name, placeholder, secureTextEntry, ...rest }) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value || ''}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          {...rest}
        />
        {error && <Text style={styles.errorText}>{error.message}</Text>}
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  inputContainer: { marginBottom: 15, width: '100%' },
  input: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    fontSize: 16,
  },
  errorInput: { borderColor: '#ff3333', backgroundColor: '#fff0f0' },
  errorText: { color: '#ff3333', fontSize: 12, marginTop: 4, marginLeft: 5 }
});

export default ValidatedInput;

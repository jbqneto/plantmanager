import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert
} from 'react-native'
import { colors, fonts } from '../styles';

import { Button } from '../components/Button';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Routes } from '../routes/paths';

export function UserIdentification() {
  const [isFocused, setFocused] = useState(false);
  const [isFilled, setFilled] = useState(false);
  const [name, setName] = useState<string>();

  const navigation = useNavigation();

  function handleSubmit() {
    if (!name) {
      return Alert.alert("Preencha o seu nome.");
    } else {
      Alert.alert("Bem vindo, " + name);
    }

    navigation.navigate(Routes.CONFIRMATION);
  }

  function handleInputFocus() {
    setFocused(true);
  }

  function handleInputBlur() {
    setFocused(false);
    setFilled(!!name);
  }

  function handleInputChange(value: string) {
    setFilled(!!value);
    setName(value);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  { isFilled ? '😄' : '😃' } 
                </Text>
                <Text style={styles.title}>
                  Como podemos {'\n'} chamar você ?
                </Text>
              </View>

              <TextInput 
                placeholder="Digite seu nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
                style={
                  [
                    styles.input,
                    (isFocused || isFilled) && {borderColor: colors.green}
                  ]
                }  
              />
              
              <View style={styles.footer}>
                <Button onPress={handleSubmit} text="Confirmar" />
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center'
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  },
  header: {
    alignItems: 'center'
  },
  emoji: {
    fontSize: 40
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 10
  }
})
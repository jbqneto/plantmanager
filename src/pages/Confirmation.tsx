import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Button } from '../components/Button';
import { colors, fonts } from '../styles';
import { useNavigation } from '@react-navigation/core';
import { Routes } from '../routes/paths';

export function Confirmation() {

  const navigation = useNavigation();

  function handleConfirmation() {
    navigation.navigate(Routes.PLANT_SELECT);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          😎
        </Text>

        <Text style={styles.title}>
          Prontinho
        </Text>

        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das {'\n'}
          suas plantinhas com muito cuidado.
        </Text>
      
        <View style={styles.footer}>
          <Button onPress={handleConfirmation} text="Começar" />
        </View>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 40
  },
  emoji: {
    fontSize: 72
  }
})
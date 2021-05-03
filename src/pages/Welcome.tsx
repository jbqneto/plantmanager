import React from 'react';
import { 
  SafeAreaView, 
  View,
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions } from 'react-native';

import { WelcomeButton } from '../components/WelcomeButton';

import wateringImg from '../assets/watering.png';
import {colors, fonts} from '../styles';


import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { Routes } from '../routes/paths';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUser, clearUser } from '../service/UserService';

export function Welcome() {
  const navigation = useNavigation();
  const [user, setUser] = useState<string>("");

  function handleStart() {
    console.log("user = " + user);
    if (user === "") {
      navigation.navigate(Routes.USER_IDENTIFICATION);
    } else {
      navigation.navigate(Routes.PLANT_SELECT);
    }
  }

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await getUser();

        if (user) {
          setUser(user);
        }

      } catch(e) {
        console.log(e);
        await clearUser();
      }

    }

    loadUser();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas {'\n'}
          de forma fácil {'\n'}
        </Text>

        <Image style={styles.image} source={wateringImg} resizeMode="contain" />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. 
          Nós lembramos você sempre que precisar.
        </Text>

        <WelcomeButton onPress={handleStart}>
          <Feather style={styles.buttonIcon} name="chevron-right" />
        </WelcomeButton>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 2
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 34
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    paddingHorizontal: 10
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32
  }
});
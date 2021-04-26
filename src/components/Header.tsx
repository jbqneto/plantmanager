import React from 'react';
import { 
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  StatusBar
 } from 'react-native';
import { colors, fonts } from '../styles';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import userImg from '../assets/user.jpeg';

export function Header() {

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.user}>José</Text>
      </View>

      <Image style={styles.img} source={userImg} />

    </View>
  )
 }

  let margin;

  if (Platform.OS === 'ios') {
    margin = getStatusBarHeight();
  } else {
  margin = StatusBar.currentHeight;
  }


  if (margin == undefined) {
    margin = 20;
  }

 const styles = StyleSheet.create({
   container: {
     width: '100%',
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingVertical: 20,
     marginTop: margin,
   },
   img: {
     width: 70,
     height: 70,
     borderRadius: 35
   },
   greeting: {
     fontSize: 32,
     color: colors.heading,
     fontFamily: fonts.heading
   },
   user: {
     fontSize: 32,
     fontFamily: fonts.heading,
     color: colors.heading,
     lineHeight: 40
   }
 })
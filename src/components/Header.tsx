import React from 'react';
import { 
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  StatusBar,
 } from 'react-native';
import { colors, fonts } from '../styles';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUser, saveUser } from '../service/UserService';
import { RectButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { User } from '../model/User';

import userImg from '../assets/profilepic.png';

export function Header() {
  const [user, setUser] = useState<User>();
  const [profilePicture, setProfilePicture] = useState<string>("");

  async function loadPhotoPermission() {
    try {
    
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        throw Error("Permissão negada para carregar fotos.");
      }  
    } catch (error) {
      console.error(error);
      throw error;
    }
    
  }

  async function handleImagePress() {
    try {
     
      if (Platform.OS !== 'web') {
        loadPhotoPermission();
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
        aspect: [3, 3]
      });

      if (user !== undefined && result !== null && !result.cancelled) {
        user.image = 'data:image/jpeg;base64,' + result.base64;
        await saveUser(user);
        setProfilePicture(user.image);
      } else {
        setProfilePicture("");
      }

    } catch (error) {
      Alert.alert(error);
    }

  }

  useEffect(() => {
    async function loadUser() {
      const user = await getUser();

      if (user) {
        setUser(user);
      } else {
        Alert.alert("No user");
      }
    }

    loadUser();

  }, []);

  return (
    <View style={styles.container}>
      {(user !== undefined) && (
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.user}>{user.username}</Text>
      </View>
      )}

      <RectButton onPress={handleImagePress} >
        <Image style={styles.img} source={(profilePicture !== "") 
          ? {uri: profilePicture} 
          : userImg} 
        />
      </RectButton>

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
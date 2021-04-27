import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text,
  Alert,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity, 
  Dimensions
} from 'react-native'

import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

import { useRoute } from '@react-navigation/core';

import { SvgFromUri } from 'react-native-svg';
import waterdrop from '../assets/waterdrop.png';

import { Button } from '../components/Button';
import { colors, fonts } from '../styles';
import { Plant } from '../model/Plant';

interface Params {
  plant: Plant
}

 export function PlantSave() {
  const route = useRoute();
  const { plant } = route.params as Params;

   return (
     <View style={styles.container}>
       <View style={styles.plantInfo}>
        <SvgFromUri
          uri={plant.photo}
          height={150}
          width={150}
          />

          <Text style={styles.plantName}>
            {plant.name}
          </Text>

          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>

        <View style={styles.controller}>
          
          <View style={styles.tipContainer}>
            <Image 
              source={waterdrop}
              style={styles.tipImage}
            />
            <Text style={styles.tipText}>
              {plant.water_tips}
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado
          </Text>

          <Button text="Cadastrar planta" onPress={() => {}} />

        </View>

      </View>
   );
}

  let margin;

  if (Platform.OS === 'ios') {
    margin = getBottomSpace();
  } else {
    margin = 20;
  }

 const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
   },
   plantInfo: {
     flex: 1,
     paddingHorizontal: 30,
     paddingVertical: 50,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: colors.shape
   },
   plantName: {
     fontFamily: fonts.heading,
     fontSize: 24,
     color: colors.heading,
     marginTop: 15
   },
   plantAbout: {
     textAlign: 'center',
     fontFamily: fonts.text,
     color: colors.heading,
     fontSize: 17,
     marginTop: 10
   },
   controller: {
     backgroundColor: colors.white,
     paddingHorizontal: 20,
     paddingTop: 20,
     paddingBottom: margin
   },
   tipContainer: {
     borderRadius: 20,
     flexDirection: 'row',
     justifyContent: 'space-between',
     padding: 20,
     alignItems: 'center',
     backgroundColor: colors.blue_light,
     position: 'relative',
     bottom: 60
   },
   tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
   },
   tipImage: {
     width: 56,
     height: 56
   },
   alertLabel: {
     textAlign: 'center',
     fontFamily: fonts.complement,
     color: colors.heading,
     fontSize: 12,
     marginBottom: 5
   },

 });
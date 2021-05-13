import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
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

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { TimePicker, ValueMap } from 'react-native-simple-time-picker';

import { useRoute } from '@react-navigation/core';

import { SvgFromUri } from 'react-native-svg';
import waterdrop from '../assets/waterdrop.png';

import { Button } from '../components/Button';
import { colors, fonts } from '../styles';
import { Plant } from '../model/Plant';
import { format, isBefore } from 'date-fns';
import { useEffect } from 'react';
import { loadPlants, savePlant } from '../service/PlantService';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../routes/paths';

interface Params {
  plant: Plant
}

 export function PlantSave() {
  const route = useRoute();
  const { plant } = route.params as Params;
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const navigation = useNavigation();

  useEffect(() => {
    setHours(selectedTime.getHours());
    setMinutes(selectedTime.getMinutes());
  }, []);


  async function handleSavePlant() {
    try {
      const plants = await loadPlants();

      await savePlant({...plant, dateTimeNotification: selectedTime})

      navigation.navigate(Routes.CONFIRMATION, {
        title: 'Uhuuul!',
        subtitle: `Fique tranquilo.\nVamos te lembrar de cuidar da sua plantinha.`,
        buttonTitle: 'Continuar',
        icon: 'hug',
        nextScreen: Routes.MY_PLANT
      });

    } catch(e) {
      console.error(e);
      Alert.alert("Erro ao tentar salvar planta!");
    }
  }

  function handleTimeChange(val: ValueMap) {
    const time = new Date();

    time.setHours(val.hours);
    time.setMinutes(val.minutes);
    time.setSeconds(0);

    setHours(val.hours);
    setMinutes(val.minutes);
    setSelectedTime(time);
  }

  function handleTimePickerAndroid() {
    
  }

  const TimePickerAndroid = () => {
    return (
      <TouchableOpacity style={styles.timePickerButton} onPress={handleTimePickerAndroid}>
        <Text style={styles.timePickerText}>
          {`Mudar horário (${format(selectedTime, 'HH:mm')})`}
        </Text>
      </TouchableOpacity>
    )
  }

   return (
     <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
     >
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

          <TimePicker 
            textColor={colors.green_dark} 
            onChange={(newValue) => handleTimeChange(newValue)} 
            value={{hours, minutes}} />

          <Button text="Cadastrar planta" onPress={handleSavePlant} />

        </View>

      </View>
     </ScrollView>
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
   timePicker: {
    borderBottomColor: colors.green_dark,
    color: colors.green_dark
   },
   timePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40
   },
   timePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
   }

 });
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native'
import { Header } from '../components/Header';

import { colors, fonts } from '../styles';
import waterdrop from '../assets/waterdrop.png';
import { FlatList } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Plant } from '../model/Plant';
import { useEffect } from 'react';
import { loadPlants, loadPlantsOrderedByDate } from '../service/PlantService';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { CardSecondary } from '../components/CardSecondary';

 export function MyPlants() {
   const [myPlants, setMyPlants] = useState<Plant[]>([]);
   const [loading, setLoading] = useState(true);
   const [nextWatered, setNextWatered] = useState<string>()

   useEffect(() => {
    async function loadData() {
      const plants = await loadPlantsOrderedByDate();

      if (plants.length < 1)
        return;

      const nextTime = formatDistance(
        new Date(plants[0].dateTimeNotification).getTime(),
        new Date().getTime(),{locale: pt});

      const name = plants[0].name;

      setNextWatered(`Não esqueça de regar a ${plants[0].name} à ${nextTime} horas`);
      setMyPlants(plants);
    }

    loadData();

   }, []);

   return (
     <View style={styles.container}>
        <Header />

        <View style={styles.spotlight}>
          <Image 
            style={styles.spotlightImg}
            source={waterdrop}
           />
           <Text style={styles.spotlightText}>
            {nextWatered}
           </Text>
        </View>

        <View style={styles.plants}>
          <Text style={styles.plantsTitle}>
            Próximas regadas
          </Text>

          <FlatList 
            keyExtractor={(item) => String(item.id)}
            data={myPlants} 
            renderItem={({item}) => (
              <CardSecondary data={item} />
             )}
            />

        </View>

     </View>
   );
}


 const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'space-between',
     paddingHorizontal: 30,
     paddingTop: 50,
     backgroundColor: colors.background,
   },
   spotlight: {
    backgroundColor: colors.blue_light,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
   },
   spotlightImg: {
    width: 60,
    height: 60,
   },
   spotlightText: {
     flex: 1,
     color: colors.blue,
     paddingHorizontal: 20,
     textAlign: 'justify'
   },
   plants: {
     flex: 1,
     width: '100%'
   },
   plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
   }
 });
import React from 'react';

import { 
  StyleSheet, 
  View, 
  Text,
  FlatList ,
  ActivityIndicator
} from 'react-native';

import { colors, fonts } from '../styles';
import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import api, { Endpoints } from '../service/api';
import { CardPrimary } from '../components/CardPrimary';
import { Load } from '../components/Load';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../routes/paths';
import { Plant } from '../model/Plant';

interface EnvProps {
  key: string;
  title: string;
}

interface PlantProps extends Plant {
  
}

export function PlantSelect() {
  const [envs, setEnvs] = useState<EnvProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [envSelected, setEnvSelected] = useState('all');
  const [isLoading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigator = useNavigation();

  async function fetchPlants() {
    const {data} = await api.get(Endpoints.LIST_PLANTS 
      + `?_sort=name&_order=asc&_page=${page}&_limit=6`);

    if(!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data); 
    }


    setLoading(false);
    setLoadingMore(false);
  }

  function handlePlantSelect(item: PlantProps) {
    navigator.navigate(Routes.PLANT_SAVE, {plant: item});
  }


  function handleFetchMore(distance: number) {
    if (distance < 1)
      return;

      setLoadingMore(true);
      setPage(oldValue => oldValue+1);
      setTimeout(() => {
        fetchPlants();
      }, 500);
  }

  function handleEnvSelected(env: string) {
    setEnvSelected(env);

    if (env === 'all')
      return setFilteredPlants(plants);

    const filtered = plants.filter(plant => {
      return plant.environments.includes(env);
    });

    setFilteredPlants(filtered);

  }

  const renderPlants = (item: PlantProps, index?: number) => {
    return (
      <CardPrimary onPress={() => handlePlantSelect(item)} data={item}></CardPrimary>
    )
  }

  useEffect(() => {

    async function fetchEnvs() {
      try {
        const {data} = await api.get(Endpoints.LIST_ENVIRONMENTS + '?_sort=title&_order=asc');
      
        setEnvs([
          {
            key: 'all',
            title: 'Todos'
          },
          ...data
        ]);
      
      } catch (error) {
        console.error(error);
      }

    }

    fetchEnvs();

  }, []);

  useEffect(() => {

    fetchPlants();

  }, []);

  if (isLoading)
    return <Load />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Header/>
        
        <Text style={styles.title}>
          Em qual ambiente
        </Text>

        <Text style={styles.subtitle}>você quer colocar sua planta ?</Text>
      </View>

      <View>
        <FlatList 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          data={envs}
          keyExtractor={(item) => String(item.key)} 
          contentContainerStyle={styles.envList}
          renderItem={({ item, index }) => (
          <EnvironmentButton 
            key={item.key} 
            title={item.title}
            onPress={() => handleEnvSelected(item.key)}
            active={item.key === envSelected}
            />
        )} />
      </View>

      <View style={styles.plants}>
        <FlatList 
          data={filteredPlants} 
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.plantsList}
          onEndReachedThreshold={0.1}
          onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}
          renderItem={({item, index}) => renderPlants(item) }
          ListFooterComponent={
            loadingMore ? (<ActivityIndicator color={colors.green} />)
            : (<></>)
          }
          >
          
        </FlatList>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  envList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginRight: 32,
    marginVertical: 32
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 30,
    color: colors.heading
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },
  plantsList: {

  }
});
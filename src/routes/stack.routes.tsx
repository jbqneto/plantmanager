import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../styles';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect';
import { PlantSave }  from '../pages/PlantSave';

import { Routes } from './paths';
import { MyPlants } from '../pages/MyPlants';
import AuthRoutes from './tab.routes';

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <StackRoutes.Navigator 
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >
    <StackRoutes.Screen name={Routes.WELCOME} component={Welcome} />
    <StackRoutes.Screen name={Routes.USER_IDENTIFICATION} component={UserIdentification} />
    <StackRoutes.Screen name={Routes.CONFIRMATION} component={Confirmation} />
    <StackRoutes.Screen name={Routes.PLANT_SELECT} component={AuthRoutes} />
    <StackRoutes.Screen name={Routes.PLANT_SAVE} component={PlantSave} />
    <StackRoutes.Screen name={Routes.MY_PLANT} component={AuthRoutes} />
    
  </StackRoutes.Navigator>
);

export default AppRoutes;
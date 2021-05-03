import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { colors, fonts } from '../styles';
import { SvgFromUri } from 'react-native-svg';
//TODO 1HT:08
interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  }
}

export function CardSecondary({data, ...rest}: PlantProps) {

  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri width={50} height={50} uri={data.photo} />
      
      <Text style={styles.title}>
          {data.name}
        </Text>

      <View style={styles.details}>
        <Text style={styles.timeLabel}>
          Regar às
        </Text>
        <Text style={styles.time}>
          {data.hour}
        </Text>
        
      </View>

    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
    marginVertical: 5
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: colors.heading,
    fontFamily: fonts.heading
  },
  details: {
    alignItems: 'flex-end'
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark
  }

})
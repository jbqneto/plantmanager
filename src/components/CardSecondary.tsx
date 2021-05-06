import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';

import { RectButton, RectButtonProps, Swipeable } from 'react-native-gesture-handler';
import { colors, fonts } from '../styles';
import { SvgFromUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  },
  handleRemove: (item: any) => void
}

export function CardSecondary({data, handleRemove, ...rest}: PlantProps) {

  return (
    <Swipeable overshootRight={false} 
      renderRightActions={() => (
        <Animated.View>
          <RectButton
            style={styles.btnRemove}
            onPress={handleRemove}
          >
            <Feather name="trash" size={32} color={colors.white} />
          </RectButton>
        </Animated.View>
      )}>
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
    </Swipeable>
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
  },
  btnRemove: {
    width: 100,
    height: 90,
    backgroundColor: colors.red,
    marginTop: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 15,
    right: 20
  }

})
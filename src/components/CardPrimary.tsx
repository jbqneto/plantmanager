import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { colors, fonts } from '../styles';
import { SvgFromUri } from 'react-native-svg';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  }
}

export function CardPrimary({data, ...rest}: PlantProps) {

  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri width={70} height={70} uri={data.photo} />
      <Text style={styles.text}>
        {data.name}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading
  }
})
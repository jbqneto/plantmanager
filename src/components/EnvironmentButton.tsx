import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import { colors, fonts } from '../styles';

interface EnvButtonProps extends RectButtonProperties {
  title: string;
  active?: boolean;
}

export function EnvironmentButton({title, active = false, ...rest}: EnvButtonProps) {

  return (
    <RectButton 
      style={[styles.container, active && styles.containerActive]}
      {...rest}
      >
        <Text style={[
          styles.text,
          active && styles.textActive
        ]} >
          {title}
        </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 5
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  textActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading
  }
});
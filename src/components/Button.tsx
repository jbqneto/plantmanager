import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet,
  Text, 
  TouchableOpacityProps
} from 'react-native';
import { colors, fonts } from '../styles';

interface ButtonProps extends TouchableOpacityProps {
  text: string
}

export function Button({text, ...rest}: ButtonProps) {

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text} {...rest}>
        {text}
      </Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading
  }
});
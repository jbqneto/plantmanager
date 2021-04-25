import React, { ReactNode } from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import colors from "../styles/colors";

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  children?: ReactNode;
}

export function WelcomeButton({ title, children, ...props }: ButtonProps) {

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      style={styles.button}
      {...props}
      >
    
    { title !== undefined ? (
      <Text style={styles.buttonText}>
        
      { title }

    </Text>
    ) : (
      children
    ) }

  </TouchableOpacity>
  )
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56
  },
  buttonText: {
    color: colors.white,
    fontSize: 24
  }
});
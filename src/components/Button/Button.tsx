import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface IButton {
  text?: string;
  onPress?: () => void;
}
const Button = ({ text = '', onPress = () => {} }: IButton) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
});

import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import colors from '../../theme/colors';
import Button from '../Button/Button';

interface ApiErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ApiErrorMessage = ({
  title = 'Error',
  message = 'Unknown Error',
  onRetry = () => {},
}: ApiErrorMessageProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Button text="Retry" onPress={onRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '70%',
    height: 200,
  },
  title: {
    fontSize: 18,
    margin: 20,
  },
  message: {
    color: colors.grey,
    marginBottom: 10,
  },
});

export default ApiErrorMessage;

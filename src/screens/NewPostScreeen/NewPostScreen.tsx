import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
  Text,
  Image,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../theme/colors';
import { useNavigation } from '@react-navigation/core';

const NewPostScreen = () => {
  const [tweet, setTweet] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.newTweetContainer}>
        <View style={styles.inputsContainer}>
          <TextInput
            value={tweet}
            onChangeText={(value) => setTweet(value)}
            multiline={true}
            numberOfLines={3}
            style={styles.tweetInput}
            placeholder={"What's happening?"}
          />
          <TouchableOpacity onPress={() => navigation.navigate('TakePhoto')}>
            <Text style={styles.pickimage}>Pick Image </Text>
          </TouchableOpacity>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Tweet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  pickimage: {
    color: colors.grey,
    fontSize: 18,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 15,
  },
  button: {
    backgroundColor: colors.grey,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  newTweetContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  inputsContainer: {
    marginLeft: 10,
  },
  tweetInput: {
    height: 100,
    maxHeight: 300,
    fontSize: 20,
  },
  imageInput: {},

  image: {
    width: 150,
    height: 150,
  },
});

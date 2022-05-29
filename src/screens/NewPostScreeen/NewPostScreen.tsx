import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CreatePostMutation, CreatePostMutationVariables } from '../../API';
import { useAuthContext } from '../../contexts/AuthContext';
import colors from '../../theme/colors';
import { CreateRouteProp } from '../../types/navigation';
import { createPost } from './queries';

const NewPostScreen = () => {
  const [description, setDescription] = useState('');
  const { userId } = useAuthContext();
  const navigation = useNavigation();

  const [doCreatePost] = useMutation<CreatePostMutation, CreatePostMutationVariables>(createPost);

  const route = useRoute<CreateRouteProp>();

  const submit = async () => {
    try {
      const response = await doCreatePost({
        variables: {
          input: {
            description,
            nofComments: 0,
            nofLikes: 0,
            userID: userId,
          },
        },
      });
    } catch (e) {
      Alert.alert('Error uploading post', (e as Error).message);
    }
  };

  return (
    <View>
      <View style={styles.newTweetContainer}>
        <View style={styles.inputsContainer}>
          <TextInput
            value={description}
            onChangeText={(value) => setDescription(value)}
            multiline={true}
            numberOfLines={3}
            style={styles.tweetInput}
            placeholder={'What is happening in your area'}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Submit</Text>
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

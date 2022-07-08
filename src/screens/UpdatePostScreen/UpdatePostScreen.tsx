import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';


import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import { useAuthContext } from '../../contexts/AuthContext';
import colors from '../../theme/colors';
import { UpdatePostRouteProp } from '../../types/navigation';
import { getPost, updatePost } from './queries';

const UpdatePostScreen = () => {
  const [description, setDescription] = useState('');
  const { userId } = useAuthContext();

  const navigation = useNavigation();

  const route = useRoute<UpdatePostRouteProp>();
  const { id } = route.params;
  const { data, loading, error } = useQuery<GetPostQuery, GetPostQueryVariables>(getPost, {
    variables: { id },
  });

  const [doUpdatePost, { error: updateError, data: updateData }] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const post = data?.getPost;

  useEffect(() => {
    if (post) {
      setDescription(post.description || '');
    }
  }, [post]);

  useEffect(() => {
    if(updateData) {
      navigation.goBack();
    }
  }, [updateData, navigation])

  if (error || updateError) {
    return (
      <ApiErrorMessage
        title="failed to fetch the post"
        message={error?.message || updateError?.message}
      />
    );
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const submit = async () => {
    if (!post) {
      return;
    }
    doUpdatePost({ variables: { input: { id: post.id, _version: post._version, description } } });
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

export default UpdatePostScreen;

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

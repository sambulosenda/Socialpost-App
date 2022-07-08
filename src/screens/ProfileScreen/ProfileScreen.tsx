import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../../components/Button/Button';
import { ActivityIndicator } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { GetUserQuery, GetUserQueryVariables, User } from '../../API';

import { useQuery } from '@apollo/client';
import { getUser } from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import { useAuthContext } from '../../contexts/AuthContext';
import {
  MyProfileNavigationProp,
  MyProfileRouteProp,
  UserProfileNavigationProp,
} from '../../types/navigation';
import ProfileHeader from './ProfileHeader';
import FeedPost from '../../components/FeedPost/FeedPost';

const ProfileScreen = () => {
  const route = useRoute<MyProfileNavigationProp | MyProfileRouteProp>();
  const navigation = useNavigation<UserProfileNavigationProp | MyProfileNavigationProp>();
  const { userId: authUserId } = useAuthContext();

  const userId = route.params?.userId || authUserId;

  const { data, loading, error, refetch } = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: { id: userId },
  });
  const user = data?.getUser;
  console.log(user);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !user) {
    return (
      <>
        <ApiErrorMessage
          title="Error fetching the user"
          message={error?.message || 'User not found'}
          onRetry={() => refetch()}
        />
        <Button onPress={() => Auth.signOut()} text="Sign out" inline />
      </>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={user.Posts?.items || []}
        ListHeaderComponent={() => <ProfileHeader user={user} />}
        renderItem={({ item }) => item && <FeedPost post={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  root: {
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  name: {
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  numberContainer: {
    alignItems: 'center',
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

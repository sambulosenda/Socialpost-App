import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../../components/Button/Button';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { User } from '../../API';

import { useQuery } from '@apollo/client';
import { getUser } from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import { useAuthContext } from '../../contexts/AuthContext';
import { ProfileNavigationProp } from '../../types/navigation';

interface IProfileHeader {
  user: User;
}

const ProfileHeader = ({ user }: IProfileHeader) => {
  const { userId } = useAuthContext();

  const navigation = useNavigation<ProfileNavigationProp>();

  navigation.setOptions({ title: user?.username || 'Profile' });

  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <Image source={{ uri: user.image }} style={styles.avatar} />

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofPosts}</Text>
          <Text>Posts</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowers}</Text>
          <Text>Followers</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowing}</Text>
          <Text>Following</Text>
        </View>
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>

      {userId === user.id && (
        <View style={{ flexDirection: 'row' }}>
          <Button text="Edit Profile" 
          onPress={() => navigation.navigate('EditProfile')}
           inline />
          <Button onPress={() => Auth.signOut()} text="Sign out" inline />
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  root: {
    padding: 10,
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

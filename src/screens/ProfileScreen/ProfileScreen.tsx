import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import user from '../../assets/data/user.json';
import Button from '../../components/Button/Button';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const  userId  = route.params?.userId;

  navigation.setOptions({ title: user.username });

  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <Image source={{ uri: user.image }} style={styles.avatar} />

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>92</Text>
          <Text>Posts</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>921</Text>
          <Text>Followers</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>921</Text>
          <Text>Following</Text>
        </View>
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>

      <View style={{ flexDirection: 'row' }}>
        <Button text="Edit Profile" onPress={() => console.warn('edit')} />
        <Button onPress={() => Auth.signOut()} text="Sign out" />
      </View>
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

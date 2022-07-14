

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {User} from '../../API';
import { DEFAULT_USER_IMAGE } from '../../config/config';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {useNavigation} from '@react-navigation/native';

interface IUserListItem {
  user: User;
}

const UserListItem = ({user}: IUserListItem) => {

  const navigation = useNavigation();


  const goToUserScreen = () => {
    navigation.navigate('UserProfile', {userId: user.id});
  };

  return (
    <Pressable onPress={goToUserScreen} style={styles.root}>
       <Image
        source={{uri: user.image || DEFAULT_USER_IMAGE}}
        style={styles.image}
      />

      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.nofFollowers}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 10,
    
  },
  name: {
    fontWeight: fonts.weight.bold,
    marginBottom: 5,
  },
  username: {
    color: colors.black,
  },
});

export default UserListItem;
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, FlatList } from 'react-native';
import CommentsScreen from './src/screens/CommentsScreen/CommentsScreen';
import EditProfileScreen from './src/screens/EditProfileScreen/EditProfileScreen';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.app}>
      <EditProfileScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;

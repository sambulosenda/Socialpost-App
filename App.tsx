import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, FlatList } from 'react-native';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.app}>
      <HomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;

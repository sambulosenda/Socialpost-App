import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, FlatList } from 'react-native';

import FeedPost from '../../components/FeedPost/FeedPost';
import posts from '../../assets/data/posts.json';

const HomeScreen = () => {
  return (
      <FlatList
        data={posts}
        renderItem={({ item }) => <FeedPost post={item} />}
        showsVerticalScrollIndicator={false}
      />
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default HomeScreen;

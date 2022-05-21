import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, FlatList } from 'react-native';

import FeedPost from '../../components/FeedPost/FeedPost';

import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';

export const listPosts = /* GraphQL */ `
  query ListPosts($filter: ModelPostFilterInput, $limit: Int, $nextToken: String) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        User {
          id
          name
          username
          image
        }
        Comments {
          items {
            id
            comment
            User {
              id
              name
            }
          }
        }
      }
      nextToken
      startedAt
    }
  }
`;

const HomeScreen = (props) => {
  const [posts, setPosts] = useState([]);

  const fetchAllPosts = async () => {
    const response = await API.graphql(graphqlOperation(listPosts));
    console.log(response);
    setPosts(response.data.listPosts.items);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

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

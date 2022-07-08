import { gql, useQuery } from '@apollo/client';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ListPostsQuery, ListPostsQueryVariables } from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import FeedPost from '../../components/FeedPost/FeedPost';

export const listPosts = gql`
  query ListPosts($filter: ModelPostFilterInput, $limit: Int, $nextToken: String) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        image
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


const SPACING = 20;
const AVATAR_SIZE = 70;

const HomeScreen = () => {
  // const [posts, setPosts] = useState([]);
  // const fetchAllPosts = async () => {
  //   const response = await API.graphql(graphqlOperation(listPosts));
  //   console.log(response);
  //   setPosts(response.data.listPosts.items);
  // };

  // useEffect(() => {
  //   fetchAllPosts();
  // }, []);

  const { data, loading, error } = useQuery<ListPostsQuery, ListPostsQueryVariables>(listPosts);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <ApiErrorMessage title="Error fetching posts" message={error.message} />;

  const posts = (data?.listPosts?.items || []).filter((post) => !post?._deleted);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <FlatList
        data={posts}
        contentContainerStyle={{padding: SPACING}}
        renderItem={({ item }) => item && <FeedPost post={item} />}
        showsVerticalScrollIndicator={false}
      /> 
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default HomeScreen;

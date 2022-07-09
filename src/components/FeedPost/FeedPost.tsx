import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  CreateLikeMutation,
  CreateLikeMutationVariables, DeleteLikeMutation, DeleteLikeMutationVariables, LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables, Post
} from '../../API';
import Carousel from '../Carousel/Carousel';
import UserImage from '../UserImage/UserImage';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import PostMenu from './PostMenu';

import { useMutation, useQuery } from '@apollo/client';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuthContext } from '../../contexts/AuthContext';
import colors from '../../theme/colors';
import { createLike, deleteLike, likesForPostByUser } from './queries';
// somewhere in your app

interface IFeedPost {
  post: Post;
}

const FeedPost = ({ post }: IFeedPost) => {
  //Store the image uri in a state
  const [imageUri, setImageUri] = useState<String | null>(null);

  const { userId } = useAuthContext();

  // const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  //const [isLiked, setIsLiked] = useState(false);

  const [doCreateLike] = useMutation<CreateLikeMutation, CreateLikeMutationVariables>(createLike, {
    variables: { input: { userID: userId, postID: post.id } },
    refetchQueries: ['LikesForPostByUser'],
  });

  const [doDeleteLike] = useMutation<DeleteLikeMutation, DeleteLikeMutationVariables>(deleteLike, {
    refetchQueries: ['LikesForPostByUser'],
  })


  const { data: usersLikeData } = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, { variables: { postID: post.id, userID: { eq: userId } } });

  console.log(usersLikeData);
  const userLike = (usersLikeData?.likesForPostByUser?.items || []).filter(like => !like?._deleted,)?.[0];

  const navigation = useNavigation();

  const navigationToUser = () => {
    navigation.navigate('UserProfile', { userId: post.User?.id });
  };

  // const toggleDescription = () => {
  //   setIsDescriptionExpanded((existingValue) => !existingValue);
  // };

  const likePress = () => {
    if (userLike) {
      //delelete like

      doDeleteLike({ variables: { input: { id: userLike.id, _version: userLike._version } }, })

    } else {
      doCreateLike();

    }
  };

  // let lastTap = 0;
  // const handleDoublePress = () => {
  //   console.log('double press');
  //   const now = Date.now();
  //   if (now - lastTap < 500) {
  //     likePress();
  //   }
  //   lastTap = now;
  // };

  let content = null;
  if (post.image) {
    content = <Image source={{ uri: post.image }} style={styles.image} />;
  } else if (post.images) {
    content = <Carousel images={post.images} />;
  } else if (post.video) {
    content = <VideoPlayer uri={post.video} />;
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {/* Header */}

        {/* LeftContainer */}
        <View style={styles.profilepicture}>
          <UserImage imagekey={post?.User?.image || undefined} width={50} />
        </View>

        {/* Right */}
        <View style={{ flexShrink: 1, marginLeft: 12, marginBottom: 15 }}>
          <View style={styles.main}>
            {/* Post Desciption*/}

            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text onPress={navigationToUser} style={styles.username}>
                {post.User?.username}
              </Text>
              <PostMenu post={post} />
            </View>

            <View>
              <Text style={styles.contents}>{post.description}</Text>
            </View>

            <View style={styles.iconContainer}>
              <Pressable onPress={likePress}>
                <AntDesign
                  name={userLike ? 'heart' : 'hearto'}
                  size={18}
                  style={styles.icon}
                  color={userLike ? colors.accent : '#e0dcdc'}
                />
              </Pressable>
              <Ionicons name="chatbubble-outline" size={18} style={styles.icon} color={'#e0dcdc'} />
              <Feather name="send" size={18} style={styles.icon} color={'#e0dcdc'} />
              <Feather name="bookmark" size={18} color={'#e0dcdc'} />
            </View>

            {/* Likes*/}
            <Text style={styles.text}>
              Linked by {''}
              <Text style={styles.bold}>Michel</Text>
              <Text style={styles.bold}>
                {' '}
                {''}and {post.nofLikes}
              </Text>{' '}
              others
            </Text>

            {/* Post Comments*/}
            <Text>View all {post.nofComments} comments</Text>
            {(post.Comments?.items || []).map(
              (comment) => comment && <Comment key={comment.id} comment={comment} />
            )}
            <Text>{post.createdAt}</Text>

            {/* <Text onPress={toggleDescription}>{isDescriptionExpanded ? 'less' : 'more'}</Text> */}
          </View>
        </View>

        {/* Content*/}

        {/* Footer */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},

  profilepicture: {
    marginTop: 10,
  },

  container: {
    flexDirection: 'row',
    borderBottomColor: '#EAEEEC',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EAEEEC',
    marginTop: 10,
  },

  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  contents: {
    marginTop: 2,
    fontSize: 16,
    lineHeight: 20,
    flexShrink: 1,
  },
  icon: {
    marginHorizontal: 5,
  },
  footer: {
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 10,
    justifyContent: 'space-between',
  },
});

export default FeedPost;

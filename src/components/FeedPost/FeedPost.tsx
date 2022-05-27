import { View, Text, StyleSheet, Image, SafeAreaView, Pressable } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import Comment from '../Comment/Comment';
import { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

import { useNavigation } from '@react-navigation/native';
import { Post } from '../../API';


interface IFeedPost {
  post: Post;
}

const FeedPost = ({ post }: IFeedPost) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation();

  const navigationToUser = () => {
    navigation.navigate('UserProfile', { userId: post.User?.id });

  }

  const toggleDescription = () => {
    setIsDescriptionExpanded((existingValue) => !existingValue);
  };

  const likePress = () => {
    setIsLiked((existingValue) => !existingValue);
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
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: post.User?.image }} style={styles.avatar} />
        <Text onPress={navigationToUser}style={styles.username}>{post.User?.username}</Text>
        <Entypo name="dots-three-horizontal" size={16} style={styles.threeDots} />
      </View>

      <View style={styles.main}>
        {/* Post Desciption*/}
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
          {post.description}{' '}
        </Text>
        <Text onPress={toggleDescription}>{isDescriptionExpanded ? 'less' : 'more'}</Text>
      </View>

      {/* Content*/}
  
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={likePress}>
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={isLiked ? colors.accent : colors.black}
            />
          </Pressable>
          <Ionicons name="chatbubble-outline" size={24} style={styles.icon} color={colors.black} />
          <Feather name="send" size={24} style={styles.icon} color={colors.black} />
          <Feather name="bookmark" size={24} style={{ marginLeft: 'auto' }} color={colors.black} />
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
          comment => comment &&  
          <Comment key={comment.id} comment={comment} />
        )}
        <Text>{post.createdAt}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {},

  video: {},

  bold: {
    fontWeight: fonts.weight.bold,
  },

  image: {
    width: '100%',
    aspectRatio: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: fonts.weight.bold,
    color: colors.black,
  },

  threeDots: {
    marginLeft: 'auto',
  },

  footer: {
    padding: 10,
  },

  main: {
    padding: 10,
  },

  iconContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: colors.black,
    lineHeight: 20,
    marginBottom: 8,
    fontSize: 16,
  },
});

export default FeedPost;

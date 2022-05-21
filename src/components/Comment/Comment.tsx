import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { useState } from 'react';
import { Comment as CommentType } from '../../API';

interface ICommentProps {
  comment: CommentType;
  includeDetails: boolean;
}

const Comment = ({ comment, includeDetails = false }: ICommentProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const likePress = () => {
    setIsLiked((existingValue) => !existingValue);
  };

  return (
    <View style={styles.comment}>
      {includeDetails && <Image source={{ uri: comment.user.image }} style={styles.avatar} />}

      <View style={styles.middleColumn}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.user.username}</Text> {comment.comment}
        </Text>

        {includeDetails && (
            <View style={styles.footer}>
          <Text style={styles.footerText}>2 days ago</Text>
          <Text style={styles.footerText}>4 likes</Text>
          <Text style={styles.footerText}>Reply</Text>
        </View>
        )}
      
      </View>

      <Pressable onPress={likePress}>
        <AntDesign
          name={isLiked ? 'heart' : 'hearto'}
          size={16}
          style={styles.icon}
          color={colors.black}
        />
      </Pressable>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
  commentText: {
    color: colors.black,
    lineHeight: 18,
    marginHorizontal: 1
  },
  icon: {
    marginHorizontal: 5,
  },
  middleColumn: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  footerText: {
    marginHorizontal: 5,
  },
  new: {
    backgroundColor: colors.primary,
    color: colors.white,
    paddingHorizontal: 5,
    marginRight: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },

  text: {
    color: colors.black,
    lineHeight: 18,
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    marginHorizontal: 10,
  },
});

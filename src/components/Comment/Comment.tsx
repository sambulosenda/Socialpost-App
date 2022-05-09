import { StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { IComment } from '../../types/models';

interface ICommentProps {
  comment: IComment;
}

const Comment = ({ comment }: ICommentProps) => {
  return (
    <View style={styles.comment}>
      <Text style={styles.commentText}>
        <Text style={styles.bold}>{comment.user.username}</Text> {comment.comment}
      </Text>
      <AntDesign name={'hearto'} size={16} style={styles.icon} color={colors.black} />
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  commentText: {
    color: colors.black,
    flex: 1,
    lineHeight: 20,
  
    marginBottom: 8,
    fontSize: 16,

  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
  text: {
    color: colors.black,
    lineHeight: 16,
    marginBottom: 8,
    fontSize: 16,


  },
  
});

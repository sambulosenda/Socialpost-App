import { useMutation } from '@apollo/client';
import React from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import { DeleteCommentMutationVariables, DeletePostMutation, Post } from '../../API';
import { deletePost } from './queries';

interface IPostMenu {
  post: Post;
}

const PostMenu = ({ post }: IPostMenu) => {
  const [deletePostMutation] = useMutation<DeletePostMutation, DeleteCommentMutationVariables>(
    deletePost,
    { variables: { input: { id: post.id, _version: post._version } } }
  );

  const startDeletingPost = async () => {
    const response = await deletePostMutation();
    console.log(response);
  };

  const onDeleteOptionPressed = () => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            startDeletingPost();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const onEditOptionPressed = () => {
    console.log('delete option pressed');
  };

  return (
    <Menu renderer={renderers.SlideInMenu} style={styles.threeDots}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => Alert.alert(`Reporting`)}>
          <Text style={styles.optionText}>Report</Text>
        </MenuOption>
        <MenuOption onSelect={onDeleteOptionPressed}>
          <Text style={[styles.optionText, { color: 'red' }]}>Delete</Text>
        </MenuOption>
        <MenuOption onSelect={onEditOptionPressed}>
          <Text style={styles.optionText}> Edit</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  threeDots: {
    marginLeft: 'auto',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
});

export default PostMenu;

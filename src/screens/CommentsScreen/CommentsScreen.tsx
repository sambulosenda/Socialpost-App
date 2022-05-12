import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import comments from '../../assets/data/comments.json';
import Comment from '../../components/Comment/Comment';
import Input from './Input';

const CommentsScreen = () => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={comments}
        renderItem={({ item }) => <Comment comment={item} includeDetails />}
        style={{ padding: 10 }}
      />
      <Input />
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({});

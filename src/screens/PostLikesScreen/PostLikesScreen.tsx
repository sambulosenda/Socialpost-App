import { useQuery } from '@apollo/client'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { LikesForPostByUserQuery, LikesForPostByUserQueryVariables } from '../../API'
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage'
import UserListItem from '../../components/UserListItem/UserListItem'
import { PostLikesRouteProp } from '../../types/navigation'
import { likesForPostByUser } from './queries'

const PostLikesScreen = () => {

  const route = useRoute<PostLikesRouteProp>()
  const { id } = route.params;

  const { data, loading, error, refetch } = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, { variables: { postID: id } });

  if (loading) return <Text>Loading...</Text>
  if (error) return <ApiErrorMessage title='Error Fetching users' message={error.message} />

  const likes = data?.likesForPostByUser?.items.filter(like => !like?._deleted) || [];


  console.log(likes)

  return (
    <FlatList
      data={likes}

      renderItem={({ item }) => <UserListItem user={item?.User} />}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default PostLikesScreen

const styles = StyleSheet.create({})
import { gql } from '@apollo/client';

export const deletePost = gql`
  mutation DeletePost($input: DeletePostInput!, $condition: ModelPostConditionInput) {
    deletePost(input: $input, condition: $condition) {
      id
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;


export const createLike = gql`
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
      id
      userID
      postID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;



export const likesForPostByUser = gql`
  query LikesForPostByUser(
    $postID: ID!
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likesForPostByUser(
      postID: $postID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        postID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;


export const deleteLike  = gql`
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
      id
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
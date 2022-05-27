import {gql} from '@apollo/client'

export const getUser = gql `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowing
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;


export const updateUser = gql `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      bio
      username
      website
      image
      
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;


export const usersByUsername  = gql `
  query UsersByUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
      }
      nextToken
      startedAt
    }
  }
`;
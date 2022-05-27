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
      Posts {
        nextToken
        startedAt
        items {
            id, 
            description, 
            image,
        }
      }
      Comments {
        nextToken
        startedAt
      }
      Likes {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
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

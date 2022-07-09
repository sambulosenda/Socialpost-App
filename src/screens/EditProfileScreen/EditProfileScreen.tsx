import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import { Storage } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { v4 as uuidv4 } from 'uuid';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UsersByUsernameQuery,
  UsersByUsernameQueryVariables
} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import { useAuthContext } from '../../contexts/AuthContext';
import colors from '../../theme/colors';
import { IUser } from '../../types/models';
import { getUser, updateUser, usersByUsername } from './queries';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

type IEditableUserField = 'name' | 'username' | 'website' | 'bio';
type IEditableUser = Pick<IUser, IEditableUserField>;

interface ICustomInput {
  control: Control<IEditableUser, object>;
  label: string;
  name: IEditableUserField;
  multiline?: boolean;
  rules?: object;
}

const CustomInput = ({ control, name, label, multiline = false, rules = {} }: ICustomInput) => (
  <Controller
    rules={rules}
    control={control}
    name={name}
    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder={label}
              style={[styles.input, { borderColor: error ? colors.error : colors.border }]}
              multiline={multiline}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={{ color: colors.error }}>{error.message || 'Error'}</Text>}
          </View>
        </View>
      );
    }}
  />
);

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { control, handleSubmit, setValue } = useForm<IEditableUser>();

  const { userId } = useAuthContext();

  const { data, loading, error } = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: { id: userId },
  });

  const user = data?.getUser;

  const [getUsersByUsername] = useLazyQuery<UsersByUsernameQuery, UsersByUsernameQueryVariables>(
    usersByUsername
  );

  const [runUpdateUser, { data: updateData, loading: updateLoading, error: updateError }] =
    useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('username', user.username);
      setValue('website', user.website);
      setValue('bio', user.bio);
    }
  }, [user, setValue]);

  const onSubmit = async (data: IEditableUser) => {
    const input: UpdateUserInput = { id: userId, ...data, _version: user?._version };

    if (selectedPhoto?.uri) {
      //upload photo
      input.image = await uploadMedia(selectedPhoto.uri);
    }

    await runUpdateUser({
      variables: { input },
    });
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const uploadMedia = async (uri: string) => {
    try {
      // get the blob of the file from uri
      const response = await fetch(uri);
      const blob = await response.blob();

      const uriParts = uri.split('.');
      const extension = uriParts[uriParts.length - 1];

      // upload the file (blob) to S3
      const s3Response = await Storage.put(`${uuidv4()}.${extension}`, blob);
      return s3Response.key;
    } catch (e) {
      Alert.alert('Error uploading the file');
    }
  };

  const onChangePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, ({ didCancel, errorCode, errorMessage, assets }) => {
      if (!didCancel && !errorCode && assets && assets.length > 0) {
        setSelectedPhoto(assets[0]);
      }
    });
  };

  const ValidateUsername = async (username: string) => {
    //Query the database based on usersByUsername

    try {
      const response = await getUsersByUsername({ variables: { username } });
      if (response.error) {
        Alert.alert('Failed to fetch username');
        return 'Failed to fetch username';
      }
      const users = response.data?.usersByUsername?.items;
      if (users && users.length > 0 && users?.[0]?.id !== userId) {
        return 'Username is already taken';
      }
    } catch (e) {
      Alert.alert('Failed to fetch username');
    }

    //If the username is taken, return false
    return true;
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || updateError) {
    return (
      <ApiErrorMessage
        title="Error fetching or updating user"
        message={error?.message || updateError?.message}
      />
    );
  }

  return (
    <View style={styles.page}>
      <Image source={{ uri: selectedPhoto?.uri || user.image }} style={styles.avatar} />
      <Text onPress={onChangePhoto} style={styles.textButton}>
        Change profile picture
      </Text>

      <CustomInput
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        label="Name"
      />
      <CustomInput
        name="username"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: { value: 3, message: 'Username should be more than 3 characters' },
          validate: ValidateUsername,
        }}
        label="Username"
      />
      <CustomInput
        name="website"
        control={control}
        rules={{ pattern: { value: URL_REGEX, message: 'Url invalid' } }}
        label="Website"
      />
      <CustomInput
        name="bio"
        control={control}
        label="Bio"
        rules={{
          required: 'Bio is required',
          maxLength: { value: 200, message: 'Username should be less  than 200 characters' },
        }}
        multiline
      />
      <Text onPress={handleSubmit(onSubmit)} style={styles.textButton}>
        Submit
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  textButton: {
    fontSize: 12,
    fontWeight: 'bold',

    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: {
    width: 75,
  },
  input: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    minHeight: 35,
  },
});

export default EditProfileScreen;

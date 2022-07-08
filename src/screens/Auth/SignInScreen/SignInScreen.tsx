import { View, Image, StyleSheet, useWindowDimensions, ScrollView, Alert } from 'react-native';
import Logo from '../../../assets/images/logos.png';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { SignInNavigationProp } from '../../../types/navigation';

//import Auth from AWS Amplify
import { Auth } from 'aws-amplify';
import { useState, useContext } from 'react';

type SignInData = {
  email: string;
  password: string;
};

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation<SignInNavigationProp>();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<SignInData>();
  const onSignInPressed = async ({email, password}: SignInData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.signIn(email, password);
    } catch (e) {
      if ((e as Error).name === 'UserNotConfirmedException') {
        navigation.navigate('Confirm email', {email});
      } else {
        Alert.alert('Oopps', (e as Error).message);
      }
    } finally {
      setLoading(false);
      reset();
    }
  };


  const onForgotPasswordPressed = () => {
    navigation.navigate('Forgot password');
  };

  const onSignUpPress = () => {
    navigation.navigate('Sign up');
  };

  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />

      <FormInput
        name="email"
        placeholder="Email"
        autoCapitalize="none"
        control={control}
        rules={{ required: 'Username is required' }}
      />

      <FormInput
        name="password"
        placeholder="Password"
        secureTextEntry
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 3,
            message: 'Password should be minimum 3 characters long',
          },
        }}
      />

      <CustomButton
        text={loading ? 'Loading...' : 'Sign In'}
        onPress={handleSubmit(onSignInPressed)}
        type="TERTIARY"
        bgColor="blue"
      />

      <CustomButton text="Forgot password?" onPress={onForgotPasswordPressed} type="TERTIARY" />

      <SocialSignInButtons />

      <CustomButton
        text="Don't have an account? Create one"
        onPress={onSignUpPress}
        type="TERTIARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '40%',
  },
});

export default SignInScreen;

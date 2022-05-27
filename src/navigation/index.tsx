import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useAuthContext } from '../contexts/AuthContext';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';
import NewPostScreen from '../screens/NewPostScreeen/NewPostScreen';
import PostUploadScreen from '../screens/PostUploadScreen/PostUploadScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { user } = useAuthContext();

  // If user is not logged in yet, show the AuthStackNavigator
  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        {!user ? (
          <Stack.Screen
            name="Auth"
            component={AuthStackNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Feed" component={HomeScreen} />
            <Stack.Screen
              name="UserProfile"
              component={ProfileScreen}
              options={{ title: 'Profile' }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{ title: 'Edit Profile' }}
            />
            <Stack.Screen name="TakePhoto" component={PostUploadScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import AuthStackNavigator from './AuthStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';

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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

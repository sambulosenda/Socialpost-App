import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewPostScreen from '../screens/NewPostScreeen/NewPostScreen';
import CameraScreen from '../screens/PostUploadScreen/PostUploadScreen';

const Stack = createNativeStackNavigator();

const UploadStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Create" component={NewPostScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default UploadStackNavigator;

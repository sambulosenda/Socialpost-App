import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';
import { FlashMode } from 'expo-camera/build/Camera.types';
import { useNavigation } from '@react-navigation/native';
import { CameraNavigationProp } from '../../types/navigation';

const flashModes = [FlashMode.off, FlashMode.on, FlashMode.auto, FlashMode.torch];

const CameraScreen = () => {
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(FlashMode.off);

  const navigation = useNavigation<CameraNavigationProp>();

  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      setHasPermissions(
        cameraPermission.status === 'granted' && microphonePermission.status === 'granted'
      );
    };
    getPermission();
  });

  const flipCamera = () => {
    setCameraType((currentCameraType) =>
      currentCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const flipFlashCamera = () => {
    const currentIndex = flashModes.indexOf(flash);
    const nextIndex = currentIndex === flashModes.length - 1 ? 0 : currentIndex + 1;
    setFlash(flashModes[nextIndex]);
  };

  const navigatetoPostScreen = () => {
    navigation.navigate('Create', { image: 'https://picsum.photos/200' });
  };

  if (hasPermissions === null) {
    return <Text>Loading...</Text>;
  }

  if (hasPermissions === false) {
    return <Text>No access to camera</Text>;
  }

  console.warn;
  return (
    <View style={styles.page}>
      <Camera style={styles.camera} type={cameraType} ratio="4/3" flashMode={flash} />

      <View style={[styles.buttonsContainer, { top: 25 }]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <Pressable onPress={flipFlashCamera}>
          <MaterialIcons name="flash-off" size={30} color={colors.white} />
        </Pressable>
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>

      <View style={[styles.buttonsContainer, { bottom: 25 }]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />
        <Pressable onPress={navigatetoPostScreen} style={styles.circle} />

        <Pressable onPress={flipCamera}>
          <MaterialIcons name="flip-camera-ios" size={38} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  camera: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
  },
});

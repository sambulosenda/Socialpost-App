import { Storage } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';

const UserImage = ({ imagekey, width = 50 }: { imagekey?: string;  width: number }) => {
  const [imageUri, setImageUri] = useState<String | null>(null);

  useEffect(() => {
    if (imagekey) {
      Storage.get(imagekey).then(setImageUri);
    }
  }, [imagekey]);

  return <Image source={{ uri: imageUri }} style={[styles.image, {width}]} />;
};

export default UserImage;

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    borderRadius: 50,
  },
});

import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IVideoPlayer {
  uri: string;
}

const VideoPlayer = ({ uri }: IVideoPlayer) => {
  const [muted, setMuted] = useState(true);

  return (
    <View>
      <Video source={{ uri }} style={styles.video} resizeMode="cover" repeat muted={muted} />
      <Pressable onPress={() => setMuted((v) => !v)} style={styles.muteButton}>
        <Ionicons name={muted ? "volume-mute" : "volume-medium"} size={16} color="white" />
      </Pressable>
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  video: {
    width: '100%',
    aspectRatio: 1,
  },

  muteButton: {
    backgroundColor: 'black',
    padding: 5,

    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 25,
  },
});

import { View, Text, FlatList, Image, useWindowDimensions } from 'react-native';
import { useState, useRef } from 'react';

interface ICarousel {
  images: string[];
}
const Carousel = ({ images }: ICarousel) => {
  const { width } = useWindowDimensions();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveImageIndex(viewableItems[0].index);
    }
  });

  return (
    <View>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
        )}
        horizontal
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          bottom: 0,
          position: 'absolute',
          width: '100%',
        }}
      >
        {images.map((_, index) => (
          <View
            key={index}
            style={{
              backgroundColor: activeImageIndex === index ? 'red' : '#ddd',
              width: 10,
              borderRadius: 5,
              aspectRatio: 1,
              marginHorizontal: 5,
              margin: 10,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;

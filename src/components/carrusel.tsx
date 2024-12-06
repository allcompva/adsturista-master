import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

type CarruselProps = {  
  id: string; 
};

export default function Carrusel({ id }: CarruselProps) {
  let imageSet;
  switch (id) {
    case "1":
      imageSet = [
        require('../assets/images/Laberinto1.png'),
        require('../assets/images/Laberinto2.png'),
        require('../assets/images/Laberinto3.png'),
      ];
      break;
    case "2":
      imageSet = [
        require('../assets/images/rocsen1.png'),
        require('../assets/images/rocsen2.png'),
        require('../assets/images/rocsen3.png'),
      ];
      break;
    default:
      imageSet = [
        require('../assets/images/Laberinto11.png'),
        require('../assets/images/Laberinto2.png'),
        require('../assets/images/Laberinto3.png'),
      ];
  }

  const pagerViewRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = (currentPage + 1) % imageSet.length;
      pagerViewRef.current?.setPage(nextPage);
      setCurrentPage(nextPage);
    }, 3000); 

    return () => clearInterval(interval); 
  }, [currentPage, imageSet.length]);

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        ref={pagerViewRef}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {imageSet.map((imageSource, index) => (
          <View style={styles.page} key={index}>
            <Image
              style={styles.image}
              source={imageSource}
              contentFit="cover"
              transition={1000}
            />
          </View>
        ))}
      </PagerView>
      <View style={styles.pagination}>
        {imageSet.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              currentPage === index ? styles.activeDot : styles.inactiveDot,
            ]}
            onPress={() => {
              pagerViewRef.current?.setPage(index);
              setCurrentPage(index);
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  pagerView: {
    marginTop: -50,
    height: 400, 
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width, 
    height: 400, 
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000', 
  },
  inactiveDot: {
    backgroundColor: '#ccc', 
  },
});

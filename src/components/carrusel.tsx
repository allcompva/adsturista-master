import React from "react";
import { View, FlatList, Image, Dimensions, StyleSheet, Text } from "react-native";

const screenWidth = Dimensions.get("window").width;

interface CarouselProps {
  image: string[]; 
}

const Carousel: React.FC<CarouselProps> = ({ image }) => {
  if (!image || image.length === 0) {
    return <Text style={styles.noImagesText}>No hay imágenes disponibles</Text>;
  }
  console.log("Esto llega a carrusel: ", image)
console.log("Images en carruselr", image);
  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: `https://recreas.net/assets/images/${item}` }} 
        style={styles.image}
        onError={(error) => console.error("Error cargando la imagen:", `https://recreas.net/assets/images/${item}`, error.nativeEvent)}
      />
    </View>
  );

  return (
    <FlatList
      data={image}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: screenWidth,

  },
  image: {
    width: '100%',
    height: 350,
    borderRadius: 10,
  },
  noImagesText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Carousel;

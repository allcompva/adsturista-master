import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../MainNavigator/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoriteEvents from "../FavoriteEvents";

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DetailsScreen"
>;

interface CardProps {
  title: string;
  description: string;
  imageUrl: ImageSourcePropType;
  id: string;
  _isFavorite: Boolean;
  idP: number;
  onReload?: () => void;
  showExtra: boolean;
  focusKey?: number;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  id,
  _isFavorite,
  idP,
  onReload,
  showExtra,
  focusKey,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const navigation = useNavigation<DetailsScreenNavigationProp>();

  useEffect(() => {
    const checkFavorite = async () => {
      const existingFavorites = await AsyncStorage.getItem("@favorites");
      const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
      setIsFavorite(favorites.some((fav: any) => fav.id === idP));
    };
    checkFavorite();
    // Escuchar cambios globales de favoritos
    const handler = () => checkFavorite();
    FavoriteEvents.on("favoritesChanged", handler);
    return () => {
      FavoriteEvents.off("favoritesChanged", handler);
    };
  }, [idP, focusKey]);

  const handleFavoriteToggle = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem("@favorites");
      let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
      let updatedFavorites;

      if (isFavorite) {
        updatedFavorites = favorites.filter((fav: any) => fav.id !== idP);
        console.log("Favorito eliminado:", idP);
      } else {
        if (!favorites.some((fav: any) => fav.id === idP)) {
          updatedFavorites = [
            ...favorites,
            {
              id: idP,
              title,
              description,
              imageUrl,
              id_comercio: id,
              is_favorite: true,
            },
          ];
          console.log("Favorito agregado:", idP);
        } else {
          updatedFavorites = favorites;
        }
      }

      await AsyncStorage.setItem(
        "@favorites",
        JSON.stringify(updatedFavorites)
      );
      setIsFavorite(!isFavorite);
      if (onReload) onReload();
      FavoriteEvents.emit("favoritesChanged");
      console.log("Favoritos actuales:", updatedFavorites);
    } catch (error) {
      console.log("Error al guardar/eliminar favorito:", error);
    }
  };

  const handlePress = () => {
    navigation.navigate("DetailsScreen", { id, isFavorite });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      <ImageBackground
        source={imageUrl}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.footer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.content}>
              {description}
            </Text>
          </View>
          {!showExtra && (
            <TouchableOpacity
              onPress={handleFavoriteToggle}
              style={styles.iconContainer}
            >
              <MaterialCommunityIcons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? "#FF6B00" : "white"}
              />
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    height: 144,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 12,
    alignSelf: "center",
    elevation: 4,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 80,
  },
  textContainer: {
    flex: 4,
    paddingRight: 10,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    color: "white",
    fontSize: 14,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Card;

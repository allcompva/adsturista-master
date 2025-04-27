import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import Card from "../components/card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/header";
import FavoriteEvents from "../FavoriteEvents";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const storedFavorites = await AsyncStorage.getItem("@favorites");
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
    FavoriteEvents.on("favoritesChanged", loadFavorites);
    return () => {
      FavoriteEvents.off("favoritesChanged", loadFavorites);
    };
  }, [loadFavorites]);

  if (loading) {
    return <Text>Cargando favoritos...</Text>;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/fondo4.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        {favorites.length === 0 ? (
          <Text style={styles.noFavorites}>No tienes favoritos guardados</Text>
        ) : (
          favorites.map((item: any) => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              id={item.id_comercio}
              _isFavorite={true}
              idP={item.id}
              showExtra={false}
              onReload={loadFavorites}
            />
          ))
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    padding: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  noFavorites: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});

export default FavoritesScreen;

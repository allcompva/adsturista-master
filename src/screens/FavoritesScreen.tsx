import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, Text, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Card from '../components/card';
import Header from '../components/header';
import GlobalStyles from '../styles/GlobalStyles';
import { useAuth } from '../contexts/AuthContext';

interface Item {
  id_comercio: number;
  nombre: string;
  resenia: string;
  fotos: string;
  is_favorite: boolean;
  id: number;
}

export default function FavoritesScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const { user } = useAuth();

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch(`https://recreas.net/BackEnd/Favoritos/GetByMail?mail=${user?.email}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [fetchItems])
  );

  return (
    <ImageBackground
      source={require('../assets/fondo4.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.tabViewContainer}>
        <Text style={{ paddingLeft: 25, fontSize: 24, fontWeight: '600', textAlign: 'left', width: '100%', paddingTop: 0, paddingBottom: 25 }}>Favoritos</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {items.length > 0 ? (
            items.map((item) => (
              <View key={item.id_comercio} style={styles.cardContainer}>
                <Card
                  title={item.nombre}
                  description={item.resenia}
                  imageUrl={{ uri: `https://recreas.net/assets/images/${item.fotos.split(',')[0]}` }}
                  id={item.id_comercio.toString()}
                  _isFavorite={item.is_favorite}
                  idP={item.id}
                  onReload={fetchItems}
                  showExtra={true}
                />
              </View>
            ))
          ) : (
            <Text>No hay datos disponibles</Text>
          )}
        </ScrollView>
        </View>
        </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%' },
  header: { height: 100, marginTop: 0 },
  tabViewContainer: { flex: 1 },

  scrollContainer: {
    paddingBottom: 150,
  },
  cardContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});


import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useFetch } from '../../hooks/useFetch'; // Importa el hook
import Card from '../card';
import LoadingIndicator from  '../LoadingIndicator/LoadingIndicator';

const ThirdRoute = () => {
  const { data, loading, error } = useFetch('https://recreas.net/BackEnd/Tur_publicaciones/GetByCategoria?id=3');

  if (loading) {
    return <LoadingIndicator message="Cargando datos..." />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {data.map((item) => (
        <View style={styles.cardContainer} key={item.id}>
          <Card
            title={item.nombre}
            description={item.resenia}
            imageUrl={{ uri: 'https://recreas.net' + item.img }} 
            id={item.id_comercio}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { padding: 10 },
  cardContainer: { marginBottom: 10 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16 },
});

export default ThirdRoute;

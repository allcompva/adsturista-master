import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useFetch } from '../../hooks/useFetch';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import Card from '../card';
import { useAuth } from '../../contexts/AuthContext';


const FirstRoute = () => {

  const { user } = useAuth();
  const { data, loading, error } = useFetch(`https://recreas.net/BackEnd/Tur_publicaciones/GetByCategoriaMail?id=1&mail=${user?.email}`);

  if (loading) {
    return <LoadingIndicator message="Cargando actividades..." />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  var v = data[0].fotos.split(',');
  console.log(v[0]);
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {data.map((item) => (

        <View style={styles.cardContainer} key={item.id_comercio}>

          <Card
            title={item.nombre}
            description={item.resenia}
            imageUrl={{ uri: `https://recreas.net/assets/images/${item.fotos.split(',')[0]}` }}
            id={item.id_comercio}
            _isFavorite={item.is_favorite}
            idP={item.id}
            showExtra={false}
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

export default FirstRoute;

import React from 'react';
import { View, ScrollView, Text, StyleSheet, ImageBackground } from 'react-native';
import Card from '../components/card';
import Header from '../components/header';
import GlobalStyles from '../styles/GlobalStyles';

export default function FavoritesScreen() {
  return (
    <ImageBackground
      source={require('../assets/fondo3.png')} 
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.header}>
        <Header />
      </View>
      <View >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.cardContainer}>

            <Card
              title="Laberinto de Nono"
              description="El parque tiene añ laberintos incluyendo el tradicional... Leer más"
              imageUrl={require('../assets/images/loscocos.png')}
              id="1"
            />
          </View>
          <View style={styles.cardContainer}>
            <Card
              title="Cabaña de diseño y naturaleza"
              description="Cabaña de diseño y naturaleza a una cuadra del río está en Córdoba..."
              imageUrl={require('../assets/images/Alojamiento1.png')}
              id="4"
            />
          </View>
          <View style={styles.cardContainer}>
            <Card
              title="El Nazareno"
              description="Con una trayectoria de más de 20 años, la marca oriunda de Traslasierra y..."
              imageUrl={require('../assets/images/Comercio1.png')}
              id="7"
            />
          </View>
          <View style={styles.cardContainer}>
            <Card
              title="La Terraza Resto-Bar"
              description="Desayuno, Almuerzo, Cena, Brunch, Abierto hasta tarde..."
              imageUrl={require('../assets/images/Resto1.png')}
              id="10"
            />
          </View>
          <View style={styles.cardContainer}>
            <Card
              title="Plaza de Nono"
              description="Feria de artesanías y producto regionales: Todos los días desde las 19 horas..."
              imageUrl={require('../assets/images/Resto2.png')}
              id="11"
            />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%', 

  },
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 80, 
    marginTop: 50,
  },
  scrollContainer: {
    paddingBottom: 180,
  },
  cardContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});

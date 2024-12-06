
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Button, ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import Header from '../components/header';
import Card from '../components/card';
import GlobalStyles from '../styles/GlobalStyles';


type RootStackParamList = {
  LoginScreen: undefined;
  Main: undefined;
};

type InfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface Props {
  navigation: InfoScreenNavigationProp;
}

const InfoScreen: React.FC<Props> = ({ navigation }) => {
  const handleSkip = () => {
    navigation.navigate('Main'); 
  };

  const handleContinue = () => {
    navigation.navigate('Main'); 
  };
  return (
    <ImageBackground
      source={require('../assets/fondo2.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '15%', width: '100%' }}>
        <Text style={{ fontSize: 24, fontWeight: '700', textAlign: 'center', marginTop: 85, }}>Reciclaje y Cuidado del Medio Ambiente</Text>
        <Text style={{ fontSize: 16, fontWeight: '400', textAlign: 'center', marginTop: 15, paddingHorizontal: 25 }}>Reciclar es una acción simple.
          Descubre las mejores prácticas, y cómo integrarlas en tu día a día.</Text>
        <Image
          source={require('../assets/images/video.png')}
          style={{ width: '80%', marginTop: 15 }}
        />
        <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', marginTop: 5, paddingHorizontal: 25 }}>
          Cómo separar correctamente los residuos</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Cargar mas recursos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Ir al inicio</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>

      </View>
    </ImageBackground>
  )
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    width: '100%', 
  },  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  skipText: {
    width: '100%',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: '5%',
    textAlign: 'center',
    justifyContent: 'center',
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    maxWidth: '80%',
  },
  button: {
    backgroundColor: '#ff6b00',
    padding: 10,
    height: 50,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },

  video: {
    width: 350,
    height: 275,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8', 
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  videoContainer: {
    width: width - 40,
    height: (width - 40) * (514 / 914), 
    alignSelf: 'center',
    marginVertical: 20,
  },
  textContainer: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default InfoScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Linking, ScrollView } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Carrusel from '../components/carrusel';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../MainNavigator/types';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import { useFetchObject } from "../hooks/useFetchObject";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DetailsScreen'>;
// Tipos para navegación y rutas
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'DetailsScreen'>;



interface Props {
  navigation: LoginScreenNavigationProp;
}

interface Datos {
  cuit: string;
  titulo: string;
  direccion: string;
  maps: string;
  whatsapp: string;
  descripcion: string;
  images: string;
}
const DetailsScreen: React.FC<Props> = ({ navigation }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const route = useRoute<DetailsScreenRouteProp>();
  const { id } = route.params;
  let ids = "";
  if (id != undefined) {
    ids = id;
  }

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const { data, loading, error } = useFetchObject<Datos>(
    `https://recreas.net/BackEnd/Tur_comercio/getDetails?cuit=${id}`
  );

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  let cel = "www.google.com";
  if (data?.whatsapp != undefined && data?.whatsapp != null) {
    cel = data?.whatsapp;
  }

  const openWhatsApp = () => {
    const phoneNumber = cel; // Reemplaza con el número de teléfono
    const whatsappURL = `https://wa.me/${phoneNumber}`;
    Linking.openURL(whatsappURL).catch((err) =>
      console.error("Error al abrir WhatsApp:", err)
    );
  };

  let mapa = "www.google.com";
  if (data?.maps != undefined && data?.maps != null) {
    mapa = data?.maps;
  }
    // Función para abrir Google Maps
    const openGoogleMaps = () => {
      const googleMapsURL = mapa;
      Linking.openURL(googleMapsURL).catch((err) =>
        console.error("Error al abrir Google Maps:", err)
      );
    };
  
  return (
    <SafeAreaView style={styles.container}>
      <><View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer2}>
          <Ionicons name="chevron-back-outline" style={styles.backIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavoriteToggle} style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={36}
            color={isFavorite ? 'orange' : '#FF6B00'} />
        </TouchableOpacity>
      </View><View style={styles.carruselContainer}>
          <Carrusel id={ids} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{data?.titulo}</Text>
          <Text style={styles.description}>{data?.direccion}</Text>

          {/* Enlace a Google Maps */}
          <TouchableOpacity style={styles.link} onPress={openGoogleMaps}>
          <FontAwesome name="map-marker" size={24} color="green" style={styles.icon} />
            <Text style={styles.text}>Ubicación exacta</Text>
          </TouchableOpacity>

          {/* Enlace a WhatsApp */}
          <TouchableOpacity style={styles.link} onPress={openWhatsApp}>
            <FontAwesome name="whatsapp" size={24} color="green" style={styles.icon} />
            <Text style={styles.text}>Chat directo</Text>
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.infoText}>
              {data?.descripcion}
            </Text>
         </ScrollView>
        </View></>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 30,
    height: 120,
    backgroundColor: 'white',
  },
  backIcon: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FF6B00',
  },
  carruselContainer: {
    height: '50%',
    backgroundColor: 'gray',
  },
  contentContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    height: '60%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FF6B00',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 20,
    lineHeight: 20,
    color: '#666',
  },
  description: {
    fontSize: 15,
    color: '#666',
    marginBottom: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer2: {
    position: 'absolute',
    left: 20,
    bottom: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: { padding: 10 },
  cardContainer: { marginBottom: 10 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16 },
  link: {
    flexDirection: "row", // Alinea ícono y texto horizontalmente
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f5f5f5", // Fondo para el botón
  },
  icon: {
    marginRight: 12, // Espaciado entre el ícono y el texto
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
});

import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, SafeAreaView, Alert } from 'react-native';
import { WebView } from "react-native-webview";
import Header from '../components/header';
import { Provider } from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';

type RootStackParamList = {
  LoginScreen: undefined;
  Main: undefined;
};

type InfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface Props {
  navigation: InfoScreenNavigationProp;
}

interface Video {
  id_youtube: string; 
  titulo: string;
  resenia: string;
  pie: string;
}

const { width: screenWidth } = Dimensions.get('window');

const InfoScreen: React.FC<Props> = ({ navigation }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);


  const fetchVideos = async () => {
    try {
      const response = await fetch("https://recreas.net/BackEnd/Tur_videos/read"); 
      if (!response.ok) {
        throw new Error("Error al obtener los videos");
      }
      const data: Video[] = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error al cargar los videos:", error);
      Alert.alert("Error", "No se pudieron cargar los videos.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchVideos();
  }, []);


  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      Alert.alert("Aviso", "Este es el primer video.");
    }
  };

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      Alert.alert("Aviso", "Este es el último video.");
    }
  };


  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <LoadingIndicator />
        <Text>Cargando videos...</Text>
      </SafeAreaView>
    );
  }

 
  if (videos.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No hay videos disponibles.</Text>
      </SafeAreaView>
    );
  }

  const currentVideo = videos[currentIndex];

  return (
    <Provider>
      <SafeAreaView style={[styles.container, { marginTop: 0 }]}>
        <ImageBackground
          source={require('../assets/fondo4.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.header}>
            <Header />
          </View>
          <View>
            <Text style={styles.title}>{currentVideo.titulo}</Text>
            <Text style={styles.subtitle}>{currentVideo.resenia}</Text>
          </View>
          <View style={styles.webviewContainer}>
            <WebView
              source={{ uri: `https://www.youtube.com/embed/${currentVideo.id_youtube}?autoplay=1&controls=0&modestbranding=1` }}
              allowsFullscreenVideo
            />
          </View>
          <View>
            <Text style={styles.footer}>{currentVideo.pie}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonL} onPress={handlePrevious}>
                <Text style={styles.buttonText}>{"\u003C"} Anterior</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonR} onPress={handleNext}>
                <Text style={styles.buttonText}>Próximo {"\u003E"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 40,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 15,
    paddingHorizontal: 25,
  },
  webviewContainer: {
    flexDirection: "row",
    height: 250,
    paddingHorizontal: 25,
    marginTop: 25,
    borderRadius: 10,
    overflow: "hidden",

  },
  footer: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
    paddingHorizontal: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 50,
  },

  buttonR: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonL: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color:'white'
  },
});

export default InfoScreen;

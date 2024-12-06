import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Button,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../styles/GlobalStyles";
import { signInWithGoogle, signOutWithGoogle } from "../hooks/usegoogle";
import { useAuth } from '../contexts/AuthContext'; // Ajusta la ruta según tu estructura
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  LoginScreen: undefined;
  FormScreen: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

const { height: screenHeight } = Dimensions.get("window");



const LoginSocial: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth(); // Acceso al contexto



  const handleSignInGoogle = async () => {
    await signInWithGoogle(
      async (userCredential) => {
        const user = userCredential.user;
        
        // Guardar los datos del usuario en AsyncStorage
        try {
          await AsyncStorage.setItem('@user', JSON.stringify(user));
          console.log('Usuario guardado en AsyncStorage');
        } catch (error) {
          console.error('Error al guardar el usuario:', error);
        }
  
        // Configurar el estado global/local del usuario
        setUser(user);
        navigation.navigate("FormScreen");
      },
      setIsLoading
    );
  };

  const handleSignOut = async () => {
    await signOutWithGoogle();
    setUser(null); // Restablecer el estado del usuario después de cerrar sesión
  };
  return (
    <ImageBackground
      source={require("../assets/fondo2.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Inicia sesión en tu</Text>
            <Text style={styles.titleText}>cuenta!</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={GlobalStyles.buttonWithIcon}
              // onPress={() => navigation.navigate("FormScreen")}
              onPress={handleSignInGoogle}
            >
              <Image
                source={require("../assets/images/google.png")}
                style={GlobalStyles.buttonIcon}
              />
              <Text style={GlobalStyles.buttonIconText}>
                Continúa con Google
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer2}>
            <TouchableOpacity
              style={GlobalStyles.buttonWithIcon}
              onPress={() => navigation.navigate("FormScreen")}
            >
              <Image
                source={require("../assets/images/facebook.png")}
                style={GlobalStyles.buttonIcon}
              />
              <Text style={GlobalStyles.buttonIconText}>
                Continúa con Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading && <Text>Cargando...</Text>}



      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginBottom: 0,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 0,
  },
  titleContainer: {
    textAlign: "center",
    marginVertical: 0,
    top: "35%",
    marginBottom: 40,
    paddingLeft: 0,
    position: "absolute",
  },
  titleText: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: "50%",
  },
  buttonContainer2: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: "55%",
  },
  
});

export default LoginSocial;

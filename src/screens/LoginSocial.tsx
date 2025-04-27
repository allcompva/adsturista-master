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
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../styles/GlobalStyles";
import { signInWithGoogle } from "../hooks/usegoogle";
import { useAuth } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDemoAuth } from "../contexts/DemoAuthContext";

type RootStackParamList = {
  LoginSocial: undefined;
  FormScreen: undefined;
  Main: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoginSocial"
>;

const LoginSocial: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();
  const { setUser: setDemoUser } = useDemoAuth();

  useEffect(() => {
    const checkSession = async () => {
      const user = await AsyncStorage.getItem("@user");
      const formStatus = await AsyncStorage.getItem("@formCompleted");

      if (user) {
        navigation.replace(formStatus ? "Main" : "FormScreen");
      }
    };

    checkSession();
  }, []);

  // const handleSignInGoogle = async () => {
  //   await signInWithGoogle(
  //     async (userCredential) => {
  //       const user = userCredential.user;

  //       try {

  //         await AsyncStorage.setItem("@user", JSON.stringify(user));

  //         console.log(JSON.stringify(user));
  //         const data = {
  //           nombre: user.displayName,
  //           mail: user.email,
  //           photo: user.photo,
  //         };

  //         const response = await fetch(
  //           "https://recreas.net/backend/tur_turista/insert",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(data),
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error("Error al insertar el usuario en la API");
  //         }

  //         const formStatus = await AsyncStorage.getItem("@formCompleted");
  //         const isFormCompleted = formStatus
  //           ? JSON.parse(formStatus).isCompleted
  //           : false;

  //         navigation.replace(isFormCompleted ? "Main" : "FormScreen");
  //       } catch (error) {
  //         console.error("Error:", error);
  //         Alert.alert("Error", "No se pudo completar la operación");
  //       }
  //     },
  //     setIsLoading
  //   );
  // };

  const fakeSignIn = async () => {
    try {
      setIsLoading(true);
      const fakeUser = {
        uid: "fake-user-123",
        email: "usuario.falso@example.com",
        displayName: "John Doe",
        photoURL: null,
        emailVerified: true,
        isAnonymous: false,
        metadata: {
          creationTime: new Date().toISOString(),
          lastSignInTime: new Date().toISOString(),
        },
        providerData: [
          {
            providerId: "google.com",
            uid: "fake-google-uid",
            displayName: "John Doe",
            email: "usuario.falso@example.com",
            phoneNumber: null,
            photoURL: null,
          },
        ],
        refreshToken: "fake-refresh-token",
        tenantId: null,
        delete: async () => {},
        getIdToken: async () => "fake-id-token",
        getIdTokenResult: async () => ({
          token: "fake-id-token",
          claims: {},
          authTime: new Date().toISOString(),
          issuedAtTime: new Date().toISOString(),
          expirationTime: new Date(Date.now() + 3600000).toISOString(),
          signInProvider: "google.com",
          signInSecondFactor: null,
        }),
        reload: async () => {},
        toJSON: () => ({}),
      };
      await AsyncStorage.setItem("@user", JSON.stringify(fakeUser));
      setDemoUser(fakeUser);
      console.log("Seteado usuario demo:", fakeUser);
      setTimeout(() => {
        navigation.replace("FormScreen");
      }, 300);
    } catch (error) {
      console.error("Error en fakeSignIn:", error);
      Alert.alert("Error", "No se pudo iniciar sesión con el usuario falso");
    } finally {
      setIsLoading(false);
    }
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
              onPress={fakeSignIn}
            >
              <Image
                source={require("../assets/images/google.png")}
                style={GlobalStyles.buttonIcon}
              />
              <Text style={GlobalStyles.buttonIconText}>
                Iniciar Sesión (Demo)
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
  },
  titleContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "700",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default LoginSocial;

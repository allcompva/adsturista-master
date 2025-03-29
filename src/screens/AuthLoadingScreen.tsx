import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const AuthLoadingScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    alert('estoy aca');
    const unsubscribe = auth().onAuthStateChanged(async (user: FirebaseAuthTypes.User | null) => {
      if (user) {
        try {
          const response = await
           fetch(`https://recreas.net/BackEnd/Tur_visitas_x_turista/IsFormComplete?mail=${user.email}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Error al verificar el estado del formulario');

          }

          const data = await response.json();
          console.log("deovolucion de isFormCompolete:", data.isFormComplete);
          if (data.isFormComplete) {
            navigation.replace('Main');
          } else {
            navigation.replace('Form');
          }
        } catch (error: any) {
          Alert.alert('Error', error.message || 'Ocurrió un error');
          navigation.replace('Form');
        }
      } else {
        navigation.replace('Form');
      }
    });

    return () => unsubscribe(); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthLoadingScreen;

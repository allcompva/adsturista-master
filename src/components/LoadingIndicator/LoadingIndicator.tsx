import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

interface LoadingIndicatorProps {
  message?: string; // Mensaje opcional que puedes mostrar mientras carga
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = 'Cargando...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3498db" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupará todo el espacio disponible
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco translúcido
  },
  text: {
    marginTop: 10, // Separación entre el indicador y el texto
    fontSize: 16,
    color: '#555', // Cambia el color del texto según tu diseño
  },
});

export default LoadingIndicator;

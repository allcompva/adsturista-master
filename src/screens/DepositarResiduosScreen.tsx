import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePoints } from "../contexts/PointsContext";
import Header from "../components/header";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../MainNavigator/types";

type DepositarResiduosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DepositarResiduosScreen"
>;

const DepositarResiduosScreen = () => {
  const navigation = useNavigation<DepositarResiduosScreenNavigationProp>();
  const { points, updatePoints, addCanje } = usePoints();

  const handleDeposit = () => {
    try {
      const puntosGanados = 500;
      const newPoints = points + puntosGanados;

      updatePoints(newPoints);

      addCanje({
        id: Date.now().toString(),
        fecha: new Date().toLocaleDateString(),
        promocion: "Depósito de Residuos",
        puntos: puntosGanados,
        comercio: "Centro de Reciclaje",
      });

      Alert.alert(
        "¡Puntos Agregados!",
        `Has recibido ${puntosGanados} puntos por tu depósito de residuos.`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error("Error al procesar puntos:", error);
      Alert.alert("Error", "No se pudieron procesar los puntos");
    }
  };

  const handleSumarPuntos = () => {
    try {
      const puntosGanados = 500;
      const newPoints = points + puntosGanados;

      updatePoints(newPoints);

      addCanje({
        id: Date.now().toString(),
        fecha: new Date().toLocaleDateString(),
        promocion: "Depósito de Residuos",
        puntos: puntosGanados,
        comercio: "Centro de Reciclaje",
      });

      // Volver automáticamente a la pantalla anterior
      navigation.goBack();
    } catch (error) {
      console.error("Error al procesar puntos:", error);
      Alert.alert("Error", "No se pudieron procesar los puntos");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/fondo4.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Text style={styles.title}>Escanear QR</Text>
          <Text style={styles.subtitle}>
            Escanea el código QR del centro de reciclaje
          </Text>

          <TouchableOpacity style={styles.qrContainer} onPress={handleDeposit}>
            <View style={styles.qrFrame}>
              <View style={styles.qrCorner} />
              <View style={[styles.qrCorner, { top: 0, right: 0 }]} />
              <View style={[styles.qrCorner, { bottom: 0, right: 0 }]} />
              <View style={[styles.qrCorner, { bottom: 0, left: 0 }]} />
            </View>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sumButton}
              onPress={handleSumarPuntos}
            >
              <Text style={styles.sumButtonText}>Sumar Puntos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  qrContainer: {
    width: 280,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  qrFrame: {
    width: "100%",
    height: "100%",
    position: "relative",
    borderWidth: 2,
    borderColor: "darkcyan",
  },
  qrCorner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "darkcyan",
    borderWidth: 3,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  sumButton: {
    backgroundColor: "darkcyan",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },
  sumButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DepositarResiduosScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePoints } from "../contexts/PointsContext";
import { useNavigation } from "@react-navigation/native";

interface PromoProps {
  imageUrl: string;
  discount: string;
  restaurant: string;
  points: string | number;
  rating: number;
  conditions: string;
  id: string;
}

const PromoCard: React.FC<PromoProps> = ({
  imageUrl,
  discount,
  restaurant,
  points,
  rating,
  conditions,
  id,
}) => {
  const [showScanner, setShowScanner] = useState(false);
  const navigation = useNavigation();
  const { points: userPoints, updatePoints, addCanje } = usePoints();

  const handlePress = async () => {
    console.log("Presionado - Iniciando proceso de canje");

    try {
      const pointsNumber =
        typeof points === "string"
          ? parseInt(points.match(/\d+/)?.[0] || "0", 10)
          : points;

      if (pointsNumber > userPoints) {
        Alert.alert(
          "Error",
          `No tienes suficientes puntos para este canje. Necesitas ${pointsNumber} puntos.`
        );
        return;
      }

      setShowScanner(true);
    } catch (error) {
      console.error("Error en handlePress:", error);
      Alert.alert("Error", "Ocurrió un error al procesar la solicitud");
    }
  };

  const handleCanje = () => {
    try {
      const pointsNumber =
        typeof points === "string"
          ? parseInt(points.match(/\d+/)?.[0] || "0", 10)
          : points;

      const newPoints = userPoints - pointsNumber;
      updatePoints(newPoints);

      addCanje({
        id: Date.now().toString(),
        fecha: new Date().toLocaleDateString(),
        promocion: discount,
        puntos: pointsNumber,
        comercio: restaurant,
      });

      setShowScanner(false);

      Alert.alert(
        "Transacción exitosa",
        `Has canjeado ${pointsNumber} puntos por ${discount} en ${restaurant}`,
        [
          {
            text: "Ver historial",
            onPress: () => navigation.navigate("CanjesHistoryScreen"),
          },
        ]
      );
    } catch (error) {
      console.error("Error en handleCanje:", error);
      Alert.alert("Error", "Ocurrió un error al procesar el canje");
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.discount}>
          <Text style={styles.discountText}>{discount}</Text>
        </View>

        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.restaurant}>{restaurant}</Text>
          <Text style={styles.points}>
            {typeof points === "number" ? `${points} pts` : points}
          </Text>

          <View style={styles.rating}>
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name={i < rating ? "star" : "star-outline"}
                size={18}
                color="#FFD700"
              />
            ))}
          </View>

          <Text style={styles.conditions}>{conditions}</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={showScanner} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Escanear el código QR del comercio
            </Text>

            <View style={styles.qrContainer}>
              <View style={styles.qrFrame}>
                <View style={styles.qrCorner} />
                <View style={[styles.qrCorner, { top: 0, right: 0 }]} />
                <View style={[styles.qrCorner, { bottom: 0, right: 0 }]} />
                <View style={[styles.qrCorner, { bottom: 0, left: 0 }]} />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowScanner(false)}
              >
                <Text style={styles.buttonTextCancel}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonCanjear]}
                onPress={handleCanje}
              >
                <Text style={styles.buttonTextCanjear}>Canjear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
    flex: 1,
  },
  discount: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FFD700",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    zIndex: 1,
  },
  discountText: {
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  info: {
    padding: 10,
  },
  restaurant: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  points: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  rating: {
    flexDirection: "row",
    marginVertical: 5,
  },
  conditions: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginBottom: 40,
    textAlign: "center",
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
    borderColor: "white",
  },
  qrCorner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "white",
    borderWidth: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  buttonCanjear: {
    backgroundColor: "#007AFF",
  },
  buttonTextCancel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  buttonTextCanjear: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default PromoCard;

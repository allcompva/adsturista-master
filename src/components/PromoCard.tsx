import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PromoProps {
  imageUrl: string;
  discount: string;
  restaurant: string;
  points: string;
  rating: number;
  conditions: string;
}

const PromoCard: React.FC<PromoProps> = ({ imageUrl, discount, restaurant, points, rating, conditions }) => {
  return (
    <View style={styles.card}>
      {/* Descuento */}
      <View style={styles.discount}>
        <Text style={styles.discountText}>{discount}</Text>
      </View>

      {/* Imagen */}
      <Image source={{ uri: imageUrl }} style={styles.image} />

      {/* Información */}
      <View style={styles.info}>
        <Text style={styles.restaurant}>{restaurant}</Text>
        <Text style={styles.points}>{points} pts.</Text>

        {/* Estrellas */}
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

        {/* Condiciones */}
        <Text style={styles.conditions}>{conditions}</Text>
      </View>
    </View>
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
    flex: 1, // Para que las tarjetas ocupen el mismo espacio en la fila
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
  },
  info: {
    padding: 10,
  },
  restaurant: {
    fontWeight: "bold",
    fontSize: 16,
  },
  points: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
  },
  rating: {
    flexDirection: "row",
    marginVertical: 5,
  },
  conditions: {
    fontSize: 12,
    color: "gray",
  },
});

export default PromoCard;

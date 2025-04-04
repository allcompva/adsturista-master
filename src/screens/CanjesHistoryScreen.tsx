import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { usePoints } from "../contexts/PointsContext";
import Header from "../components/header";

const CanjesHistoryScreen = () => {
  const { canjes } = usePoints();

  const renderItem = ({ item }) => (
    <View style={styles.canjeItem}>
      <View style={styles.canjeHeader}>
        <Text style={styles.comercioText}>{item.comercio}</Text>
        <Text style={styles.fechaText}>{item.fecha}</Text>
      </View>
      <Text style={styles.promocionText}>{item.promocion}</Text>
      <Text style={styles.puntosText}>-{item.puntos} pts</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/fondo4.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Text style={styles.title}>Historial de Canjes</Text>
          {canjes.length > 0 ? (
            <FlatList
              data={canjes}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay canjes realizados</Text>
            </View>
          )}
        </View>
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
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  canjeItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  canjeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  comercioText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fechaText: {
    color: "#666",
  },
  promocionText: {
    fontSize: 14,
    marginBottom: 5,
  },
  puntosText: {
    fontSize: 16,
    color: "#FF6B00",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});

export default CanjesHistoryScreen;

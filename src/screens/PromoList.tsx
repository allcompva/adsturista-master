import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import PromoCard from "../components/PromoCard";
import { useAuth } from "../contexts/AuthContext";
import { usePoints } from "../contexts/PointsContext";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../MainNavigator/types";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InfoScreen"
>;

interface PromoData {
  id: string;
  imageUrl: string;
  discount: string;
  restaurant: string;
  points: string;
  rating: number;
  conditions: string;
}

const PromoList = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [promos, setPromos] = useState<PromoData[]>([]);
  const { user } = useAuth();
  const { points } = usePoints();

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const response = await fetch(
          "https://recreas.net/backend/Promopuntos/read"
        );
        const data = await response.json();
        setPromos(data);
      } catch (error) {
        console.error("Error cargando promociones:", error);
      }
    };

    fetchPromos();
  }, []);

  const handlePress = () => {
    navigation.navigate("CanjesHistoryScreen");
  };

  const handlePress2 = () => {
    navigation.navigate("PuntosAcumuladosScreen");
  };

  return (
    <ImageBackground
      source={require("../assets/fondo4.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            marginBottom: 0,
            paddingLeft: 20,
            marginLeft: 0,
            textAlign: "left",
          }}
        >
          Buenos dias {user?.displayName}!
        </Text>

        <View
          style={{
            padding: 15,
            marginHorizontal: 20,
            borderRadius: 15,
          }}
        >
          <Text style={{ fontSize: 14, textAlign: "left", marginTop: 0 }}>
            Mis Puntos
          </Text>
          <Text style={styles.title}>
            {points}
            <Text style={{ fontSize: 14 }}> pts</Text>
          </Text>
          <TouchableOpacity
            onPress={handlePress2}
            style={{
              borderColor: "darkcyan",
              borderWidth: 1,
              backgroundColor: "darkcyan",
              width: "50%",
              right: 0,
              position: "absolute",
              top: 15,
              padding: 10,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Depositar Residuos
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={{ fontSize: 20, paddingLeft: 20 }}>Catalogo</Text>
          <TouchableOpacity
            onPress={handlePress}
            style={{
              width: "50%",
              right: 20,
              position: "absolute",
              top: 0,
              padding: 0,
            }}
          >
            <Text
              style={{
                textAlign: "right",
                color: "blue",
                fontSize: 18,
                fontWeight: "600",
                textDecorationLine: "underline",
              }}
            >
              Mis Canjes
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={promos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PromoCard
              id={item.id}
              imageUrl={`https://recreas.net/assets/img_promo_puntos/${item.imageUrl}`}
              discount={item.discount}
              restaurant={item.restaurant}
              points={item.points}
              rating={item.rating}
              conditions={item.conditions}
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 0,
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
    color: "darkcyan",
  },
  list: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default PromoList;

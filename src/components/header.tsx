import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../MainNavigator/types";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InfoScreen'>;

const Header: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  // Maneja la navegación al presionar el ícono de información
  const handlePressInfo = () => {
    navigation.navigate('InfoScreen'); // Navega a la pantalla InfoScreen
  };
  const handlePress = () => {
    navigation.navigate('PuntosAcumuladosScreen'); // Navega a la pantalla InfoScreen
  };
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.logoIcon}
        resizeMode="cover"
        source={require('../assets/images/logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "transparent",
    width: "100%",
    height: 88,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 5,
    marginTop:0,
  },
  logoIcon: {
    width: 80,
    height: 73,
  },
  pointsText: {
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 21,
    fontWeight: "700",
    color: "#000",
  },
  infoIcon: {
    width: 24,
    height: 24,
  },
});

export default Header;

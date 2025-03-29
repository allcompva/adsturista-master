import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../MainNavigator/types";
import { Ionicons } from "@expo/vector-icons";
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InfoScreen'>;

const Header: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handlePressInfo = () => {
    navigation.navigate('InfoScreen');
  };
  const handlePress = () => {
    navigation.navigate('PromoList');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.left} >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.center}>
        <Image
          style={styles.logoIcon}
          resizeMode="cover"
          source={require('../assets/images/logo.png')}
        />
      </View>
      <View>
        <TouchableOpacity onPress={handlePress} style={styles.right}>
          <Text style={styles.pointsText}>Puntos </Text>
          <Ionicons name="information-circle-outline" size={24} color="darkcyan" />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  left: {
    flex: 1,
  },
  center: {
    flex: 4,
    alignItems: "center",
  },
  right: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: 80,
    height: 50,
    resizeMode: "contain",
  },

  logoIcon: {
    width: 100,
    height: 73,
  },
  pointsText: {
    fontSize: 18,
    letterSpacing: 0.6,
    lineHeight: 21,
    fontWeight: "700",
    color: "darkcyan",
  },
  infoIcon: {
    width: 24,
    height: 24,
  },
});

export default Header;

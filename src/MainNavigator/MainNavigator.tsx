import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import InfoScreen from "../screens/InfoScreen";
import LoginSocial from "../screens/LoginSocial";
import FormScreen from "../screens/FormScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DetailsScreen from "../screens/DetailsScreen";
import PromoList from "../screens/PromoList";
import PuntosAcumuladosScreen from "../screens/PuntosAcumuladosScreen";
import CanjesHistoryScreen from "../screens/CanjesHistoryScreen";
import DepositarResiduosScreen from "../screens/DepositarResiduosScreen";

import { useAuth } from "../contexts/AuthContext";
import { PointsProvider } from "../contexts/PointsContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF6B00",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notificaciones"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={InfoScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  const { user, isLoading } = useAuth();
  const [initialRoute, setInitialRoute] = useState<string>("LoginSocial");

  useEffect(() => {
    const checkSession = async () => {
      const user = await AsyncStorage.getItem("@user");
      const formStatus = await AsyncStorage.getItem("@formCompleted");

      if (user) {
        const isFormCompleted = formStatus
          ? JSON.parse(formStatus).isCompleted
          : false;
        setInitialRoute(isFormCompleted ? "Main" : "FormScreen");
      } else {
        setInitialRoute("LoginSocial");
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (!Device.isDevice) {
        Alert.alert(
          "Dispositivo no compatible",
          "Debe usar un dispositivo físico para recibir notificaciones push."
        );
        return;
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("Permisos no concedidos para notificaciones.");
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Expo Push Token:", token);

      try {
        await fetch(
          `https://recreas.net/BackEnd/Tur_turista/setToken?email=${user?.email}&token=${token}`,
          {
            method: "GET",
          }
        );
        console.log("Token registrado correctamente.");
      } catch (error) {
        console.error("Error al registrar el token:", error);
      }
    };

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notificación recibida:", notification);
        Alert.alert(
          notification.request.content.title
            ? notification.request.content.title
            : "",
          notification.request.content.body
            ? notification.request.content.body
            : ""
        );
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Interacción con la notificación:", response);
      });

    registerForPushNotificationsAsync();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [user]);

  if (!initialRoute) return null;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <PointsProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={initialRoute}
        >
          <Stack.Screen name="LoginSocial" component={LoginSocial} />
          <Stack.Screen name="FormScreen" component={FormScreen} />
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="PromoList" component={PromoList} />
          <Stack.Screen
            name="PuntosAcumuladosScreen"
            component={PuntosAcumuladosScreen}
          />
          <Stack.Screen
            name="CanjesHistoryScreen"
            component={CanjesHistoryScreen}
          />
          <Stack.Screen
            name="DepositarResiduosScreen"
            component={DepositarResiduosScreen}
          />
        </Stack.Navigator>
      </PointsProvider>
    </NavigationContainer>
  );
}

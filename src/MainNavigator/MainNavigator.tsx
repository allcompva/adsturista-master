import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import InfoScreen from "../screens/InfoScreen";
import LoginScreen from "../screens/LoginScreen";
import LoginSocial from "../screens/LoginSocial";
import DetailsScreen from "../screens/DetailsScreen";
import FormScreen from "../screens/FormScreen";
import PuntosAcumuladosScreen from "../screens/PuntosAcumuladosScreen";
import TransferenciaPuntosScreen from "../screens/TransferenciaPuntosScreen";
import ConfirmacionCompraClienteSreen from "../screens/TransferenciaPuntosScreen";
import TransaccionExitoScreen from "../screens/TransaccionExitoScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginSocialScreen from "../screens/LoginSocial";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "./types";

type TabParamList = {
  Home: undefined;
  Favoritos: undefined;
  Notificaciones: undefined;
  Perfil: undefined;
  LoginS: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();
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
        name="LoginS"
        component={LoginSocialScreen}
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
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="LoginSocial"
      >
        <Stack.Screen name="LoginSocial" component={LoginSocial} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />


        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
        <Stack.Screen name="FormScreen" component={FormScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen
          name="PuntosAcumuladosScreen"
          component={PuntosAcumuladosScreen}
        />
        <Stack.Screen
          name="TransferenciaPuntosScreen"
          component={TransferenciaPuntosScreen}
        />
        <Stack.Screen
          name="ConfirmacionCompraClienteSreen"
          component={ConfirmacionCompraClienteSreen}
        />
        <Stack.Screen
          name="TransaccionExitoScreen"
          component={TransaccionExitoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

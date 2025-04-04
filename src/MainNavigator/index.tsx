import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginSocial from "../screens/LoginSocial";
import FormScreen from "../screens/FormScreen";
import Main from "../screens/Main";
import InfoScreen from "../screens/InfoScreen";
import CanjesHistoryScreen from "../screens/CanjesHistoryScreen";
import DepositarResiduosScreen from "../screens/DepositarResiduosScreen";
import { PointsProvider } from "../contexts/PointsContext";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <PointsProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginSocial" component={LoginSocial} />
          <Stack.Screen name="FormScreen" component={FormScreen} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="InfoScreen" component={InfoScreen} />
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

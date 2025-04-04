import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useAuth } from "../contexts/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  LoginScreen: undefined;
  Main: undefined;
};

type InfoScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;

interface Props {
  navigation: InfoScreenNavigationProp;
}

const FormScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const [mail_turista, setmail_turista] = useState(user?.email);

  const [days, setDays] = useState<string | null>(null);
  const [openDays, setOpenDays] = useState(false);
  const [itemsDays, setItemsDays] = useState([
    { label: "Solo hoy", value: "Solo hoy" },
    { label: "El fin de semana", value: "El fin de semana" },
    { label: "1 Semana", value: "1 Semana" },
    { label: "2 Semanas", value: "2 Semanas" },
    { label: "Mas de 2 Semanas", value: "Mas de 2 Semanas" },
  ]);

  const [purpose, setPurpose] = useState<string | null>(null);
  const [openPurpose, setOpenPurpose] = useState(false);
  const [itemsPurpose, setItemsPurpose] = useState([
    { label: "Turismo", value: "turismo" },
    { label: "Negocios", value: "negocios" },
  ]);

  const [people, setPeople] = useState<string | null>(null);
  const [openPeople, setOpenPeople] = useState(false);
  const [itemsPeople, setItemsPeople] = useState([
    { label: "Viajo Solo", value: "Viajo Solo" },
    { label: "Hasta 4 Acompañantes", value: "Hasta 4 Acompañantes" },
    { label: "Mas de 4 Acompañantes", value: "Mas de 4 Acompañantes" },
  ]);

  const [IsFirstVisit, setIsFirstVisit] = useState<string | null>(null);
  const [openFirstVisit, setOpenFirstVisit] = useState(false);
  const [itemsFirstVisit, setItemsFirstVisit] = useState([
    { label: "Si", value: "Si" },
    { label: "No", value: "no" },
  ]);

  const [TravelMethod, setTravelMethod] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Transporte Público", value: "Transporte_Público" },
    { label: "Agencia", value: "Agencia" },
    { label: "Movilidad Propia", value: "Movilidad_Propia" },
  ]);

  const handleSubmit = async () => {
    if (!days || !people || !purpose || !TravelMethod || !IsFirstVisit) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const data = {
      days,
      people,
      purpose,
      TravelMethod,
      IsFirstVisit,
      mail_turista,
    };

    try {
      console.log(data.days);
      console.log(data.people);
      console.log(data.purpose);
      console.log(data.TravelMethod);
      console.log(data.IsFirstVisit);
      console.log(data.mail_turista);
      console.log(mail_turista);
      console.log(JSON.stringify(data));

      // Verificar si es un usuario falso
      const isFakeUser = user?.uid === "fake-user-123";

      if (isFakeUser) {
        // Para usuarios falsos, simplemente guardamos el estado del formulario y navegamos
        await AsyncStorage.setItem(
          "@formCompleted",
          JSON.stringify({ isCompleted: true })
        );
        Alert.alert("", "Formulario enviado correctamente (modo falso).");
        navigation.navigate("Main");
      } else {
        // Para usuarios reales, hacemos la llamada a la API
        const response = await fetch(
          "https://recreas.net/backend/Tur_visitas_x_turista/insert",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          await AsyncStorage.setItem(
            "@formCompleted",
            JSON.stringify({ isCompleted: true })
          );
          const result = await response.json();
          Alert.alert("", "Formulario enviado correctamente.");

          console.log("Resultado:", result);
          navigation.navigate("Main");
        } else {
          const error = await response.json();
          Alert.alert(
            "Error",
            error.message || "No se pudo enviar el formulario."
          );
        }
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      Alert.alert("Error", "Ocurrió un problema al enviar el formulario.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/fondo2.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.inputContainer}>
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "500",
            marginBottom: 5,
            color: "gray",
          }}
        >
          Bienvenido
        </Text>
        {user && (
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 24,
              fontWeight: "500",
              marginBottom: 25,
            }}
          >
            {user.displayName}
          </Text>
        )}
        <View style={{ zIndex: 5 }}>
          <DropDownPicker
            open={openDays}
            value={days}
            items={itemsDays}
            setOpen={setOpenDays}
            setValue={setDays}
            setItems={setItemsDays}
            placeholder="¿Cuántos días estará aquí?"
            style={styles.inputBox}
          />
        </View>

        <View style={{ zIndex: 4 }}>
          <DropDownPicker
            open={openPeople}
            value={people}
            items={itemsPeople}
            setOpen={setOpenPeople}
            setValue={setPeople}
            setItems={setItemsPeople}
            placeholder="¿Cuántas personas lo acompañan?"
            style={styles.inputBox}
          />
        </View>

        <View style={{ zIndex: 3 }}>
          <DropDownPicker
            open={openPurpose}
            value={purpose}
            items={itemsPurpose}
            setOpen={setOpenPurpose}
            setValue={setPurpose}
            setItems={setItemsPurpose}
            placeholder="¿Visita por turismo o negocios?"
            style={styles.inputBox}
          />
        </View>
        <View style={{ zIndex: 2 }}>
          <DropDownPicker
            open={open}
            value={TravelMethod}
            items={items}
            setOpen={setOpen}
            setValue={setTravelMethod}
            setItems={setItems}
            placeholder="¿Cómo viajó?"
            style={styles.inputBox}
          />
        </View>
        <View style={{ zIndex: 1 }}>
          <DropDownPicker
            open={openFirstVisit}
            value={IsFirstVisit}
            items={itemsFirstVisit}
            setOpen={setOpenFirstVisit}
            setValue={setIsFirstVisit}
            setItems={setItemsFirstVisit}
            placeholder="¿Es su primera visita?"
            style={styles.inputBox}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  inputContainer: {
    marginTop: "40%",
    width: "84%",
    marginLeft: "8%",
    marginRight: "8%",
    maxWidth: "100%",
  },
  inputBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 20,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: "10%",
    textAlign: "center",
    justifyContent: "center",
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
    maxWidth: "80%",
  },
  button: {
    backgroundColor: "#ff6b00",
    padding: 10,
    height: 50,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default FormScreen;

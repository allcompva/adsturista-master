import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAuth } from '../contexts/AuthContext'; // Ajusta la ruta según tu estructura
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
};

type InfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface Props {
  navigation: InfoScreenNavigationProp;
}


const FormScreen: React.FC<Props> = ({ navigation }) => {
  // Estados para cada campo del formulario
  const [days, setDays] = useState('');
  const [people, setPeople] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isFirstVisit, setIsFirstVisit] = useState('');
  const [travelMethod, setTravelMethod] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Transporte Público', value: 'Transporte Público' },
    { label: 'Agencia', value: 'Agencia' },
    { label: 'Movilidad Propia', value: 'Movilidad Propia' },
  ]);

  const { user } = useAuth();

  // Función para enviar los datos al backend
  const handleSubmit = async () => {
    if (!days || !people || !purpose || !travelMethod || !isFirstVisit) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const data = {
      days,
      people,
      purpose,
      travelMethod,
      isFirstVisit,
    };

    try {
      const response = await fetch('https://example.com/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Éxito', 'Formulario enviado correctamente.');
        console.log('Resultado:', result);
        navigation.navigate('HomeScreen'); // Redirigir a la próxima pantalla
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'No se pudo enviar el formulario.');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      Alert.alert('Error', 'Ocurrió un problema al enviar el formulario.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/fondo2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.inputContainer}>
        <Text style={{ width: '100%', textAlign: 'center', fontSize: 20, fontWeight: '500', marginBottom: 5, color: 'gray' }}>
          Bienvenido
        </Text>
        {user && (
          <Text style={{ width: '100%', textAlign: 'center', fontSize: 24, fontWeight: '500', marginBottom: 25 }}>
            {user.displayName}
          </Text>
        )}

        {/* TextInput: Días de estancia */}
        <TextInput
          style={styles.inputBox}
          placeholder="¿Cuántos días estará aquí?"
          placeholderTextColor="gray"
          value={days}
          onChangeText={setDays}
        />

        {/* TextInput: Personas acompañantes */}
        <TextInput
          style={styles.inputBox}
          placeholder="¿Cuántas personas lo acompañan?"
          placeholderTextColor="gray"
          value={people}
          onChangeText={setPeople}
        />

        {/* TextInput: Propósito de la visita */}
        <TextInput
          style={styles.inputBox}
          placeholder="¿Visita por turismo o negocios?"
          placeholderTextColor="gray"
          value={purpose}
          onChangeText={setPurpose}
        />

        {/* DropDownPicker: Método de viaje */}
        <DropDownPicker
          open={open}
          value={travelMethod}
          items={items}
          setOpen={setOpen}
          setValue={setTravelMethod}
          setItems={setItems}
          placeholder="¿Cómo viajó?"
          style={styles.inputBox}
        />

        {/* TextInput: Primera vez */}
        <TextInput
          style={styles.inputBox}
          placeholder="¿Es su primera vez aquí?"
          placeholderTextColor="gray"
          value={isFirstVisit}
          onChangeText={setIsFirstVisit}
        />
      </View>

      {/* Botones */}
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
    width: '100%',
  },
  inputContainer: {
    marginTop: '40%',
    width: '84%',
    marginLeft: '8%',
    marginRight: '8%',
    maxWidth: '100%',
  },
  inputBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 20,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: '10%',
    textAlign: 'center',
    justifyContent: 'center',
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    maxWidth: '80%',
  },
  button: {
    backgroundColor: '#ff6b00',
    padding: 10,
    height: 50,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default FormScreen;

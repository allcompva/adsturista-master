import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/header';
import { Switch } from 'react-native-paper';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define el tipo de las rutas
type RootStackParamList = {
  ProfileScreen: undefined;
LoginScreen: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;
interface Props {
navigation: LoginScreenNavigationProp;
}


const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);


  const toggleSwitch = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);

  };



  const handleLogout = () => {
    navigation.navigate('LoginScreen')
  };

  return (
    <ImageBackground
      source={require('../assets/fondo4.png')} 
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.header}>
        <Header />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/images/usuario.png')} style={styles.logoUsuario} />
          <Text style={styles.userName}>Juan Perez</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={GlobalStyles.subtitleCenter}>Datos</Text>
          <View style={styles.infoRow}>
            <Icon name="mail-outline" style={styles.iconDatos} />
            <Text style={styles.infoText}>correo@gmail.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="location-outline" style={styles.iconDatos} />
            <Text style={styles.infoText}>calle, número, localidad, provincia</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="phone-portrait-outline" style={styles.iconDatos} />
            <Text style={styles.infoText}>351 6227659</Text>
          </View>
        </View>
        <View style={styles.notificationsContainer}>
          <Text style={styles.notificationsTitle}>Notificaciones</Text>
          <View style={styles.infoRow}>
            <Icon name="notifications-outline" style={styles.iconDatos} />
            <Text style={styles.infoText}>Notificaciones</Text>
            <Switch
              value={isEnabled}
              onValueChange={toggleSwitch}
              color="#FF6B00"
              style={styles.switch}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  background: {
    flex: 1,
    width: '100%', 

  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 16,
  },
  logoUsuario: {
    width: 110,
    height: 110,
  },
  userName: {
    fontSize: 33,
    fontWeight: '700',
    color: '#37733D',
    marginLeft: 20,
  },
  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    height: 80, 
    marginTop: 50,
  },
  iconDatos: {
    fontSize: 28,
    color: '#FF6B00',
  },
  infoText: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '400',
  },
  notificationsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  notificationsTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  switch: {
    position: 'absolute',
    right: 30,
  },
  logoutButton: {
    backgroundColor: '#FF6B00',
    padding: 10,
    borderRadius: 25,
    marginTop: 40,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

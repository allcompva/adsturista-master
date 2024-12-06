import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View, Text, SafeAreaView, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/header';
import { Menu, Provider } from 'react-native-paper';

const { height: screenHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const [visibleMenuIndex, setVisibleMenuIndex] = useState<number | null>(null);

  const openMenu = (index: number) => setVisibleMenuIndex(index);
  const closeMenu = () => setVisibleMenuIndex(null);

  const renderNotification = (index: number) => (
    <View key={index}>
      <View style={styles.titNoti}>
        <Text style={{ paddingLeft: 35, fontSize: 18, color: '#21005D', fontWeight: '600' }}>
          Título notificación
        </Text>
    
        <Menu
          visible={visibleMenuIndex === index}
          onDismiss={closeMenu}
          anchor={
            <Icon
              name="ellipsis-vertical-outline"
              style={styles.infoIconMenu}
              onPress={() => openMenu(index)}
            />
          }
        >
          <Menu.Item onPress={() => { closeMenu(); Alert.alert("Titulo Notificación", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."); }} title="Ver" />
          <Menu.Item onPress={() => { closeMenu(); Alert.alert("Titulo Notificación", "Esta acción marca la notificación como leida/no leida"); }} title="Marcar como leida" />
          <Menu.Item onPress={() => { closeMenu(); Alert.alert("Titulo Notificación", "Esta acción elimira la nitificación"); }} title="Eliminar" />
        </Menu>
      </View>

      <View style={styles.contNoti}>
        <Text style={{ paddingLeft: 35, fontSize: 18, color: '#21005D', fontWeight: '400', width: '90%' }}>
          Supporting line text lorem ipsum dolor sit amet, consectetur.
        </Text>
      </View>
    </View>
  );
  return (

    <Provider>
      <SafeAreaView style={[styles.container, { marginTop: 35 }]}>
        <ImageBackground
          source={require('../assets/fondo4.png')} 
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.header}>
            <Header />
          </View>

          <View>
            <Text style={{ paddingLeft: 25, fontSize: 24, fontWeight: '600', marginBottom: 15 }}>Notificaciones</Text>
          </View>


          {[...Array(6)].map((_, index) => renderNotification(index))}
        </ImageBackground>
      </SafeAreaView>
    </Provider>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%', 
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    height: 80,
    marginTop: 15,
  },
  logo: {
    width: 100,
    height: 65,
  },
  logoUsuario: {
    marginTop: 30,
    width: 134,
    height: 134,
    marginLeft: 16,
  },
  pointsText: {
    fontWeight: '600',
    fontSize: 20,
    alignItems: 'center',
    right: 50,
    position: 'absolute',
  },
  iconContainer: {
    paddingHorizontal: 20,
    marginTop: -40,
  },
  iconDatos: {
    marginLeft: 40,
    marginTop: 30,
    fontSize: 28,
    color: '#FF6B00',
    fontWeight: 700,
  },
  link: {
    fontWeight: '600',
    fontSize: 20,
    alignItems: 'center',
    right: 10,
    position: 'absolute',
  },
  infoIcon: {
    fontSize: 36,
    color: '#FF6B00',
    marginLeft: 'auto',
    right: 0,
    position: 'static',
    top: 70,
  },
  infoIconMenu: {
    fontSize: 24,
    color: '#000',
    paddingRight: 15,
  },
  titNoti: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  contNoti: {
    paddingBottom: 10,
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
  },

});

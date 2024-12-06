import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { TabView, TabBar, SceneRendererProps, NavigationState, SceneMap } from 'react-native-tab-view';
import FirstRoute from '../components/NestedTabs/FirstRoute';
import SecondRoute from '../components/NestedTabs/SecondRoute';
import ThirdRoute from '../components/NestedTabs/ThirdRoute';
import FourthRoute from '../components/NestedTabs/FourthRoute';
import Header from '../components/header';

type Route = {
  key: string;
  title: string;
};

type State = NavigationState<Route>;

export default function NestedTabsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [routes] = useState<Route[]>([
    { key: 'first', title: '¿Qué hacer?' },
    { key: 'second', title: 'Alojamiento' },
    { key: 'third', title: 'Comercio' },
    { key: 'fourth', title: 'Resto' },
  ]);

  const renderTabBar = (props: SceneRendererProps & { navigationState: State }) => (
    <View style={{ position: 'sticky' }}>
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={{ backgroundColor: "orange" }}
        style={{ backgroundColor: "#FFFFFF" }} 
        labelStyle={{ fontSize: 14 }} 
        activeColor="#000000"
        inactiveColor="#AAAAAA" 
      />
      <View style={{ height: 50, marginBottom: 10, marginTop: 40, width: '90%', marginLeft: '5%', borderRadius: 15 }}>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

      </View>
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  return (
    <ImageBackground
      source={require('../assets/fondo4.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.tabViewContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%' },
  header: { height: 100, marginTop: 45 },
  tabViewContainer: { flex: 1 },
  input: { flex: 1, height: 20, backgroundColor: 'lightgray', borderRadius: 15, paddingLeft: 20 },
  iconContainer: { width: 40, height: 20, backgroundColor: '#ccc', borderRadius: 20 },
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  indicator: {
    backgroundColor: "#ff4081",
    height: 3,
  },
});

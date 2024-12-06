import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { TabView, TabBar, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import FirstRoute from '../NestedTabs/FirstRoute';
import SecondRoute from '../NestedTabs/SecondRoute';
import ThirdRoute from '../NestedTabs/ThirdRoute';
import FourthRoute from '../../components/NestedTabs/FourthRoute';
import Header from '../../components/header';

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
    { key: 'fourth', title: 'Restaurantes' },
  ]);

  const renderScene = ({ route }: SceneRendererProps & { route: Route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
      case 'third':
        return <ThirdRoute />;
      case 'fourth':
        return <FourthRoute />;
      default:
        return null;
    }
  };

  const renderTabBar = (props: SceneRendererProps & { navigationState: State }) => (
    <View style={{ position: 'relative' }}>
      <TabBar
        {...props}
        activeColor="black"
        inactiveColor="gray"
        style={{ backgroundColor: 'transparent' }}
      />
      <View style={{ height: 86.79, marginBottom: 10, marginTop: 8, flexDirection: 'row' }}>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => console.log(searchQuery)} style={styles.iconContainer} />
      </View>
    </View>
  );

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
  background: { flex: 1 },
  header: { height: 100 },
  tabViewContainer: { flex: 1 },
  input: { flex: 1, height: 40, backgroundColor: '#fff', borderRadius: 5, paddingHorizontal: 10 },
  iconContainer: { width: 40, height: 40, backgroundColor: '#ccc', borderRadius: 20 },
});

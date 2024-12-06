import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../MainNavigator/types';

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DetailsScreen'>;

interface CardProps {
  title: string;
  description: string;
  imageUrl: ImageSourcePropType;
  id: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, id }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handlePress = () => {
    navigation.navigate('DetailsScreen', { id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
        <ImageBackground source={imageUrl} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
          <View style={styles.footer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.content}>
                {id}
              </Text>
            </View>
            <TouchableOpacity onPress={handleFavoriteToggle} style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? 'red' : 'white'}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    height: 144,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    alignSelf: 'center',
    elevation: 4,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 80,
  },
  textContainer: {
    flex: 4,
    paddingRight: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    color: 'white',
    fontSize: 14,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Card;

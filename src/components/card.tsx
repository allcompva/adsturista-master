import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../MainNavigator/types';

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DetailsScreen'>;

interface CardProps {
  title: string;
  description: string;
  imageUrl: ImageSourcePropType;
  id: string;
  _isFavorite: Boolean;
  idP: number;
  onReload?: () => void;
  showExtra: boolean;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, id, _isFavorite, idP, onReload, showExtra, }) => {
  const [isFavorite, setIsFavorite] = useState(_isFavorite);

  const navigation = useNavigation<DetailsScreenNavigationProp>();
  console.log(imageUrl);
  const { user } = useAuth();

  const handleFavoriteToggle = async () => {
    console.log("id publicacion:", idP);
    console.log("id publicacion:", user?.email);
    if(idP == 0)
    {
      return;
    }
    if(user?.email == '')
      {
        return;
      }
    const data = {
      id_publicacion: idP,
      mail: user?.email,
    };

    const response = await fetch('https://recreas.net/backend/Favoritos/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    setIsFavorite(!isFavorite);
    if (onReload) {
      console.log('Llamando a onReload desde Card');
      onReload();
    }

  };

  const handlePress = () => {
    navigation.navigate('DetailsScreen', { id, isFavorite });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      <ImageBackground source={imageUrl} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
        <View style={styles.footer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.content}>
              {description}
            </Text>
          </View>
          {!showExtra && (<TouchableOpacity onPress={handleFavoriteToggle} style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#FF6B00' : 'white'}
            />
          </TouchableOpacity>)}
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

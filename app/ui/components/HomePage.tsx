// src/HomeScreen.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/Navigation'; // Adjust the path if necessary
import PlayButton from '../../assets/svg/PlayHome.svg'; // Direct import of SVG
import AnioDuracion from '../../assets/svg/Anio-Duracion.svg';
import FavIcon from '../../assets/svg/Fav-icon.svg';
import SearchIcon from '../../assets/svg/Search-icon.svg';
import {useHomeApiQuery} from '../../redux/moviesApi';
import {useUserInfoQuery} from '../../redux/profileApi';
import {useSelector} from 'react-redux';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type Item = {
  id: string;
  title: string;
  description: string;
  year: string;
  duration: string;
  image: any;
};

const peliculas: Item[] = [];

const generos = [
  {id: '28', genero: 'Acción'},
  {id: '12', genero: 'Aventura'},
  {id: '16', genero: 'Animación'},
  {id: '35', genero: 'Comedia'},
  {id: '80', genero: 'Crimen'},
  {id: '99', genero: 'Documental'},
  {id: '18', genero: 'Drama'},
  {id: '10751', genero: 'Familia'},
  {id: '14', genero: 'Fantasía'},
  {id: '36', genero: 'Historia'},
  {id: '27', genero: 'Terror'},
  {id: '10402', genero: 'Música'},
  {id: '9648', genero: 'Misterio'},
  {id: '10749', genero: 'Romance'},
  {id: '878', genero: 'Sci-Fi'},
  {id: '10770', genero: 'TV Show'},
  {id: '53', genero: 'Suspenso'},
  {id: '10752', genero: 'Guerra'},
  {id: '37', genero: 'Oeste'},
];

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const userId = useSelector(state => state?.user?.id);
  const {data: userData} = useUserInfoQuery(userId);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [page, setPage] = useState(1);
  const {data, error, isLoading, isFetching} = useHomeApiQuery({
    genre: selectedGenre,
    page,
  });

  const handlePress_InfoPeliculaPlay = () => {
    // Handle the press event for the play button
  };

  const handlePress_InfoPeliculaImage = () => {
    // Handle the press event for the play button
  };

  const handlePress_Profile = () => {
    navigation.navigate('Profile');
  };

  const handlePress_FilterGenero = genre => {
    setPage(1);
    if (selectedGenre === genre) {
      setSelectedGenre('');
    } else {
      setSelectedGenre(genre);
    }
  };

  const handleLoadMore = () => {
    if (!isFetching && data) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const mappedMovies =
    data?.movies?.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.synopsis,
      year: movie.year,
      duration: movie.duration,
      image:
        movie.posterPic ||
        'https://i.pinimg.com/originals/2d/a9/a1/2da9a1d58af1edb4a4168f013a3d9f9f.jpg',
    })) || [];

  const renderItem: ListRenderItem<Item> = ({item}) => (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.descriptionContainer}>
            <Text
              style={styles.description}
              numberOfLines={5}
              ellipsizeMode="tail">
              {item.description}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handlePress_InfoPeliculaPlay}
          style={styles.playButtonContainer}>
          <PlayButton style={styles.playButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.anioDuracionWrapper}>
          <AnioDuracion style={styles.anioDuracion} />
          <Text style={styles.anioDuracionText}>{item.year}</Text>
        </View>
        <View style={styles.anioDuracionWrapper}>
          <AnioDuracion style={styles.anioDuracion} />
          <Text style={styles.anioDuracionText}>{item.duration+" m"}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.background}>
      <View style={styles.topFrame}>
        <TouchableOpacity onPress={handlePress_Profile}>
          <View style={styles.profileContainer}>
            <Image
              onError={e => console.log(e)}
              source={
                userData?.profileImageUrl
                  ? {
                      uri: userData.profileImageUrl,
                    }
                  : require('../../assets/images/profile.jpg')
              } // Replace with the actual user profile image URL
              style={styles.profileImage}
            />
            <Text style={styles.nickname}>{userData?.nickName}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <FavIcon style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <SearchIcon style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList
          data={generos}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.genero}
          renderItem={({item}) => (
            <View
              style={
                selectedGenre === item.id
                  ? styles.selectedGenreItem
                  : styles.genreItem
              }>
              <TouchableOpacity
                onPress={() => handlePress_FilterGenero(item.id)}>
                <Text
                  style={
                    selectedGenre === item.id
                      ? styles.selectedGenreText
                      : styles.genreText
                  }>
                  {item.genero}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <Text style={styles.titleHome}>Últimos Trailers</Text>
      {isLoading || (isFetching && page === 1 && <Text style={styles.textCharging}>Cargando...</Text>)}
      {mappedMovies?.length ? (
        <FlatList
          data={mappedMovies}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContentContainer}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={
            isFetching && page > 1 ? <Text style={styles.textCharging}>Cargando más...</Text> : null
          }
        />
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
    paddingHorizontal: 20, 
  },
  image: {
    width: 110,
    height: 171,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#FEC260',
  },
  titleHome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FEC260',
    fontFamily: 'Roboto-Regular',
    alignSelf: 'flex-start',
    textShadowColor: '#101010',
    textShadowRadius: 1,
    textShadowOffset: {width: 2, height: 2},
    marginLeft: 17,
    marginBottom: 10,
  },
  textCharging: {
    color: 'FAFAFA',
    marginLeft: 15
  },
  textContainer: {
    flex: 5,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FEC260',
    fontFamily: 'Roboto-Regular',
    paddingRight: 20,
    //alignSelf: 'flex-start',
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 14,
    color: '#FAFAFA',
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
  },
  playButtonContainer: {
    position: 'absolute',
    right: 20, // Adjust the right position to match the padding
    top: 0, // Align to the top of the row
    height: 40, // Ensure the play button container height matches the play button
    justifyContent: 'center',
  },
  playButton: {
    width: 50,
    height: 50,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 1, // Add padding for better alignment
  },
  anioDuracionWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 20, // Add spacing between the two containers
    bottom: 23,
    left: 25,
  },
  anioDuracion: {
    width: 50, // Adjust the width to fit the SVG component
    height: 50, // Adjust the height to fit the SVG component
    position: 'relative', // Ensure proper positioning for text overlay
  },
  anioDuracionText: {
    position: 'absolute', // Absolute positioning for text overlay
    width: '100%', // Ensure text width matches the SVG component
    textAlign: 'center', // Center-align text
    fontSize: 10, // Adjust the font size as needed
    color: '#FEC260',
    fontFamily: 'Roboto-Regular',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  flatListContentContainer: {
    paddingBottom: 20, // Add padding at the bottom to prevent content from being cut off
  },
  genreListContainer: {
    marginTop: 5,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  genreItem: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#FEC260',
  },
  genreText: {
    textAlign: 'center', // Center-align text
    fontSize: 14, // Adjust the font size as needed
    color: '#101010',
    fontWeight: 'bold',
  },
  selectedGenreItem: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#A12568',
  },
  selectedGenreText: {
    color: '#FAFAFA',
  },
  topFrame: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular shape
    marginRight: 10,
  },
  nickname: {
    fontSize: 18,
    color: '#FEC260',
    fontFamily: 'Roboto-Regular',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
});

export default HomeScreen;

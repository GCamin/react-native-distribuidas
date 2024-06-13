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
import FechaIcon from '../../assets/svg/Fecha-icon.svg';
import FechaIconAsc from '../../assets/svg/Fecha-icon-asc.svg';
import FechaIconDesc from '../../assets/svg/Fecha-icon-desc.svg';
import CalificacionIcon from '../../assets/svg/Calificacion-icon.svg';
import CalificacionIconAsc from '../../assets/svg/Calificacion-icon-asc.svg';
import CalificacionIconDesc from '../../assets/svg/Calificacion-icon-desc.svg';
import VolverIcon from '../../assets/svg/Volver-icon.svg';
import CustomSearchBar from './CustomSearchBar';
import CustomSearchBar2 from './CustomSearchBar2';
import {useApiSearchQuery} from '../../redux/moviesApi';
import {useSelector} from 'react-redux';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

type Item = {
  id: string;
  title: string;
  description: string;
  year: string;
  duration: string;
  image: any;
};

//const initialData: Item[] = [];

const SearchScreen: React.FC<Props> = ({navigation}) => {
  //const [data, setData] = useState<Item[]>(initialData);
  const [searchValue, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const {data, error, isLoading, isFetching} = useApiSearchQuery(
    {
      search: searchValue,
      page,
    },
    {skip: !searchValue},
  );

  const totalResults = data?.totalResults

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (!isFetching && data) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePress_InfoPeliculaPlay = () => {
    // Handle the press event for the play button
  };

  const handlePress_InfoPeliculaImage = () => {
    // Handle the press event for the play button
  };

  const handlePress_Calificacion = () => {
    // debo cambiar a boton fechaIconDesc (de fecha mas nueva a mas vieja) y si toco de nuevo a boton fechaIconAsc (de fecha mas vieja a mas nueva)
    // ordenar el listado de imagenes y dejarlo fijo (que no se pueda scrollear mas)
  };

  const handlePress_Fecha = () => {
    // debo cambiar a boton fechaIconDesc (de fecha mas nueva a mas vieja) y si toco de nuevo a boton fechaIconAsc (de fecha mas vieja a mas nueva)
    // ordenar el listado de imagenes y dejarlo fijo (que no se pueda scrollear mas)
  };

  const mappedMovies =
    data?.map.movies(movie => ({
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
              numberOfLines={6}
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
          <Text style={styles.anioDuracionText}>{item.duration}</Text>
        </View>
      </View>
    </View>
  );

  console.log('Search Value:', searchValue);
  console.log('Page:', page);
  console.log(isLoading);
  console.log(error);

  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.background}>
      <View style={styles.topFrame}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <VolverIcon style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <CustomSearchBar onSearch={handleSearch} />
      </View>
      <View style={styles.middleFrame}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <FechaIcon onPress={() => handlePress_Fecha} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <CalificacionIcon />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading || (isFetching && page === 1 && <Text>Loading...</Text>)}
      {error && <Text>Error: {error?.error}</Text>}
      {mappedMovies?.length ? (
        <FlatList
          data={mappedMovies}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContentContainer}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={
            isFetching && page > 1 ? <Text>Loading more...</Text> : null
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
    alignSelf: 'flex-start',
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
    right: 20, 
    top: 0, 
    height: 40, 
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
    paddingHorizontal: 1, 
  },
  anioDuracionWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 20, 
    bottom: 23,
    left: 25,
  },
  anioDuracion: {
    width: 50, 
    height: 50, 
    position: 'relative', 
  },
  anioDuracionText: {
    position: 'absolute', 
    width: '100%', 
    textAlign: 'center', 
    fontSize: 10, 
    color: '#FEC260',
    fontFamily: 'Roboto-Regular',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  flatListContentContainer: {
    paddingBottom: 20, 
  },
  genreListContainer: {
    marginTop: 5,
    paddingHorizontal: 12,
    marginBottom: 20,
  },

  middleFrame: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
  },
  topFrame: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  searchContainer: {
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, 
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
    marginLeft: 0,
  },
  searchContainerStyle: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#FEC260',
    backgroundColor: '#3B185F',
    width: 329,
  },
});

export default SearchScreen;

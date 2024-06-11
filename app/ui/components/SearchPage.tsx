import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, FlatList, ListRenderItem } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation'; // Adjust the path if necessary
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
import { useApiSearchQuery } from '../../redux/SearchApi';

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


const SearchScreen: React.FC<Props> = ({ navigation }) => {
    //const [data, setData] = useState<Item[]>(initialData);
    const [searchValue, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [listData, setListData] = useState<any[]>([]);
    const { data, error, isLoading, isSuccess, refetch } = useApiSearchQuery({ search: searchValue, page});

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
        setListData([]);
        refetch();
      };

    const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    };

    const handlePress_InfoPeliculaPlay = () => {
        // Handle the press event for the play button
    };

    const handlePress_InfoPeliculaImage = () => {
        // Handle the press event for the play button
    };

    const handlePress_Calificacion = () => {
        // Handle the press event for the calificacion button
    };

    const handlePress_Fecha = () => {
        // Handle the press event for the fecha button
    };


    /* const fetchData = () => {
        // Simulate fetching new data and append it to the list
        const newData = {
            id: (data.length + 1).toString(),
            title: 'New Title',
            description: 'New description that is also long enough to demonstrate text wrapping and ellipsis behavior.',
            year: '2024',
            duration: '130 min',
            image: 'https://image.tmdb.org/t/p/w500/nXIV2qGK9KkdkaOTzrpK87CuAGC.jpg'
        };
        setData([...data, newData]);
    };
 */

    const renderItem: ListRenderItem<Item> = ({ item }) => (
        <View style={styles.container}>
            <View style={styles.row}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description} numberOfLines={6} ellipsizeMode='tail'>{item.description}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handlePress_InfoPeliculaPlay} style={styles.playButtonContainer}>
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
    console.log('List Data:', listData);
    console.log(isSuccess)
    console.log(error);

    return (
        <ImageBackground source={require('../../assets/images/Background.png')} style={styles.background}>
            <View style={styles.topFrame}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <VolverIcon style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <CustomSearchBar onSearch={handleSearch}/>
            </View>
            <View style={styles.middleFrame}>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity>
                        <FechaIcon/>
                    </TouchableOpacity>
                </View>
                <View style={styles.iconsContainer}> 
                    <TouchableOpacity>
                        <CalificacionIcon/>
                    </TouchableOpacity>
                </View>
            </View>
            {isLoading && page === 1 && <Text>Loading...</Text>}
            {error && <Text>Error: {error.toString()}</Text>}
            <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatListContentContainer}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                ListFooterComponent={isLoading && page > 1 ? <Text>Loading more...</Text> : null}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20, // Ensure no more than 20px spacing between containers
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 10,
        paddingHorizontal: 20, // Add padding for better alignment
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
        textShadowOffset: { width: 2, height: 2 },
        marginLeft: 17,
        marginBottom: 10
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
        left: 25
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
        marginBottom: 20
    },
    
    middleFrame: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10
    },
    topFrame: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    searchContainer: {
        paddingHorizontal: 12,
        marginBottom: 10
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
        marginLeft: 0,
    },
    searchContainerStyle: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#FEC260",
        backgroundColor: "#3B185F",
        width: 329
    }
});

export default SearchScreen;


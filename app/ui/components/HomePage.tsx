// src/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, FlatList, ListRenderItem } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation'; // Adjust the path if necessary
import PlayButton from '../../assets/svg/PlayHome.svg'; // Direct import of SVG
import AnioDuracion from '../../assets/svg/Anio-Duracion.svg';
import Generos from '../../assets/svg/Generos.svg';
import FavIcon from '../../assets/svg/Fav-icon.svg';
import SearchIcon from '../../assets/svg/Search-icon.svg';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type Item = {
    id: string;
    title: string;
    description: string;
    year: string;
    duration: string;
    image: any;
};

const initialData: Item[] = [
    {
        id: '1',
        title: 'Pobres Criaturas',
        description: ' ds sd fads lfksadn ldslf nasdnf sdf asdf gsdfasd s dlk asdkln sdn ksnd kEl Dr. Godwin resucita a la bella Bella Baxter para que aprenda a su lado. Sin embargo, ella huye en compañía de un abogado porque quiere recorrer el mundo, sedienta de deseo de igualdad y libertad.',
        year: '2023',
        duration: '120 min',
        image: 'https://image.tmdb.org/t/p/w500/xi8Iu6qyTfyZVDVy60raIOYJJmk.jpg'
    },
    {
        id: '2',
        title: 'Pobres Criaturas',
        description: 'El Dr. Godwin resucita a la bella Bella Baxter para que aprenda a su lado. Sin embargo, ella huye en compañía de un abogado porque quiere recorrer el mundo, sedienta de deseo de igualdad y libertad.',
        year: '2023',
        duration: '120 min',
        image: 'https://image.tmdb.org/t/p/w500/xi8Iu6qyTfyZVDVy60raIOYJJmk.jpg'
    },
    // Add more initial items here if needed
];

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [data, setData] = useState<Item[]>(initialData);

    const handlePress_InfoPeliculaPlay = () => {
        // Handle the press event for the play button
    };

    const handlePress_InfoPeliculaImage = () => {
        // Handle the press event for the play button
    };

    const handlePress_Favoritos = () => {
        // Handle the press event for the play button
    };

    const handlePress_Buscador = () => {
        // Handle the press event for the play button
    };

    const handlePress_Profile = () => {
        // Handle the press event for the play button
    };

    const handlePress_FilterGenero = () => {
        // Handle the press event for the play button
    };

    const fetchData = () => {
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

    useEffect(() => {
        // This effect will run whenever the data state changes
        // Perform any additional updates or actions if necessary
    }, [data]);

    const renderItem: ListRenderItem<Item> = ({ item }) => (
        <View style={styles.container}>
            <View style={styles.row}>
                <Image
                    source={{uri:item.image}}
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

    return (
        <ImageBackground source={require('../../assets/images/Background.png')} style={styles.background}>
            <View style={styles.topFrame}>
                <View style={styles.profileContainer}>
                    <Image
                        source={require('../../assets/images/profile.jpg')} // Replace with the actual user profile image URL
                        style={styles.profileImage}
                    />
                    <Text style={styles.nickname}>nick_name</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('FavoritesPage')}>
                        <FavIcon style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchPage')}>
                        <SearchIcon style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.genreListContainer}>
                <FlatList
                    data={genres}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={handlePress_FilterGenero}>
                            <Generos style={styles.genreItem}/>
                            <Text style={styles.genreText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <Text style={styles.titleHome}>Ultimos Trailers</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatListContentContainer}
                onEndReachedThreshold={0.5}
                onEndReached={fetchData}
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
        textShadowOffset: {width: 2, height: 2},
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
    genreItem: {
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#FEC260',
    },
    selectedGenreItem: {
        backgroundColor: '#FAFAFA',
    },
    genreText: {
        position: 'absolute', // Absolute positioning for text overlay
        width: '100%', // Ensure text width matches the SVG component
        textAlign: 'center', // Center-align text
        fontSize: 16, // Adjust the font size as needed
        color: '#101010',
        fontWeight: 'bold',
        right: 5,
    },
    selectedGenreText: {
        color: '#FEC260',
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

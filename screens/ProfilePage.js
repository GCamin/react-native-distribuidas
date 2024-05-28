/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles';

const ProfilePage = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={globalStyles.backButton}>Volver</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={globalStyles.title}>Mi perfil</Text>

      {/* Profile Picture */}
      <Image source={require('../assets/profile_picture.png')} style={globalStyles.profileImage} />

      {/* Edit Button */}
      <TouchableOpacity style={globalStyles.editButton}>
        <Text style={globalStyles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>

      {/* Form */}
      <View style={globalStyles.form}>
        <Text style={globalStyles.label}>Nickname:</Text>
        <TextInput style={globalStyles.input} value="nico_herrera" editable={false} />

        <TextInput style={globalStyles.input} value="Nicolas Herrera" editable={false} />

        <TextInput style={globalStyles.input} value="nico_herrera@gmail.com" editable={false} />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={globalStyles.logoutButton}>
        <Text style={globalStyles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={globalStyles.deleteProfileText}>Eliminar perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePage;
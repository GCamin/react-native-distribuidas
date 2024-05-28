/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import colors from './colors';
const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 20,
  },
  backButton: {
    color: colors.tertiary,
    marginBottom: 20,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  editButtonText: {
    color: colors.textSecondary,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    color: colors.textPrimary,
    marginBottom: 5,
  },
  input: {
    backgroundColor: colors.secondary,
    color: colors.textSecondary,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  deleteProfileText: {
    color: colors.textAccent,
    textAlign: 'center',
  },
});

export default globalStyles;

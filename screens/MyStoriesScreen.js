// MyStoriesScreen.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

function MyStoriesScreen() {
  const navigation = useNavigation(); // Hook to get access to navigation

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateAStory')}
      >
        <MaterialCommunityIcons name="plus-circle" size={60} color="#e91e63" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 30, // Adjust positioning as needed
    bottom: 30, // Adjust positioning as needed
  },
});

export default MyStoriesScreen;

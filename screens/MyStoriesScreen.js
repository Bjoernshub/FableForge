// MyStoriesScreen.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useStories } from '../context/StoriesContext';

function MyStoriesScreen() {
  const navigation = useNavigation(); // Hook to get access to navigation
  const { stories } = useStories();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {stories.map((story, index) => (
          <View key={index} style={styles.storyCard}>
            <TouchableOpacity
              style={styles.storyButton}
              onPress={() => navigation.navigate('StoryDetail', { storyId: index })} // Placeholder for navigation
            >
              {/* Future Image component goes here */}
            </TouchableOpacity>
            <Text style={styles.title}>{story.title}</Text>
          </View>
        ))}
      </ScrollView>
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
    padding: 10,
    flexDirection: 'row', // Arranges children in a row
    flexWrap: 'wrap', // Allows items to wrap to the next row
    justifyContent: 'space-around', // Distributes items evenly, with equal space around them
  },
  storyCard: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  storyButton: {
    height: 150, // Adjust height as needed
    backgroundColor: '#ddd', // Placeholder color, replace with your Image later
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Optional: for rounded corners
  },
  title: {
    marginTop: 5,
    textAlign: 'center', // Centers the title text
    fontWeight: 'bold',
  },
  content: {
    marginTop: 4,
    fontSize: 14,
  },
});
export default MyStoriesScreen;

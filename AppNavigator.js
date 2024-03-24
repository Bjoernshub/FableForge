// AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { StoriesProvider } from './context/StoriesContext';

// Import screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MyStoriesScreen from './screens/MyStoriesScreen';
import ProfileScreen from './screens/ProfileScreen';
import CreateAStoryScreen from './screens/CreateAStoryScreen';

// Create stack navigator
const Stack = createNativeStackNavigator();

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator component
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home" // Corrected to "Home"
      screenOptions={{ tabBarActiveTintColor: '#e91e63', }}>
      <Tab.Screen
        name="Home" // This matches your HomeScreen component
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home', // Label corrected to "Home"
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} /> // Corrected icon name
          ),
        }}
      />
      <Tab.Screen
        name="MyStories"
        component={MyStoriesScreen}
        options={{
          tabBarLabel: 'My Stories',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// App Navigator that includes both Stack and Tab navigation
function AppNavigator() {
  return (
    <StoriesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="MyStories" component={MyStoriesScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="CreateAStory" component={CreateAStoryScreen} />
          <Stack.Screen name="Main" component={MyTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoriesProvider>
  );
}

export default AppNavigator;

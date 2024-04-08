import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileView from './src/Views/ProfileView';
import HomeView from './src/Views/HomeView';
import RecipeAddView from './src/Views/RecipeAddView';

const Tab = createBottomTabNavigator();

const recipes = [
  { id: '1', name: 'Recipe 1', description: 'Description for Recipe 1' },
  { id: '2', name: 'Recipe 2', description: 'Description for Recipe 2' },
  { id: '3', name: 'Recipe 3', description: 'Description for Recipe 3' },
];

const App = () => {
  return (
    <NavigationContainer>

      <Tab.Navigator screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#18AB91" },
        headerTintColor: '#FFF',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: '#18AB91',
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: '#D4DFDF'
        }
      }}>
        <Tab.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialIcons 
                name="home"  
                size={size}
                color={color} />
              )
            }
          }}
        >
          {
            (props) => (
              <HomeView
                {...props}
                recipes={recipes}
              />
            )
          }
        </Tab.Screen>
        <Tab.Screen
          name="add"
          options={{
            title: 'Add Recipe',
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialIcons 
                name="add"  
                size={size}
                color={color} />
              )
            }
          }}
        >
          {
            (props) => (
              <RecipeAddView
                {...props}
              />
            )
          }
        </Tab.Screen>
        <Tab.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialIcons 
                name="account-circle"  
                size={size}
                color={color} />
              )
            }
          }}
        >
          {
            (props) => (
              <ProfileView
                {...props}
              />
            )
          }
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

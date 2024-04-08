import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileView from './src/Views/ProfileView';
import HomeView from './src/Views/HomeView';
import RecipeAddView from './src/Views/RecipeAddView';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#18AB91', 
    accent: '#18AB91',   
    background: '#F2F2F2',
    surface: '#F1F1F1',
    text: '#000000',
    placeholder: '#757575'
  },
};

const recipesMock = [
  {
    id: '1',
    name: 'Chicken Tacos',
    category: 'Dinner',
    ingredients: [
      'Corn tortillas',
      'Chicken breast',
      'Onion',
      'Cilantro',
      'Lime',
      'Salsa',
      'Salt',
      'Oil'
    ],
    preparation: `
      1. Cook the chicken breast and shred it.
      2. Finely chop the onion and cilantro.
      3. Heat the tortillas on a griddle.
      4. Fill the tortillas with shredded chicken, onion, and cilantro.
      5. Add salsa to taste.
      6. Squeeze lime over the top and add salt if needed.
    `
  },
  {
    id: '2',
    name: 'Caesar Salad',
    category: 'Salads',
    ingredients: [
      'Romaine lettuce',
      'Chicken breast',
      'Croutons',
      'Parmesan cheese',
      'Caesar dressing'
    ],
    preparation: `
      1. Wash and sanitize the romaine lettuce, then chop it into pieces.
      2. Cook the chicken breast and cut it into strips or cubes.
      3. Mix the lettuce with the chicken, croutons, and Parmesan cheese in a bowl.
      4. Add the Caesar dressing and mix well.
      5. Serve cold and enjoy.
    `
  },
];

const App = () => {
  const [recipes, setRecipes] = useState(recipesMock);
  
  const handleAddRecipe = (newRecipe) => {
    //TODO: DELETE ID CODE
    const id = (recipes.length + 1).toString(); 
    const recipeWithId = { ...newRecipe, id }; 
    
    setRecipes(prevRecipes => [...prevRecipes, recipeWithId]);
  };

  return (
    <PaperProvider theme={theme}>
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
                  onAddRecipe={handleAddRecipe}
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
    </PaperProvider>
  );
};

export default App;

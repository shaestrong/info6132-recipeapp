import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileView from './src/Views/ProfileView';
import HomeView from './src/Views/HomeView';
import RecipeAddView from './src/Views/RecipeAddView';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { app } from './src/firebase'
import RecipeRepository, { recipesMock } from './src/database/db';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#18AB91', 
    accent: '#18AB91',   
    background: '#F2F2F2',
    surface: '#F1F1F1',
    text: '#000000',
    placeholder: '#757575',
    segmentActive: '#d6e9e9'
  },
};

const App = () => {
  const repository = RecipeRepository(app);

  // repository.populate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    repository.getAll().then((recipes) => {
      setRecipes(recipes);
    });
  }, []);

  // RecipeRepository.populate();

  const handleAddRecipe = (newRecipe) => {
    //TODO: DELETE ID CODE
    // const id = (recipes.length + 1).toString(); 
    // const recipeWithId = { ...newRecipe, id }; 

    repository.add(newRecipe).then(() => {
      repository.getAll().then((recipes) => {
        setRecipes(recipes);
      });
    });
    // setRecipes(prevRecipes => [...prevRecipes, recipeWithId]);
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

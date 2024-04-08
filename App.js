import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileView from './src/Views/ProfileView';
import HomeView from './src/Views/HomeView';
import RecipeAddView from './src/Views/RecipeAddView';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { app } from './src/firebase'
import RecipeRepository, { recipesMock } from './src/database/db';
import Auth from './src/auth/auth';
import Login from './src/Views/Login';
import Register from './src/Views/Register';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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

const TabView = (props) => {

  const { auth, navigation } = props;

  const repository = RecipeRepository(app);

  auth.listenAuthState((user) => {
    if (!user) {
      navigation.replace('Login');
    }
  })

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    repository.getAll().then((recipes) => {
      setRecipes(recipes);
    });
  }, []);

  // repository.populate();
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
    <Tab.Navigator screenOptions={{
      headerShown: false,
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
              auth={auth}
            />
          )
        }
      </Tab.Screen>
    </Tab.Navigator>
  )

}

const App = () => {
  const auth = Auth(app);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
      screenOptions={{
      headerStyle: { backgroundColor: "#18AB91" },
      headerTintColor: '#FFF',
      headerTitleStyle: { fontWeight: 'bold' },
      tabBarActiveTintColor: '#18AB91',
      tabBarInactiveTintColor: "gray",
      tabBarStyle: {
        backgroundColor: '#D4DFDF'
      }
    }}
        >
          <Stack.Screen name="Login">
          {
              (props) => (
                <Login
                  {...props}
                  auth={auth}
                />
              )
            }
          </Stack.Screen>

          <Stack.Screen name="Register">
            {
              (props) => (
                <Register
                  {...props}
                  auth={auth}
                />
              )
            }
          </Stack.Screen>
          <Stack.Screen name="Main">
            { 
            (props) => (
              <TabView
                {...props}
                auth={auth}
              />
            )
          }
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

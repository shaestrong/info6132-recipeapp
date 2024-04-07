import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeListView from './Views/RecipeListView.js'; 
import RecipeDetailView from './Views/RecipeDetailView.js'; 
import RecipeAddView from './Views/RecipeAddView.js'; 

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List of Recipes" component={RecipeListView} />
        <Stack.Screen name="Recipe Details" component={RecipeDetailView} />
        <Stack.Screen name="Add Recipes" component={RecipeAddView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeListView from './RecipeListView';
import RecipeDetailView from './RecipeDetailView'

// import { RecipeDetailView} from './RecipeDetailView'
const Stack = createNativeStackNavigator();

const HomeView = ({recipes }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List of Recipes">
      {
          (props) =>
           <RecipeListView {...props} recipes={recipes}/>
        }
        </Stack.Screen>
      <Stack.Screen name="RecipeDetailView" component={RecipeDetailView} />
    </Stack.Navigator>
  );
};

export default HomeView;
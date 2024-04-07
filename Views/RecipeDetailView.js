import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecipeDetailView = ({ route }) => {
  const { recipe } = route.params; 

  return (
    <View style={styles.container}>
      <Text style={styles.recipeName}>{recipe.name}</Text>
      <Text style={styles.recipeDescription}>{recipe.description}</Text>
      <Text style={styles.recipeAmount}>Amount: ${recipe.amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  recipeAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecipeDetailView;

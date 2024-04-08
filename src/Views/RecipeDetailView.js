import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecipeDetailView = ({ route }) => {
  const { recipe } = route.params; 

  return (
    <View style={styles.container}>
<Text>Detail</Text>
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

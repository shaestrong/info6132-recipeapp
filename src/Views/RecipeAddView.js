import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { withTheme, HelperText, TextInput as PaperTextInput, Button, RadioButton } from 'react-native-paper';

const RecipeAddView = ({ theme, onAddRecipe }) => {
  const { colors } = theme;
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparation, setPreparation] = useState('');
  const [errors, setErrors] = useState({});

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Salads', 'Drinks', 'Desserts'];

  const handleAddRecipe = () => {
    let formErrors = {};

    if (!name.trim()) {
      formErrors.name = 'Recipe name is required';
    }

    if (!category) {
      formErrors.category = 'Category is required';
    }

    if (!ingredients.trim()) {
      formErrors.ingredients = 'Ingredients are required';
    }

    if (!preparation.trim()) {
      formErrors.preparation = 'Preparation steps are required';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());

    const newRecipe = { name, category, ingredients: ingredientsArray, preparation };
    onAddRecipe(newRecipe);
    setName('');
    setCategory('');
    setIngredients('');
    setPreparation('');
    setErrors({});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <PaperTextInput
          label="Recipe Name"
          value={name}
          onChangeText={setName}
          style={[styles.input, { backgroundColor: colors.surface }]}
        />
        <HelperText type="error" visible={!!errors.name} style={{ color: 'red' }}>
          {errors.name}
        </HelperText>
        <Text style={styles.label}>Select a category</Text>
        <RadioButton.Group
          onValueChange={newValue => setCategory(newValue)}
          value={category}
        >
          {categories.map((item) => (
            <View key={item}>
              <RadioButton.Item
                label={item}
                value={item}
                status={errors.category ? 'error' : 'unchecked'}
              />
            </View>
          ))}
        </RadioButton.Group>
        <HelperText type="error" visible={!!errors.category} style={{ color: 'red' }}>
          {errors.category}
        </HelperText>
        <PaperTextInput
          label="Ingredients (comma separated)"
          value={ingredients}
          onChangeText={setIngredients}
          style={[styles.input, { backgroundColor: colors.surface }]}
        />
        <HelperText type="error" visible={!!errors.ingredients} style={{ color: 'red' }}>
          {errors.ingredients}
        </HelperText>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.label}>Preparation</Text>
          <HelperText type="error" visible={!!errors.preparation} style={{ color: 'red' }}>
            {errors.preparation}
          </HelperText>
        </View>
        <PaperTextInput
          multiline
          numberOfLines={8}
          value={preparation}
          onChangeText={setPreparation}
          placeholder={"Preparation steps"}
          style={[styles.largeInput, { backgroundColor: colors.surface }]}
          textAlignVertical="top"
        />
      </ScrollView>

      <Button mode="contained" onPress={handleAddRecipe} style={styles.button} labelStyle={{ color: 'white',fontSize: 16, fontWeight: "bold" }}>
        Save Recipe
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 4,
  },
  largeInput: {
    height: 160,
    marginBottom: 8,
    paddingBottom: 5,
    paddingTop: 12, 
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 12
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default withTheme(RecipeAddView);

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';

import { RecipeSingularItem } from '../Components/SingleRecipe';

export function RecipeScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId } = route.params;
  return (
    <View
      style={{
        backgroundColor: '#30475e',
      }}
    >
      <SafeAreaView>
        <RecipeSingularItem recipe={itemId} />
      </SafeAreaView>
    </View>
  );
}

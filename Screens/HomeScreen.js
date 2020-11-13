import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import allRecipes from '../allRecipes.json';
import { RecipeItem } from '../Components/RecipeItem';

export function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <RecipeItem recipe={[item]} navigation={navigation} />
  );
  return (
    <View
      style={{
        backgroundColor: '#30475e',
      }}
    >
      <SafeAreaView>
        <FlatList
          data={allRecipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </View>
  );
}

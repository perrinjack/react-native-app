import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const allRecipes = {
  items: [
    { id: 1, recipeName: 'Cookies', duration: 30 },
    { id: 2, recipeName: 'Pie and Mash', duration: 50 },
    { id: 3, recipeName: 'Lobster', duration: 50 },
  ],
};
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen: List recipe items here.</Text>

      {allRecipes.items.map((item) => (
        <Button
          title={item.recipeName}
          onPress={() =>
            navigation.navigate('Recipe', {
              itemId: item,
            })
          }
        />
      ))}
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings in dev!</Text>
    </View>
  );
}

function OrdersScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Orders in dev!</Text>
    </View>
  );
}

function RecipeScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Recipe Screen</Text>
      <Text> {itemId.id}</Text>
      <Text>{itemId.duration} mins</Text>
      <Text>{itemId.recipeName} mins</Text>
    </View>
  );
}

const HomeStack = () => {
  return (
    <HomeNav.Navigator>
      <HomeNav.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
      <HomeNav.Screen name="Recipe" component={RecipeScreen} options={{ headerShown: true }} />
    </HomeNav.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const HomeNav = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="My Favs" component={OrdersScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

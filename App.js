import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';

import { Avatar, Card, Title, Paragraph, Chip } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { Icon } from 'react-native-elements';
import allRecipes from './allRecipes.json';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import { RecipeItem } from './Components/RecipeItem';
import { RecipeSingularItem } from './Components/SingleRecipe';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-evenly',
    borderBottomColor: 'pink',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  chip: {
    backgroundColor: 'pink',
    margin: 4,
  },
  chipText: {
    color: 'black',
  },
});

function HomeScreen({ navigation }) {
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

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings in dev!</Text>
    </View>
  );
}

function RecipeScreen({ route, navigation }) {
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

const HomeStack = () => {
  return (
    <HomeNav.Navigator>
      <HomeNav.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeNav.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{ headerShown: false }}
      />
    </HomeNav.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
const HomeNav = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="pink"
          inactiveColor="black"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size }) => {
              let iconName;
              let color = 'pink';
              if (route.name === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-add';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              } else if (route.name === 'My Favs') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }
              return <Icon name={iconName} type="ionicon" color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />

          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

// const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    text: 'pink',
  },
};

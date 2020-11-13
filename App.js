import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { Icon } from 'react-native-elements';
import allRecipes from './allRecipes.json';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import { RecipeScreen } from './Screens/RecipeScreen';

import { SettingsScreen } from './Screens/SettingsScreen';

import { HomeScreen } from './Screens/HomeScreen';

import { createStackNavigator } from '@react-navigation/stack';

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    text: 'pink',
  },
};

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

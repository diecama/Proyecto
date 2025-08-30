import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import UnitConverterScreen from './screens/UnitConverterScreen';
import HistoryScreen from './screens/HistoryScreen';
import { Appearance, useColorScheme } from 'react-native';
import SettingsScreen from './screens/SettingsScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => setTheme(colorScheme));
    return () => sub.remove();
  }, []);

  function ConversorStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Categorías" component={CategoriesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UnitConverter" component={UnitConverterScreen} options={{ title: 'Conversor de Unidades' }} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = 'swap-horizontal';
            if (route.name === 'Conversor') iconName = 'swap-horizontal';
            if (route.name === 'Historial') iconName = 'time-outline';
            if (route.name === 'Ajustes') iconName = 'settings-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Conversor" component={ConversorStack} options={{ headerShown: false }} />
        <Tab.Screen name="Historial" component={HistoryScreen} />
        <Tab.Screen name="Ajustes" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  // Aquí podrías guardar la preferencia en AsyncStorage y aplicarla globalmente

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Modo oscuro</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? '#007AFF' : '#ccc'}
        />
      </View>
      {/* Puedes agregar más ajustes aquí */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#007AFF' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  label: { fontSize: 16, color: '#333' },
});

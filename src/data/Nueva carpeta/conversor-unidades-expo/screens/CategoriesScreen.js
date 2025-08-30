import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import convert from 'convert-units';

const CATEGORY_ICONS = {
  length: { icon: 'ruler', color: '#e74c3c' },
  mass: { icon: 'weight', color: '#27ae60' },
  temperature: { icon: 'thermometer', color: '#f39c12' },
  area: { icon: 'square-outline', color: '#2980b9' },
  volume: { icon: 'cube-outline', color: '#8e44ad' },
  speed: { icon: 'speedometer', color: '#16a085' },
  pressure: { icon: 'gauge', color: '#d35400' },
  energy: { icon: 'flash', color: '#c0392b' },
  time: { icon: 'clock-outline', color: '#2c3e50' },
  // Puedes agregar más categorías e iconos aquí
};

const categories = convert().measures();

export default function CategoriesScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const filtered = categories.filter(cat =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor de Unidades</Text>
      <TextInput
        style={styles.search}
        placeholder="Buscar categoría..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          const iconData = CATEGORY_ICONS[item] || { icon: 'help-circle-outline', color: '#888' };
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('UnitConverter', { category: item })}
            >
              <MaterialCommunityIcons name={iconData.icon} size={32} color={iconData.color} style={{ marginRight: 16 }} />
              <View>
                <Text style={styles.cardTitle}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                <Text style={styles.cardSubtitle}>Conversor de {item}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#bbb" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#222', marginBottom: 16 },
  search: { backgroundColor: '#fff', borderRadius: 10, padding: 12, fontSize: 16, marginBottom: 18, borderWidth: 1, borderColor: '#eee' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  cardSubtitle: { fontSize: 13, color: '#888' },
});

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await AsyncStorage.getItem('conversionHistory');
      setHistory(data ? JSON.parse(data) : []);
    };
    loadHistory();
  }, []);

  const clearHistory = async () => {
    await AsyncStorage.removeItem('conversionHistory');
    setHistory([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de conversiones</Text>
      <TouchableOpacity style={styles.clearBtn} onPress={clearHistory}>
        <Text style={styles.clearText}>Limpiar historial</Text>
      </TouchableOpacity>
      <FlatList
        data={history}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}><Text>{item}</Text></View>
        )}
        ListEmptyComponent={<Text style={{textAlign:'center',marginTop:20}}>No hay historial</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#007AFF' },
  clearBtn: { alignSelf: 'flex-end', marginBottom: 10, backgroundColor: '#eee', padding: 8, borderRadius: 8 },
  clearText: { color: '#007AFF', fontWeight: 'bold' },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }
});

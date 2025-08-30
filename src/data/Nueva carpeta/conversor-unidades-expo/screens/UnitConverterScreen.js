import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import convert from 'convert-units';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UnitConverterScreen({ route }) {
  const category = route?.params?.category || convert().measures()[0];
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState(convert().possibilities(category)[0]);
  const [toUnit, setToUnit] = useState(convert().possibilities(category)[1]);
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await AsyncStorage.getItem('conversionHistory');
      setHistory(data ? JSON.parse(data) : []);
    };
    loadHistory();
  }, []);

  useEffect(() => {
    const units = convert().possibilities(category);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  }, [category]);

  const units = convert().possibilities(category);

  useEffect(() => {
    if (inputValue && fromUnit && toUnit) {
      try {
        const value = convert(parseFloat(inputValue)).from(fromUnit).to(toUnit);
        setResult(value);
      } catch {
        setResult('');
      }
    } else {
      setResult('');
    }
  }, [inputValue, fromUnit, toUnit]);

  const saveToHistory = async () => {
    if (!inputValue || !result) return;
    const entry = `${inputValue} ${fromUnit} = ${result} ${toUnit} [${category}]`;
    const newHistory = [entry, ...history].slice(0, 30);
    setHistory(newHistory);
    await AsyncStorage.setItem('conversionHistory', JSON.stringify(newHistory));
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Valor"
        value={inputValue}
        onChangeText={setInputValue}
      />

      <View style={styles.pickersRow}>
        <Picker
          selectedValue={fromUnit}
          style={styles.picker}
          onValueChange={setFromUnit}
        >
          {units.map(unit => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>

        <Picker
          selectedValue={toUnit}
          style={styles.picker}
          onValueChange={setToUnit}
        >
          {units.map(unit => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
      </View>

      <Text style={styles.result}>
        Resultado: {result !== '' ? Number(result).toLocaleString(undefined, { maximumFractionDigits: 8 }) : '--'}
      </Text>

      <Text style={styles.saveBtn} onPress={saveToHistory}>
        Guardar en historial
      </Text>

      <Text style={styles.historyTitle}>Historial reciente</Text>
      {history.length === 0 && <Text style={styles.historyEmpty}>No hay historial</Text>}
      {history.map((item, idx) => (
        <Text key={idx} style={styles.historyItem}>{item}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 26, marginBottom: 20, textAlign: 'center', color: '#007AFF', fontWeight: 'bold' },
  input: {
    borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 6, fontSize: 18, backgroundColor: '#f9f9f9'
  },
  pickersRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  picker: { flex: 1, marginHorizontal: 5, backgroundColor: '#f0f0f0', borderRadius: 8 },
  result: { fontSize: 22, textAlign: 'center', color: '#007AFF', fontWeight: 'bold', marginTop: 20 },
  saveBtn: { color: '#007AFF', textAlign: 'center', marginTop: 10, marginBottom: 20, fontWeight: 'bold', fontSize: 16 },
  historyTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 8, color: '#444' },
  historyEmpty: { textAlign: 'center', color: '#888', marginBottom: 10 },
  historyItem: { fontSize: 15, color: '#333', marginBottom: 4, backgroundColor: '#f0f0f0', padding: 6, borderRadius: 6 },
});

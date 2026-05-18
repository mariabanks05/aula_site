import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar no cardápio</Text>
      <TextInput style={styles.search} placeholder="Procure por pratos, bebidas..." />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Text>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.placeholder}>
        <Text>Lista de itens do cardápio virá aqui.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  search: { height: 44, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, marginBottom: 16 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  button: { flex: 1, alignItems: 'center', padding: 12, backgroundColor: '#eee', marginHorizontal: 6, borderRadius: 8 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 8 }
});

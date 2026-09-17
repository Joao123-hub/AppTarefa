import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen( ) {
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: 'Estudar React-Native', concluida: false },
    { id: 2, texto: 'Aprender useState', concluida: false },
    { id: 3, texto: 'Criar a primeira tela', concluida: false },
  ]);

  function adicionarTarefa( ) {
    if (!tarefa.trim( )) return;

    const novaTarefa = {
      id: Date.now( ),
      texto: tarefa,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTarefa('');
  }

  function concluirTarefa(id: number) {
    setTarefas(
      tarefas.map((item) =>
        item.id === id ? { ...item, concluida: !item.concluida } : item
      )
    );
  }

  function excluirTarefa(id: number) {
    setTarefas(tarefas.filter((item) => item.id !== id));
  }

  const totalConcluidas = tarefas.filter((item) => item.concluida).length;

  return (
    <View style={styles.container}>
      <View style={styles.tituloContainer}>
        <Ionicons name="list-circle" size={30} color="#2196f3" />
        <Text style={styles.title}>Gerenciador de Tarefas</Text>
      </View>

      <View style={styles.contadorContainer}>
        <View style={[styles.badge, styles.badgeAzul]}>
          <Ionicons name="reader-outline" size={16} color="#1565c0" />
          <Text style={styles.badgeTexto}>{tarefas.length} tarefas</Text>
        </View>
        <View style={[styles.badge, styles.badgeVerde]}>
          <Ionicons name="checkmark-done-outline" size={16} color="#2e7d32" />
          <Text style={styles.badgeTexto}>{totalConcluidas} concluídas</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="create-outline" size={20} color="#9e9e9e" style={{ marginLeft: 10 }} />
        <TextInput
          style={styles.input}
          placeholder='Digite uma tarefa:'
          value={tarefa}
          onChangeText={setTarefa}
        />
      </View>

      {/*Aula 10/09/2026 */}
      <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
        <Ionicons name="add-circle" size={20} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.botaoAdicionarTexto}>ADICIONAR</Text>
      </TouchableOpacity>

      <ScrollView>
        {tarefas.length === 0 && (
          <View style={styles.vazioContainer}>
            <Ionicons name="happy-outline" size={40} color="#bdbdbd" />
            <Text style={styles.vazioTexto}>Nenhuma tarefa por aqui!</Text>
          </View>
        )}

        {tarefas.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.itemTexto}
              onPress={() => concluirTarefa(item.id)}
            >
              <Ionicons
                name={item.concluida ? 'checkmark-circle' : 'ellipse-outline'}
                size={22}
                color={item.concluida ? '#2e7d32' : '#2196f3'}
                style={{ marginRight: 8 }}
              />
              <Text
                style={[
                  styles.item,
                  item.concluida && styles.itemConcluido,
                ]}
              >
                {item.texto}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => excluirTarefa(item.id)}>
              <Ionicons name="trash-outline" size={20} color="#e53935" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fafafa',
  },
  tituloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 6,
    color: '#212121',
  },
  contadorContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  badgeAzul: {
    backgroundColor: '#e3f2fd',
  },
  badgeVerde: {
    backgroundColor: '#e8f5e9',
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: '#424242',
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 12,
  },
  botaoAdicionar: {
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  botaoAdicionarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  itemTexto: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    fontSize: 16,
    color: '#212121',
    flexShrink: 1,
  },
  itemConcluido: {
    textDecorationLine: 'line-through',
    color: '#9e9e9e',
  },
  vazioContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  vazioTexto: {
    color: '#9e9e9e',
    marginTop: 8,
  },
});

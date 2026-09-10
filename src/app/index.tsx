import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface Tarefa {
  id: number;
  texto: string;
  concluida: boolean;
}

export default function HomeScreen() {
  const [tarefa, setTarefa] = useState<string>('');
  
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: 1, texto: 'Estudar React-Native', concluida: false },
    { id: 2, texto: 'Aprender useState', concluida: false },
    { id: 3, texto: 'Criar a primeira tela', concluida: false },
  ]);

  function adicionarTarefa() {
    if (!tarefa.trim()) return;

    const novaTarefa: Tarefa = {
      id: Date.now(),
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
      {/* Título com Ícone */}
      <View style={styles.titleContainer}>
        <Ionicons name="list-circle" size={32} color="#2196f3" />
        <Text style={styles.title}>Gerenciador de Tarefas</Text>
      </View>

      {/* Input e Botão Adicionar */}
      <TextInput
        style={styles.input}
        placeholder="Digite uma tarefa:"
        value={tarefa}
        onChangeText={setTarefa}
      />

      <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
        <Ionicons name="add-circle" size={20} color="#fff" />
        <Text style={styles.botaoAdicionarTexto}>ADICIONAR</Text>
      </TouchableOpacity>

      {/* Contador */}
      <Text style={styles.contador}>
        {totalConcluidas} de {tarefas.length} tarefas concluídas
      </Text>

      {/* Lista de Tarefas */}
      <ScrollView style={styles.lista}>
        {tarefas.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.itemTextoContainer}
              onPress={() => concluirTarefa(item.id)}
            >
              <Ionicons
                name={item.concluida ? 'checkmark-circle' : 'ellipse-outline'}
                size={22}
                color={item.concluida ? '#2e7d32' : '#2196f3'}
              />
              <Text style={[styles.item, item.concluida && styles.itemConcluido]}>
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
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  botaoAdicionar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    marginBottom: 20,
  },
  botaoAdicionarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contador: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontWeight: '600',
  },
  lista: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemTextoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  item: {
    fontSize: 16,
  },
  itemConcluido: {
    textDecorationLine: 'line-through',
    color: '#9e9e9e',
  },
});
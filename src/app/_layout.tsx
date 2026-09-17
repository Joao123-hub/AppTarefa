
//importar o componente que controla a navegação (rotas)
import { Stack } from 'expo-router';

export default function Layout( ) {
  return(
    <Stack>
      <Stack.Screen
      name='index'
      options={{
        title: "Agendador de Tarefas",
      }}
      />

      <Stack.Screen
      name='nova-tarefa'
      options={{
        title: "Nova Tarefa",       
      }}
      />
    </Stack>
  );
  
}

import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

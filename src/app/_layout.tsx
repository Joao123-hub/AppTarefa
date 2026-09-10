import { Stack } from "expo-router";

export default function Layout( ) {
  return (
    <Stack>
      <Stack.Screen 
      name="index" 
      options={{ 
        title: "Agendador de Tarefas" ,
       }}
       />

       <Stack.Screen 
      name="nova_tarefa" 
      options={{ 
        title: "Nova Tarefa" ,
       }}
       />

    </Stack>
  );
}

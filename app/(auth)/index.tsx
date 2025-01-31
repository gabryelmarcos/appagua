import React, { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, FlatList } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configuração do manipulador de notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [notifications, setNotifications] = useState([]);

  
  useEffect(() => {
   
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão para notificações não concedida.');
      }
    }

    
    requestPermissions();

    
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      setNotifications(prev => [...prev, notification]);
    });

    
    return () => subscription.remove();
  }, []);

  
  async function scheduleRecurringNotification() {
    const now = new Date();
    const minutes = now.getMinutes();
    const hours = now.getHours();

   
    const firstTriggerTime = new Date(now.setMinutes(minutes + 1)); 

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hora de Beber Água!',
        body: 'Não se esqueça de se hidratar.',
        sound: 'default',
      },
      trigger: {
        
        hour: firstTriggerTime.getHours(),
        minute: firstTriggerTime.getMinutes(),
        repeats: true,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App de Hidratação</Text>
      <Button title="Agendar Notificação Recorrente" onPress={scheduleRecurringNotification} />

      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{item.request.content.title}</Text>
            <Text style={styles.notificationBody}>{item.request.content.body}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noNotifications}>Nenhuma notificação recebida.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  notificationItem: {
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationBody: {
    fontSize: 16,
    marginTop: 5,
  },
  noNotifications: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});

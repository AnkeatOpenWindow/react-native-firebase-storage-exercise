import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the import path if necessary

const HomeScreen = ({ navigation }) => {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'memories'), (snapshot) => {
      const memoriesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMemories(memoriesList);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.add} onPress={() => navigation.navigate("Add")}>
        <Text style={styles.addtext}>Add</Text>
      </Pressable>

      {/* Loop through the memories array and display each memory */}
      {memories.map(memory => (
        <View key={memory.id} style={styles.card}>
          <Image
            style={styles.img}
            source={{ uri: memory.imageUrl }}
          />
          <Text>{memory.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20
  },
  img: {
    width: '100%',
    height: 200,
    objectFit: 'cover'
  },
  add:{
    backgroundColor: "green",
    textAlign: 'center',
    padding: 15,
    marginBottom: 30
  },
  addtext:{
    color: "white",
  }
});

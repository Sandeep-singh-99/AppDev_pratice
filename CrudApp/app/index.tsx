import { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";

export default function Index() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: "1", title: "Learn React Native", completed: false },
    { id: "2", title: "Build CRUD App", completed: true },
    { id: "3", title: "Deploy to App Store", completed: false },
  ]);

  const [loaded, error] = useFonts({
    Inter_500Medium, 
  })
  
  const addTask = () => {
    if (task.trim() === "") {
      Alert.alert("Error", "Please enter a task");
      return;
    }
    
    const newTask = {
      id: Date.now().toString(),
      title: task,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setTask("");
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? {...task, completed: !task.completed} : task
    ));
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity 
        style={styles.checkboxContainer}
        onPress={() => toggleComplete(item.id)}
      >
        <View style={[
          styles.checkbox, 
          item.completed && styles.checkboxCompleted
        ]}>
          {item.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
        </View>
      </TouchableOpacity>
      
      <Text style={[
        styles.taskTitle, 
        item.completed && styles.completedTask
      ]}>
        {item.title}
      </Text>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#ff4747" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={addTask}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {tasks.filter(t => !t.completed).length} remaining • {tasks.length} total
        </Text>
      </View>
      
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  statsContainer: {
    marginHorizontal: 20,
    marginBottom: 10
  },
  statsText: {
    color: "#999",
    fontSize: 14
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    fontFamily: 'Inter_500Medium'
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center"
  },
  checkboxCompleted: {
    backgroundColor: "black",
    borderColor: "black"
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontFamily: "Inter_500Medium"
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#999"
  },
  deleteButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18
  }
});
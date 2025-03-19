import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

interface ITodo {
  _id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch Todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://192.168.1.4:5000/getTodos");
      const data = await response.json();

      if (response.ok) {
        setTodos(data.data);
      } else {
        alert("Error: " + (data.message || "Something went wrong"));
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  
  const onRefresh = async () => {
    setRefreshing(true); 
    await fetchTodos(); 
    setRefreshing(false); 
  };

  
  const handleDelete = async (id: string) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this todo?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await fetch(
                `http://192.168.1.4:5000/deleteTodo/${id}`,
                {
                  method: "DELETE",
                }
              );

              if (response.ok) {
                setTodos(todos.filter((todo) => todo._id !== id));
              } else {
                alert("Error: Something went wrong while deleting");
              }
            } catch (error) {
              alert("Error: Something went wrong");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 50 }}>
      <Text style={{ fontSize: 24.0, fontWeight: 800 }}>All Todos</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: "black",
              padding: 10,
              marginVertical: 10,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18.0, fontWeight: 600 }}>
                {item.title}
              </Text>
              <Text>{item.description}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDelete(item._id)}
              style={{
                backgroundColor: "red",
                paddingVertical: 8,
                paddingHorizontal: 15,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

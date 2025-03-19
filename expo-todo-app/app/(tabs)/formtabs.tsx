import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function FromTab() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      console.log("Sending data:", { title, description });
      const response = await fetch("http://192.168.1.4:5000/addTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await response.json();
      console.log("Response:", data);
      

      if (response.ok) {
        alert("Todo added Successfully");

        setTitle("");
        setDescription("");
      } else {
        alert("Error: ");
      }
    } catch (error) {
      console.error("Request failed", error);
      
      alert("Something went wrong");
    }
  };
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 50 }}>
      <Text style={{ fontSize: 32.0, fontWeight: 600 }}>ToDo Form</Text>
      <View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            marginVertical: 10,
            borderRadius: 10,
          }}
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            marginVertical: 10,
            borderRadius: 10,
          }}
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "#007bff",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginTop: 20,
            alignItems: "center",
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

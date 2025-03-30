import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/30953532/pexels-photo-30953532/free-photo-of-black-and-white-alley-view-in-tokyo.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <Text style={{ color: "white", fontSize: 42, fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.5)' }}>Sandeep Singh</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});

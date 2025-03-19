import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "teal", headerStyle: { backgroundColor: "teal" }, headerTintColor: "white" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="formtabs"
        options={{
          title: "ToDo Form",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="wpforms" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

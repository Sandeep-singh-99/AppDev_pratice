import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ statusBarStyle: "light", statusBarBackgroundColor: "black" }}>
        <Stack.Screen name="index" options={{headerTitle: 'Crud App', headerTintColor: 'white', headerTitleAlign: 'center', headerStyle: {backgroundColor: 'black',}}}/>
      </Stack>
    </SafeAreaProvider>
  );
}

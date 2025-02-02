import { StyleSheet, View, Switch, StatusBar, TouchableOpacity } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons"; 

const Stack = createStackNavigator();

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar
          backgroundColor={theme.colors.background}
          barStyle={darkMode ? "light-content" : "dark-content"}
        />

        <TouchableOpacity
          onPress={() => setDarkMode(!darkMode)}
          style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
        >
          <Feather name={darkMode ? "sun" : "moon"} size={30} color={theme.colors.primary} />
        </TouchableOpacity>

        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <HomeScreen />
          <Toast />
        </View>
      </SafeAreaView>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});

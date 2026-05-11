// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    //jsx
    <View style={styles.container}>
      <View>
        <Text style={styles.parent}>
          GLab<Text style={styles.child}>123</Text>
        </Text>
      </View>
      <Text style={styles.hello1}> Mobile App!</Text>
      <Text>React Native & Expo Go Mobile Framework!</Text>

      {/* <StatusBar style="auto" /> */}
    </View>
  );
}
//not CSS - StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  hello1: {
    color: "pink",
    fontSize: 30,
    borderWidth: 3,
    borderColor: "green",
    padding: 5,
  },
  header: { fontSize: 30, fontWeight: "700" },
  parent: { fontSize: 30, color: "red" },
  child: { fontSize: 20, color: "pink" },
});

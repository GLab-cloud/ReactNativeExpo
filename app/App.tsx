// import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [name, setName] = useState<string>("GLab");
  const [test, setTest] = useState({ name: "GLab", age: 42 });
  const [count, setCount] = useState<number>(0);
  return (
    //jsx
    <View style={styles.container}>
      <View>
        <Text style={styles.parent}>
          GLab
          <Text style={styles.child}>
            {name}
            {test.age}
            {test.name}
            {JSON.stringify(test)}
          </Text>
        </Text>{" "}
      </View>
      <Text style={styles.hello1}> Mobile App!</Text>
      <Text>React Native & Expo Go Mobile Framework!</Text>
      {/* <StatusBar style="auto" /> */}
      <Text style={styles.child}>Count = {count}</Text>
      <View>
        {/* <Button title="Increase" onPress={() => alert("Press me")} /> */}
        <Button title="Increase" onPress={() => setCount(prev => prev + 1)} />
      </View>
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

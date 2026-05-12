// import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";

export default function App() {
  // const [name, setName] = useState<string>("GLab");
  const [test, setTest] = useState({ name: "GLab", age: 42 });
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("GLab");
  const [age, setAge] = useState<number>(0);

  return (
    //jsx
    <View style={styles.container}>
      <Text style={styles.parent}>
        GLab
        <Text style={styles.child}>
          {name}
          {test.age}
          {test.name}
          {JSON.stringify(test)}
        </Text>
      </Text>{" "}
      <Text style={styles.hello1}> Mobile App!</Text>
      <Text>React Native & Expo Go Mobile Framework!</Text>
      {/* <StatusBar style="auto" /> */}
      <Text style={styles.child}>Count = {count}</Text>
      <View>
        {/* <Button title="Increase" onPress={() => alert("Press me")} /> */}
        <Button title="Increase" onPress={() => setCount((prev) => prev + 1)} />
        <View>
          <Text style={{ fontSize: 20, fontWeight: 200 }}>Name: {name}</Text>
          <TextInput
            // multiline
            onChangeText={(value) => setName(value)}
            style={{
              borderColor: "green",
              borderWidth: 1,
              width: 200,
              padding: 15,
            }}
            // autoCapitalize="characters"
            autoCapitalize="words"
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 200 }}>Age: {age}</Text>
          <TextInput
            // multiline
            onChangeText={(value) => {
              if (value.trim() === "") {
                setAge(0);
              } else {
                const parsed = Number(value);
                if (Number.isInteger(parsed) && parsed >= 0) setAge(parsed);
              }
            }}
            style={{
              borderColor: "green",
              borderWidth: 1,
              width: 200,
              padding: 15,
            }}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
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

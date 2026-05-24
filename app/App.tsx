// import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";

export default function App() {
  // const [name, setName] = useState<string>("GLab");
  const [test, setTest] = useState({ name: "GLab", age: 42 });
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("GLab");
  const [age, setAge] = useState<number>(0);
  const [students, setStudent] = useState([
    { id: 1, name: "GLab", age: 18 },
    { id: 2, name: "GLab1", age: 19 },
    { id: 3, name: "GLab2", age: 20 },
  ]);

  return (
    //jsx
    <View style={styles.container}>
      <Text>Hello World</Text>
      <Text style={{ fontSize: 30 }}>array:</Text>
      <View>
        {students.map((item) => {
          return (
            <View
              key={item.id}
              style={{ padding: 30, backgroundColor: "pink", marginBottom: 20 }}
            >
              <Text>
                {item.name} - {item.age}
              </Text>
            </View>
          );
        })}
        )
      </View>
    </View>
  );
}
//not CSS - StyleSheet
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 50,
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

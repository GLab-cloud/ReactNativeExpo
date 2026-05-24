// import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  // Button,
  StyleSheet,
  Text,
  View,
  // TextInput,
  ScrollView,
  FlatList,
} from "react-native";

export default function App() {
  // const [name, setName] = useState<string>("GLab");
  // const [test, setTest] = useState({ name: "GLab", age: 42 });
  // const [count, setCount] = useState<number>(0);
  // const [name, setName] = useState<string>("GLab");
  // const [age, setAge] = useState<number>(0);
  const [students, setStudents] = useState([
    { id: 1, name: "GLab", age: 18 },
    { id: 2, name: "GLab1", age: 19 },
    { id: 3, name: "GLab2", age: 20 },
    { id: 4, name: "GLab3", age: 18 },
    { id: 5, name: "GLab4", age: 19 },
    { id: 6, name: "GLab5", age: 20 },
    { id: 7, name: "GLab3", age: 18 },
    { id: 8, name: "GLab4", age: 19 },
    { id: 9, name: "GLab5", age: 20 },
  ]);
  //not CSS - StyleSheet

  const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      paddingHorizontal: 50,
      flex: 1,
      backgroundColor: "#fff",
      // alignItems: "center",
      //  justifyContent: "center",
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

  return (
    //jsx
    <View style={styles.container}>
      //jsx
      <Text>FlatList</Text>
      <FlatList
        data={students}
        renderItem={({ item }) => (
          <View
            style={{ padding: 30, backgroundColor: "blue", marginBottom: 30 }}
          >
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

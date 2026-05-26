// import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  // TextInput,
  ScrollView,
  FlatList,
  TextInput,
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
  return (
    //jsx
    <View style={styles.container}>
      <Text style={styles.header}>ToDo App</Text>
      {/* form */}
      <View>
        <TextInput style={styles.todoInput} />
        <Button title="ADD TODO" />
      </View>
      {/* List Todo */}
      <View>
        <Text>List ToDo</Text>
      </View>
    </View>
  );
}
//not CSS - StyleSheet

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    //  justifyContent: "center",
    textAlign: "center",
  },
  hello1: {
    color: "pink",
    fontSize: 30,
    borderWidth: 3,
    borderColor: "green",
    padding: 5,
  },
  header: {
    fontWeight: "700",
    backgroundColor: "orange",
    // alignItems: "center",
    //  justifyContent: "center",
    textAlign: "center",
    fontSize: 40,
  },
  parent: { fontSize: 30, color: "red" },
  child: { fontSize: 20, color: "pink" },
  todoInput: {
    borderBottomColor: "green",
    borderBottomWidth: 1,
    padding: 5,
    margin: 15,
  },
});

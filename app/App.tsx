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

interface ITodo {
  id: number;
  name: string;
}
let nextId = 1;

export default function App() {
  const [toDo, setTodo] = useState("");
  const [listTodo, setListTodo] = useState<ITodo[]>([]);
  const handleAddTodo = () => {
    if (!toDo) {
      alert("Empty To-do");
      return;
    }
    setListTodo([...listTodo, { id: nextId++, name: toDo }]);
    setTodo("");
  };
  return (
    //jsx
    <View style={styles.container}>
      <Text style={styles.header}>ToDo App</Text>
      {/* form */}
      <View>
        <TextInput
          value={toDo}
          style={styles.todoInput}
          onChangeText={(value) => setTodo(value)}
        />
        <Button title="ADD TODO" onPress={handleAddTodo} />
      </View>
      {/* List Todo */}
      <View style={styles.body}>
        <FlatList
          data={listTodo}
          keyExtractor={(item) => item.id + ""}
          renderItem={({ item }) => {
            return <Text style={styles.todoItem}>{item.name}</Text>;
          }}
        />
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
  addTodoBtn: { paddingBottom: 15 },
  todoInput: {
    borderBottomColor: "green",
    borderBottomWidth: 1,
    padding: 5,
    margin: 15,
  },
  body: { paddingHorizontal: 10, marginBottom: 20 },
  todoItem: {
    borderWidth: 2,
    borderStyle: "dashed",
    fontSize: 20,
    padding: 10,
    marginTop: 20,
  },
});

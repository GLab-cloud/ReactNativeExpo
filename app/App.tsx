// import { StatusBar } from "expo-status-bar";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  // TextInput,
  ScrollView,
  FlatList,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import FlexBox from "./components/flex.box";

interface ITodo {
  id: number;
  name: string;
}

export default function App() {
  const [toDo, setTodo] = useState("");
  const [listTodo, setListTodo] = useState<ITodo[]>([]);
  const nextIdRef = useRef(1);
  const handleAddTodo = () => {
    const trimmed = toDo.trim();
    if (!trimmed) {
      // alert("Empty To-do");
      Alert.alert("input to do Error", "Cannot leave empty todo!!!", [
        { text: "Ok", onPress: () => console.log("OK pressed") },
      ]);
      return;
    }
    setListTodo((prev) => [
      ...prev,
      { id: nextIdRef.current++, name: trimmed },
    ]);
    setTodo("");
  };
  const deleteTodo = (id: number) => {
    const newTodos = listTodo.filter((item) => item.id != id);
    setListTodo(newTodos);
  };
  return (
    //jsx
    <TouchableWithoutFeedback
      onPress={() => {
        console.log("Leave input, keyboard closed!");
        Keyboard.dismiss();
      }}
    >
      <View style={{ flex: 1 }}>
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
                return (
                  // <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                  //   <Text style={styles.todoItem}>{item.name}</Text>
                  // </TouchableOpacity>
                  <Pressable
                    onPress={() => deleteTodo(item.id)}
                    style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                  >
                    <Text style={styles.todoItem}>{item.name}</Text>
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
        <FlexBox />
      </View>
    </TouchableWithoutFeedback>
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

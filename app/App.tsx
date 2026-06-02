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
// import FlexBox from "./components/flex.box";
import { AntDesign } from "@expo/vector-icons";

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
      Alert.alert("Error: input to-do ", "Cannot leave empty todo!!!", [
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
    // const newTodos = listTodo.filter((item) => item.id != id);
    // setListTodo(newTodos);
  };
  return (
    //jsx
    <TouchableWithoutFeedback
      onPress={() => {
        console.log("Leave input, keyboard closed!");
        Keyboard.dismiss();
      }}
    >
      {/* <View style={{ flex: 1 }}> */}
      <View style={styles.container}>
        <Text style={styles.header}>ToDo App</Text>
        {/* form */}
        <View style={styles.form}>
          <TextInput
            value={toDo}
            style={styles.todoInput}
            onChangeText={(value) => setTodo(value)}
          />
          <Button title="ADD TODO" onPress={handleAddTodo} />
        </View>
        {/* List Todo */}
        <View style={styles.todo}>
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
                  <View style={styles.groupTodo}>
                    <Text style={styles.todoItem}>{item.name}</Text>
                    <AntDesign name="close" size={24} color="black" />
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </View>
      {/* <FlexBox /> */}
      {/* </View> */}
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
    // flex: 1,
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
  form: {},
  todo: { paddingHorizontal: 10, marginBottom: 20, flex: 8 },
  todoItem: {
    fontSize: 20,
    // marginTop: 20,
  },
  groupTodo: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    marginBottom: 15,
    marginHorizontal: 10,
    justifyContent: "space-between",
  },
});

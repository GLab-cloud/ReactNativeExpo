import { View, Text, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "red",
    alignContent: "space-between",
    flex: 1,
  },
  title: {
    fontSize: 20,
    flex: 1,
  },
  title1: {
    fontSize: 20,
    backgroundColor: "red",
    padding: 10,
    width: 50,
    flex: 1,
  },
  title2: {
    fontSize: 20,
    backgroundColor: "green",
    padding: 10,
    width: 50,
    height: 300,
    flex: 1,
  },
  title3: {
    fontSize: 20,
    backgroundColor: "blue",
    padding: 10,
    width: 50,
    height: 100,
  },
});
const FlexBox = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flex Box</Text>
      <View>
        <Text style={styles.title1}>Flex Box - 1</Text>
      </View>
      <View>
        <Text style={styles.title2}>Flex Box - 2</Text>
      </View>
      <View>
        <Text style={styles.title3}>Flex Box - 3</Text>
      </View>
    </View>
  );
};
export default FlexBox;

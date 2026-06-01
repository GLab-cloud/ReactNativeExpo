import { View, Text, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 20,
  },
  title1: {
    fontSize: 20,
    backgroundColor: "red",
  },
  title2: {
    fontSize: 20,
    backgroundColor: "green",
  },
  title3: {
    fontSize: 20,
    backgroundColor: "blue",
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

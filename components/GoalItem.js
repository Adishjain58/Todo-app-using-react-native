import { StyleSheet, Text, View, Pressable } from "react-native";
const GoalItem = ({ text, onDeleteItem }) => {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        onPress={onDeleteItem}
        // we can pass a function as well to this style prop, in case of pressed function this function will automatically
        // get an object in the arguments and in that object we have a pressed property which tells us
        // whether the button is pressed or not and based on this we could return some different styles
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,

    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});

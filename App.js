import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalVisible] = useState(false);

  const addGoalHandler = (enteredGoalText) => {
    if (!enteredGoalText) {
      return;
    }
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    modalHandler();
  };

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  };

  const modalHandler = () => {
    setModalVisible((currentVal) => !currentVal);
  };

  return (
    <>
      {/* Default component provided by expo to twek the staus bar of our mobile */}
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title="Add New Goal" color="#a065ec" onPress={modalHandler} />
        {modalIsVisible && (
          <GoalInput
            modalHandler={modalHandler}
            visible={modalIsVisible}
            addGoalHandler={addGoalHandler}
          />
        )}
        <View style={styles.goalsContainer}>
          {/* A component provided by react-native when we want to create scrollable list
          and load them lazily */}
          <FlatList
            // property where we pass the array which contains our data
            data={courseGoals}
            // property which expects a function which should return the layout of each listItem
            // and this function will given an item as argument on which we can call item and access
            // the item present at the indexes of array
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={() => deleteGoalHandler(itemData.item.id)}
                />
              );
            }}
            // Property where we can define which data to use as a key and this accepts a function
            // and provide us access to elements of our array
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
  },
});

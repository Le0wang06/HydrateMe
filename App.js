import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch, Animated } from "react-native";

const hydrationTips = [
  "🚰 Sip water throughout the day instead of chugging it all at once!",
  "🍋 Add lemon to your water for extra flavor and vitamin C!",
  "⏰ Set reminders every hour to take a sip!",
  "🍵 Herbal teas also count towards your hydration goal!",
  "🥤 Avoid sugary drinks; water is your best hydration source!",
];

export default function App() {
  const [waterIntake, setWaterIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [goalCompleted, setGoalCompleted] = useState(false);
  const [hydrationTip, setHydrationTip] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const progress = new Animated.Value(waterIntake / dailyGoal);

  const addWater = (amount) => {
    const newIntake = waterIntake + amount;
    setWaterIntake(newIntake);
    setHydrationTip(hydrationTips[Math.floor(Math.random() * hydrationTips.length)]);

    Animated.timing(progress, {
      toValue: Math.min(newIntake / dailyGoal, 1),
      duration: 300,
      useNativeDriver: false,
    }).start();

    if (newIntake >= dailyGoal && !goalCompleted) {
      setGoalCompleted(true);
    }
  };

  const resetDay = () => {
    setWaterIntake(0);
    setGoalCompleted(false);
    setHydrationTip("💧 Stay hydrated and refreshed!");
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, darkMode && styles.darkText]}>💧 HydrateMe</Text>
        <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
      </View>

      <Text style={[styles.subText, darkMode && styles.darkText]}>Track your daily water intake</Text>

      {/* Animated Wave Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBarBackground, darkMode && styles.darkProgressBar]}>
          <Animated.View
            style={[styles.progressBar, {
              width: progress.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }),
              backgroundColor: goalCompleted ? "green" : "#0D47A1",
            }]}
          />
        </View>
        <Text style={[styles.progressText, darkMode && styles.darkText]}>
          {waterIntake} ml / {dailyGoal} ml
        </Text>
        <Text style={[styles.goalText, goalCompleted && styles.goalAchieved, darkMode && styles.darkText]}>
          {goalCompleted ? "✅ Daily Goal Completed!" : `${dailyGoal} ml Goal`}
        </Text>
      </View>

      {/* Custom Goal Input */}
      <View style={styles.inputContainer}>
        <Text style={[styles.goalText, darkMode && styles.darkText]}>Set Your Goal (ml):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="2000"
          placeholderTextColor="#888"
          onChangeText={(text) => setDailyGoal(Number(text))}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => addWater(250)}>
          <Text style={styles.buttonText}>+250 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addWater(500)}>
          <Text style={styles.buttonText}>+500 ml</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetDay}>
        <Text style={styles.resetButtonText}>Reset Day</Text>
      </TouchableOpacity>

      {/* Hydration Tip Box */}
      <View style={styles.tipBox}>
        <Text style={[styles.tipText, darkMode && styles.darkText]}>{hydrationTip}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0D47A1",
  },
  darkText: {
    color: "#FFF",
  },
  subText: {
    fontSize: 16,
    color: "#1E88E5",
    marginBottom: 20,
  },
  progressContainer: {
    width: "90%",
    alignItems: "center",
  },
  progressBarBackground: {
    width: "100%",
    height: 15,
    backgroundColor: "#BBDEFB",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  darkProgressBar: {
    backgroundColor: "#333",
  },
  progressBar: {
    height: "100%",
    borderRadius: 10,
  },
  progressText: {
    fontSize: 18,
    color: "#0D47A1",
    fontWeight: "bold",
  },
  goalText: {
    fontSize: 16,
    color: "#1E88E5",
    marginTop: 5,
  },
  goalAchieved: {
    color: "green",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 15,
  },
  input: {
    width: 120,
    height: 40,
    borderWidth: 1,
    borderColor: "#1E88E5",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 16,
    marginTop: 5,
    backgroundColor: "#FFF",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#D32F2F",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  resetButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  tipBox: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tipText: {
    fontSize: 14,
    color: "#00796B",
    fontStyle: "italic",
    textAlign: "center",
  },
});

import { Text, View, Button, StyleSheet, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import Slider from "@react-native-community/slider";

export default function HomePage() {

    const [selectedGameMode, setGameMode] = useState<number | null>(null);
    const gameModes = ["Twister", "Random", "Memory", "Speed"];

    const [difficulty, setDifficulty] = useState(0);

  return (
      <View style={styles.container}>
          <Stack.Screen options={{ headerShown:false} } />
          <Text style={styles.title}>Kilter Board App</Text>

          <Text style={styles.subtitle}>Player Name Stats</Text>
          <View style={styles.statsBoxes}>
              <Text style={styles.subtitle}>Games Played</Text>
              <Text style={styles.stats}>123 Total</Text>
          </View>

       
          <Text style={styles.subtitle}>New Game</Text>
          <View style={styles.gameBox}>
              <Text style={styles.subtitle}>Select Mode</Text>
              <View style={styles.gameModesBox}>
                {gameModes.map((gameMode, index) => {
                  const isSelected = selectedGameMode === index;
                  return (
                      <Pressable key={index} onPress={() => setGameMode(index)}
                          style={[styles.modesButton,
                          isSelected && styles.buttonPressed,
                          index === 0 && styles.leftButton,
                          index === gameModes.length - 1 && styles.rightButton,]}>
                          <Text style={[styles.modesButtonText, isSelected && styles.buttonPressed]}>{gameMode}</Text>
                      </Pressable>
                  );
              })}
              </View>
              <Text style={styles.subtitle}>Set Difficulty</Text>
              <Slider style={styles.slider} minimumValue={0} maximumValue={10} step={1} value={difficulty} onValueChange={value => setDifficulty(value)}
                  minimumTrackTintColor="purple" maximumTrackTintColor="green" thumbTintColor="pink" />
              <Text style={styles.subtitle}>Difficulty: V{difficulty}</Text>
              
              {/*<Button color="red" title="Start Game" onPress={() => alert("Game Starting...")} />*/}
              <Pressable style={({ pressed }) => [styles.startButton, pressed && styles.buttonPressed,]} onPress={() => alert("Game Starting...")}>
                  <Text style={styles.buttonText}>Start Game</Text>
              </Pressable>
          </View>

          <View style={styles.friendBox}>
              <Text style={styles.subtitle}>Friends</Text>
          </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f8f8f8",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "600",
    },
    statsBoxes: {
        borderRadius: 10,
        width: "70%",
        alignItems: "center",
        padding: 15,
        borderColor: "grey",
        marginBottom: 30,
        borderWidth: 2,
    },
    stats: {
        fontSize: 20,
    },
    gameBox: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "grey",
        width: "90%",
        alignItems: "center",
        padding: 15,
        marginBottom: 30,
    },
    friendBox: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "grey",
        width: "90%",
        alignItems: "center",
        padding: 15,
        marginBottom: 30,
    },
    startButton: {
        width: "75%",
        borderRadius: 10,
        backgroundColor: "black",
        alignItems: "center",
    },
    modesButton: {
        width: "25%",
        borderRadius: 10,
        borderColor: "grey",
        borderWidth: 2,
        alignItems: "center",
        marginLeft: 3,
    },
    modesButtonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonPressed: {
        backgroundColor: "grey",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    leftButton: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    rightButton: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    gameModesBox: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        padding: 2,
        marginBottom: 30,
    },
    slider: {
        width: "80%",
        height: 40,
    },
});

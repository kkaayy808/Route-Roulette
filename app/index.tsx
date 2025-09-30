import { Text, View, Button, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

export default function HomePage() {
  return (
    <View style={styles.container}>
          <Text style={styles.title}>Kilter Board App</Text>

          <Text style={styles.subtitle}>Player Name Stats</Text>
          <View style={styles.statsBoxes}>
              <Text style={styles.subtitle}>Games Played</Text>
              <Text style={styles.stats}>123 Total</Text>
          </View>

          <Text style={styles.subtitle}>New Game</Text>
          <View style={styles.gameBox}>
              <Text style={styles.subtitle}>Select Mode</Text>
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
    buttonPressed: {
        backgroundColor: "grey",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

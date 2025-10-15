import { Text, View, Button, StyleSheet, Pressable } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { useState } from "react";
import Slider from "@react-native-community/slider";

export default function SimulatorPage() {

    const router = useRouter();

    const circles = Array.from({ length: 121 });

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={styles.title}>Simulator Page</Text>

            <View style={styles.kilterBoard}>

                {circles.map((_, index) => (
                    < View key={index} style={styles.circle} />
                ))}

            </View>


            <View style={styles.settings}>
                <Text style={styles.subtitle}>[Game] Mode</Text>


                <Text style={styles.subtitle}>Time: 00:00:00</Text>

                <Pressable style={({ pressed }) => [styles.startButton, pressed && styles.buttonPressed,]} onPress={() => router.push("/simulator") }>
                    <Text style={styles.buttonText}>New Game</Text>
                </Pressable>
                
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
        marginBottom: 50,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "600",
        textAlign: "left",
        width: "100%",
    },
    settings: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "grey",
        width: "100%",
        alignItems: "center",
        padding: 15,
        marginBottom: 20,
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
    kilterBoard: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "grey",
        width: "100%",
        height: 350,
        alignItems: "center",
        padding: 15,
        marginBottom: 20,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        backgroundColor: "grey",
        borderColor: "black",
        borderWidth: 2,
        margin: 2,
    },
});

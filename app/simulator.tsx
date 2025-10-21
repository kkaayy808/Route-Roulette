import { Text, View, StyleSheet, Pressable , TouchableOpacity} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState , useEffect, useRef} from "react";
import { Ionicons } from "@expo/vector-icons";


export default function SimulatorPage() {

    const { gameMode } = useLocalSearchParams<{ gameMode?: string }>();
    const modeIndex = gameMode ? parseInt(gameMode, 10) : -1;

    let gridColor = "grey"


    switch (modeIndex) {
        case 0:
            gridColor = "red";
            break;
        case 1:
            gridColor = "blue";
            break;
        case 2:
            gridColor = "pink";
            break;
        case 3:
            gridColor = "green";
            break;
        default:
            gridColor = "purple";
    }



    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const startTimeRef = useRef(0);


    useEffect(() => {
        if (isRunning) {

            startTimeRef.current = Date.now() - elapsedTime;

            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);


    const handlePlay = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);

    {/* gonna use this to restart game with new game button instead of stack push */}
    const handleReset = () => {
        setIsRunning(false);
        setElapsedTime(0);
    };


    const router = useRouter();

    const circles = Array.from({ length: 121 });


    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000)
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={styles.title}>Simulator Page {gameMode}</Text>

            <View style={styles.kilterBoard}>

                {circles.map((_, index) => (
                    < View key={index} style={[styles.circle, {backgroundColor: gridColor}]} />
                ))}

            </View>


            <View style={styles.settings}>
                <Text style={styles.subtitle}>[Game] Mode</Text>


                <Text style={styles.subtitle}>Time: {formattedTime}</Text>
                <View style={styles.controlBox}>

                    <TouchableOpacity onPress={isRunning ? handlePause : handlePlay}>

                        <Ionicons
                            name={isRunning ? "pause-outline" : "caret-forward-outline"}
                            size={40}
                            color={isRunning ? "red" : "green"}
                        />

                        {/*
                            <Ionicons name="caret-forward-outline" color={"black"} size={40} 
                            <Ionicons name="pause-outline" color={"black"} size={40} />
                        />*/}
                

                    </TouchableOpacity>

                </View>


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
        textAlign: "center",
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
        borderColor: "black",
        borderWidth: 2,
        margin: 2,
    },
    controlBox: {
        flexDirection: "row",
        justifyContent: "center",
        width: "95%",
        alignItems: "center",
        marginBottom: 30,
    },
});

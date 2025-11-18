import { Text, View, StyleSheet, Pressable , TouchableOpacity} from "react-native";
import { Stack, useLocalSearchParams, useRouter , useNavigation} from "expo-router";
import { useState , useEffect, useRef} from "react";
import { Ionicons } from "@expo/vector-icons";


export default function SimulatorPage() {


    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const timerRef = useRef<number | null>(null);
    const animationRef = useRef<number | null>(null);
    const intervalRef = useRef<number | null>(null);
    const startTimeRef = useRef(0);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const { gameMode } = useLocalSearchParams<{ gameMode?: string }>();
    const modeIndex = gameMode ? parseInt(gameMode, 10) : -1;


    //game mode 3: speed mode
    const [speed, setSpeed] = useState(1000);
    const timeoutRef = useRef<number | null>(null);

    const runSpeedMode = (currentSpeed: number) => {
        setActiveIndex(Math.floor(Math.random() * 121));

        const nextSpeed = Math.max(200, currentSpeed * 0.95);

        timeoutRef.current = setTimeout(() => runSpeedMode(nextSpeed), nextSpeed);
    };


    //game mode 0: twister mode
    const [activeSpots, setActiveSpots] = useState({
        red: Math.floor(Math.random() * 121),
        blue: Math.floor(Math.random() * 121),
        green: Math.floor(Math.random() * 121),
        yellow: Math.floor(Math.random() * 121),
    });

    const getCircleColor = (index: number) => {
        if (modeIndex === 0) {
            if (index === activeSpots.red) return "red";
            if (index === activeSpots.blue) return "blue";
            if (index === activeSpots.green) return "green";
            if (index === activeSpots.yellow) return "yellow";
            return "white";
        }
        else {
            return index === activeIndex ? "purple" : "white";
        }
        
    };



    //let gridColor = "grey"
    let gameModeName = ""


    switch (modeIndex) {
        case 0:
            //gridColor = "red";
            gameModeName = "Twister";
            break;
        case 1:
            //gridColor = "blue";
            gameModeName = "Random";
            //intervalRef.current = setInterval(() => {
            //    setActiveIndex(Math.floor(Math.random() * 121));
            //}, 300);            
            break;
        case 2:
            //gridColor = "pink";
            gameModeName = "Memory";
            break;
        case 3:
            //gridColor = "green";
            gameModeName = "Speed";
            break;
        default:
            //gridColor = "purple";
            gameModeName = "";
    }


    useEffect(() => {
        if (isRunning) {

            startTimeRef.current = Date.now() - elapsedTime;

            timerRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);

            }, 10);

            if (modeIndex === 0) {
                intervalRef.current = setInterval(() => {
                    const colors = ["red", "blue", "green", "yellow"];
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    const newIndex = Math.floor(Math.random() * 121);

                    setActiveSpots((prev) => ({
                        ...prev,
                        [randomColor]: newIndex,
                    }));
                }, 1500);
            }
            else if (modeIndex === 1) {
                animationRef.current = setInterval(() => {
                    setActiveIndex(Math.floor(Math.random() * 121));
                }, 1500);
            }
            else if (modeIndex === 3) {
                runSpeedMode(speed);
            }



            //return () => clearInterval(timerId);


            //intervalRef.current = setInterval(() => {
            //    setElapsedTime(Date.now() - startTimeRef.current);

            //    if (modeIndex === 1) {
            //        setActiveIndex(Math.floor(Math.random() * 121));
            //    }
            //}, 300);


            //if (modeIndex === 1) {
            //    intervalRef.current = setInterval(() => {
            //        setActiveIndex(Math.floor(Math.random() * 121));
            //    }, 300);
            //}

        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            if (animationRef.current) {
                clearInterval(animationRef.current);
                animationRef.current = null;
            }
            if (timeoutRef.current) {
                clearInterval(timeoutRef.current);
                timeoutRef.current = null;
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            if (animationRef.current) {
                clearInterval(animationRef.current);
                animationRef.current = null;
            }
            if (timeoutRef.current) {
                clearInterval(timeoutRef.current);
                timeoutRef.current = null;
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };


    }, [gameMode, isRunning]);


    const handlePlay = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);

    {/* gonna use this to restart game with new game button instead of stack push */}
    const handleReset = () => {
        setIsRunning(false);
        setElapsedTime(0);
    };


    const router = useRouter();
    const navigation = useNavigation();

    const resetGame = () => {
        router.replace({
            pathname: "/simulator",
            params: { gameMode },
        });
    };


    const circles = Array.from({ length: 121 });


    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000)
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={styles.title}>Simulator Page</Text>

            <View style={styles.kilterBoard}>

                {circles.map((_, index) => (
                    < View key={index} style={[styles.circle, {backgroundColor: getCircleColor(index)}]} />
                ))}

            </View>


            <View style={styles.settings}>
                <Text style={styles.mainSubtitle}>{gameModeName} Mode</Text>

                 
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


                {/*<Pressable style={({ pressed }) => [styles.startButton, pressed && styles.buttonPressed,]} onPress={() => router.push("/simulator") }>*/}
                <Pressable style={({ pressed }) => [styles.startButton, pressed && styles.buttonPressed,]} onPress={resetGame}>
                    <Text style={styles.buttonText}>New Game!</Text>
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
    mainSubtitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "700",
        textAlign: "center",
        width: "100%",
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
    activeCircle: {
        backgroundColor: "purple",
    },
});

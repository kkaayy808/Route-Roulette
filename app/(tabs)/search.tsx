import { Text , StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SearchPage() {


    return (
        <SafeAreaView style={styles.container}>
            <Text>This is the search page</Text>
        </SafeAreaView>
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
});
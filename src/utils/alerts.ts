import { Alert } from "react-native";

export function simpleAlert(title: string, text: string) {
    Alert.alert(title, text, [{ text: "OK" }]);
}
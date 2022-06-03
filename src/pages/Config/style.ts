import { StyleSheet, TextStyle } from "react-native";
const a: TextStyle = {};

export default StyleSheet.create({

    formRow: {
        marginBottom: 20
    },

    input: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#010101",
        color: "#000000",
        borderRadius: 5,
        paddingVertical: 5,
        paddingLeft: 5,
        width: "100%",
        minHeight: 55
    },

    border: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#010101",
    },

    button: {
        backgroundColor: "#2274A5",
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 13,
        marginTop: 15
    },

    buttonText: {
        color: "#ffffff",
        fontSize: 18
    }

});
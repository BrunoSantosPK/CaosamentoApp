import { StyleSheet } from "react-native";

export default StyleSheet.create({

    loginContent: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },

    logo: {
        width: 150,
        height: 150,
        marginTop: 50
    },

    pageTitle: {
        marginVertical: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    },

    formContent: {
        width: "80%",
        backgroundColor: "#ffffff",
        borderRadius: 5,
        paddingHorizontal: 20
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
        marginBottom: 15
    },

    buttonExecute: {
        backgroundColor: "#2274A5",
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 7
    },

    buttonExecuteText: {
        color: "#ffffff",
        fontSize: 18
    },

    buttonLink: {},

    contentLink: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 10
    }

});
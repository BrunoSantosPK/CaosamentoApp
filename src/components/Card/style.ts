import { StyleSheet, Dimensions } from "react-native";

const imageDimension = Dimensions.get("screen").width * 0.2;

export default StyleSheet.create({

    content: {
        backgroundColor: "#E9F1F7",
        marginBottom: 10,
        padding: 10
    },

    photo: {
        width: imageDimension,
        height: imageDimension
    },

    text: {
        paddingHorizontal: 10,
        width: Dimensions.get("screen").width * 0.65
    },

    principalRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    buttonsRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20
    },

    buttonText: {
        paddingHorizontal: 10
    }

});
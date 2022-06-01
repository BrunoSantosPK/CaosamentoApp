import Constants from "expo-constants";
import { StyleSheet } from "react-native";

export default StyleSheet.create({

    content: {
        flexDirection: "row",
        //backgroundColor: "#000",
        paddingTop: Constants.statusBarHeight + 10,
        paddingHorizontal: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },

    contentLogo: {
        width: 75,
        height: 75
    },

    contentText: {
        fontSize: 19,
        fontWeight: "bold"
    }

});
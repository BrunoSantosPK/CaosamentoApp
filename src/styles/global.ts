import Constants from "expo-constants";
import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({

    appContent: {
        flex: 1,
        backgroundColor: "#fafafa",
        paddingTop: Constants.statusBarHeight + 10
    },

    loadingContent: {
        zIndex: 999,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height
    },

    page: {
        flex: 1,
        backgroundColor: "#fafafa"
    },

    content: {
        height: Dimensions.get("screen").height * 0.88,
        
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: Constants.statusBarHeight + 10
    }

});
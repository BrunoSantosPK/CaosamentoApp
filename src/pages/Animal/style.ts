import { StyleSheet } from "react-native";

export default StyleSheet.create({

    formElement: {
        marginTop: 15
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
        minHeight: 60
    },

    contentSelect: {
        borderWidth: 1,
        borderColor: "#010101",
        borderStyle: "solid",
        borderRadius: 5
    },

    buttonImage: {
        backgroundColor: "#E7DFC6",
        maxWidth: "30%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        borderRadius: 3
    },

    buttonImagemText: {
        color: "#000000"
    },

    contentImage: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    },

    image: {
        width: 200,
        height: 200
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

    containerModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    contentModal: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 50,
        width: "80%",
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30
    },

    modalTitle: {
        fontSize: 18,
        textAlign: "center"
    },

    modalInput: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#010101",
        color: "#000000",
        borderRadius: 5,
        paddingVertical: 5,
        paddingLeft: 5,
        width: "100%",
        marginBottom: 15
    }

});
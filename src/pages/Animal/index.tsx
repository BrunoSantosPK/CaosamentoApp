import React from "react";
import { Picker } from "@react-native-picker/picker";
import {
    View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView,
    TouchableWithoutFeedback, ActivityIndicator, Platform, Keyboard, ScrollView
} from "react-native";

// Folhas de estilos e imagens
import style from "./style";
import global from "../../styles/global";

// Componentes próprios de navegação e exibição
import Header from "../../components/Header";
import { navigateElements } from "../../utils/tabs";
import TabNavigate from "../../components/TabNavigate";

export default function Animal() {
    // Máquina de estados
    const [loading, setLoading] = React.useState(false);

    // Implementação do modal para cadastro de raça

    return (
        <KeyboardAvoidingView style={global.page} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            {loading && <View style={global.loadingContent}>
                <ActivityIndicator size="large" />
            </View>}
            <Header title="Seus dados" />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={global.content}>
                <ScrollView contentContainerStyle={global.scrollContent}></ScrollView>
            </TouchableWithoutFeedback>

            <TabNavigate elements={navigateElements()} />
        </KeyboardAvoidingView>
    );
}
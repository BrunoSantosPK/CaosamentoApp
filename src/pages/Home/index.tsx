import React from "react";
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";

// Folhas de estilos e imagens
import style from "./style";
import global from "../../styles/global";
import logo from "../../../assets/logo.png";

// Customização
import TabNavigate from "../../components/TabNavigate";
import Header from "../../components/Header";
import { navigateElements } from "../../utils/tabs";
import Card from "../../components/Card";

export default function Home() {
    // Máquina de estado
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        //
    }, []);

    return (
        <View style={global.page}>
            {loading && <View style={global.loadingContent}>
                <ActivityIndicator size="large" />
            </View>}
            <Header title="Seus PETs" />

            <SafeAreaView style={global.content}>
                <ScrollView contentContainerStyle={global.scrollContent}>
                    {[1, 2, 3].map(() => (<Card />))}
                </ScrollView>
            </SafeAreaView>

            <TabNavigate elements={navigateElements()} />
        </View>
    );
}
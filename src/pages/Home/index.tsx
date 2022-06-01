import React from "react";
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";

// Folhas de estilos e imagens
import style from "./style";
import global from "../../styles/global";
import logo from "../../../assets/logo.png";

// Customização
import TabNavigate from "../../components/TabNavigate";
import Header from "../../components/Header";

export default function Home() {
    // Máquina de estado
    const [loading, setLoading] = React.useState(false);
    const [lambari, setLambari] = React.useState([] as Array<number>);

    React.useEffect(() => {
        const chupeta = [];
        for(let i = 0; i < 200; i++) {
            chupeta.push(i);
        }
        setLambari(chupeta);
    }, []);

    return (
        <View style={global.page}>
            {loading && <View style={global.loadingContent}>
                <ActivityIndicator size="large" />
            </View>}

            <SafeAreaView style={global.content}>
                <ScrollView contentContainerStyle={global.scrollContent}>
                    <Header />
                    {lambari.map((item, i) => (<Text>{item} Somos todos robalos</Text>))}
                </ScrollView>
            </SafeAreaView>

            <TabNavigate />
        </View>
    );
}
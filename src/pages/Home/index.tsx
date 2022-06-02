import React from "react";
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";

// Folhas de estilos e imagens
import style from "./style";
import global from "../../styles/global";

// Customização
import TabNavigate from "../../components/TabNavigate";
import Header from "../../components/Header";
import { navigateElements } from "../../utils/tabs";
import Card from "../../components/Card";
import { getCredentials } from "../../services/storage";
import { simpleAlert } from "../../utils/alerts";
import { getPETs } from "../../services/animals";

export default function Home() {
    // Máquina de estado
    const [loading, setLoading] = React.useState(false);

    // Função de inicialização
    async function init() {
        try {
            // Carrega credenciais
            const credentials = await getCredentials();
            if(!credentials.success)
                throw new Error(credentials.message);

            // Recupera dados de pets cadastrados
            const uid = credentials.data?.uid as string;
            const token = credentials.data?.token as string;
            
            const pets = await getPETs(uid, token);
            if(!pets.success)
                throw new Error(pets.message);

            console.log(pets);

        } catch(error: any) {
            simpleAlert("Alerta", error.message)
        }
    }
    React.useEffect(() => { init(); }, []);

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
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";

// Folhas de estilos e imagens
import style from "./style";
import global from "../../styles/global";

// Componentes próprios de navegação e exibição
import Header from "../../components/Header";
import { navigateElements } from "../../utils/tabs";
import TabNavigate from "../../components/TabNavigate";
import Card, { CardButton } from "../../components/Card";

// Gerenciamento de API, armazenamento e funções diversas
import { Animal } from "../../interfaces/api";
import { simpleAlert } from "../../utils/alerts";
import { getCredentials } from "../../services/storage";
import { getPETs, getPhotoURL } from "../../services/animals";

export default function Home() {
    // Tipagem
    type CardElement = { text: string, urlPhoto: string };

    // Máquina de estado
    const [loading, setLoading] = React.useState(false);
    const [cards, setCards] = React.useState([] as Array<CardElement>);
    const [buttons, setButtons] = React.useState([
        { label: "Editar", callback: () => console.log("clicou em editar") },
        { label: "Excluir", callback: () => console.log("clicou em excluir") }
    ] as Array<CardButton>);

    // Define o render para criação dos cartões
    function renderCards(data: Array<Animal>) {
        const elements: Array<CardElement> = [];
        for(let i = 0; i < data.length; i++) {
            elements.push({
                text: `${data[i].name}\n${data[i].breedName}\n${data[i].description}`,
                urlPhoto: `${getPhotoURL(data[i].photo)}`
            });
        }
        setCards(elements);
    }

    // Função de inicialização
    async function init() {
        try {
            // Carrega credenciais
            setLoading(true);
            const credentials = await getCredentials();
            if(!credentials.success)
                throw new Error(credentials.message);

            // Recupera dados de pets cadastrados
            const uid = credentials.data?.uid as string;
            const token = credentials.data?.token as string;
            
            const pets = await getPETs(uid, token);
            if(!pets.success)
                throw new Error(pets.message);

            // Atualiza dados
            renderCards(pets.data?.data.pets as Array<Animal>);

        } catch(error: any) {
            simpleAlert("Alerta", error.message)
        } finally {
            setLoading(false);
        }
    }
    React.useEffect(() => { init(); }, []);

    return (
        <View style={global.page}>
            {loading && <View style={global.loadingContent}>
                <ActivityIndicator size="large" />
            </View>}
            <Header title="" />

            <SafeAreaView style={global.content}>
                <ScrollView contentContainerStyle={global.scrollContent}>

                    <View style={style.homeRow}>
                        <TouchableOpacity style={style.homeAddButton}>
                            <MaterialIcons name="add-circle-outline" size={24} color="black" />
                            <Text style={style.homeAddButtonText}>PET</Text>
                        </TouchableOpacity>
                    </View>

                    {cards.map((item, i) => (
                        <Card text={item.text} urlPhoto={item.urlPhoto} buttons={buttons} key={`card-${i}`} />
                    ))}

                </ScrollView>
            </SafeAreaView>

            <TabNavigate elements={navigateElements()} />
        </View>
    );
}
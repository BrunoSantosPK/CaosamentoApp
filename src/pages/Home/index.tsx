import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
    View, Text, SafeAreaView, ScrollView, ActivityIndicator,
    TouchableOpacity, RefreshControl, Modal
} from "react-native";

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
import { getPETs, getPhotoURL, deleteAnimal } from "../../services/animals";

export default function Home() {
    // Tipagem
    type CardElement = { text: string, urlPhoto: string, id: string };

    // Máquina de estado
    const navigation = useNavigation();
    const [animalId, setAnimalId] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [cards, setCards] = React.useState([] as Array<CardElement>);
    const [buttons, setButtons] = React.useState([
        { label: "Excluir", callback: (id) => showModal(id) }
    ] as Array<CardButton>);

    // Gerencia o render ao fazer o scroll
    async function render() {
        setRefreshing(true);
        await init();
        setRefreshing(false);
    }

    // Define a exclusão de PET
    function showModal(id: string) {
        setAnimalId(id);
        setModalVisible(true);
    }

    async function removePET() {
        try {
            // Recupera credenciais
            setLoading(true);
            const credentials = await getCredentials();
            if(!credentials.success)
                throw new Error(credentials.message);

            const uid = credentials.data?.uid as string;
            const token = credentials.data?.token as string;

            // Envia requisição para remover o animal
            const result = await deleteAnimal(animalId, uid, token);
            if(!result.success)
                throw new Error(result.message);

            // Renderiza a tela
            await init();
            simpleAlert("Sucesso", "PET removido");

        } catch(error: any) {
            simpleAlert("Alerta", error.message);
        } finally {
            setLoading(false);
            setModalVisible(false);
        }
    }

    // Define o render para criação dos cartões
    function renderCards(data: Array<Animal>) {
        const elements: Array<CardElement> = [];
        for(let i = 0; i < data.length; i++) {
            elements.push({
                text: `${data[i].name}\n${data[i].breedName}\n${data[i].description}`,
                urlPhoto: `${getPhotoURL(data[i].photo)}`,
                id: data[i]._id
            });
        }
        setCards(elements);
    }

    // Implementa a mudança de página para criação/edição de PET
    function goAnimal() {
        navigation.navigate("Animal" as never, { mode: "add" } as never);
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
            simpleAlert("Alerta", error.message);
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
                <ScrollView
                    contentContainerStyle={global.scrollContent}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={render} />}
                >

                    <View style={style.homeRow}>
                        <TouchableOpacity style={style.homeAddButton} onPress={goAnimal}>
                            <MaterialIcons name="add-circle-outline" size={24} color="black" />
                            <Text style={style.homeAddButtonText}>PET</Text>
                        </TouchableOpacity>
                    </View>

                    {cards.map((item, i) => (
                        <Card
                            id={item.id}
                            text={item.text}
                            urlPhoto={item.urlPhoto}
                            buttons={buttons}
                            key={`card-${i}`}
                        />
                    ))}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={global.containerModal}>
                            <View style={global.contentModal}>
                                <View style={global.modalHeader}>
                                    <Text style={global.modalTitle}>Confirmar remoção</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <AntDesign name="closecircleo" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>

                                <Text>Deseja realmente remover o PET?</Text>

                                <TouchableOpacity style={global.modalButtonExecute} onPress={removePET}>
                                    <Text style={global.modalButtonExecuteText}>Deletar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </ScrollView>
            </SafeAreaView>

            <TabNavigate elements={navigateElements()} />
        </View>
    );
}
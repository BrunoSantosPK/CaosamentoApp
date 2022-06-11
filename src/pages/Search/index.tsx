import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView, Modal } from "react-native";

// Folhas de estilos e imagens
import style from "./style";
import global from "../../styles/global";

// Componentes próprios de navegação e exibição
import Header from "../../components/Header";
import { navigateElements } from "../../utils/tabs";
import TabNavigate from "../../components/TabNavigate";
import Card, { CardButton } from "../../components/Card";

// Execuções, serviços e tipos
import { simpleAlert } from "../../utils/alerts";
import { getCredentials } from "../../services/storage";
import { getCityByUF, getUFs } from "../../services/ibge";
import { getBreeds, searchAnimals, DataSearch } from "../../services/animals";
import { Breed } from "../../interfaces/api";
import { getPhotoURL } from "../../services/animals";
import { Animal } from "../../interfaces/api";

export default function Search() {
    // Tipagem
    type UF = { label: string, code: number };
    type CardElement = { text: string, urlPhoto: string, pet: Animal };

    // Define os padrões de seleção
    const pattern = {
        breed: "Raça",
        uf: "Estado",
        city: "Cidade"
    };

    // Máquina de estados
    const [uid, setUID] = React.useState("");
    const [token, setToken] = React.useState("");
    const [uf, setUF] = React.useState(pattern.uf);
    const [loading, setLoading] = React.useState(false);
    const [city, setCity] = React.useState(pattern.city);
    const [breed, setBreed] = React.useState(pattern.breed);
    
    const [ufs, setUFs] = React.useState([] as Array<UF>);
    const [selectAnimal, setSelectAnimal] = React.useState("");
    const [modalVisible, setModalVisible] = React.useState(false);
    const [breeds, setBreeds] = React.useState([] as Array<Breed>);
    const [cities, setCities] = React.useState([] as Array<string>);
    const [cards, setCards] = React.useState([] as Array<CardElement>);
    const [buttons, setButtons] = React.useState([
        { label: "Ver mais", callback: (id) => showDetail(id) }
    ] as Array<CardButton>);

    // Faz a busca
    async function search() {
        try {
            // Verifica os seletores cadastrados
            setLoading(true);
            if(uf == pattern.uf)
                throw new Error("Selecione um estado.");

            if(city == pattern.city)
                throw new Error("Selecione uma cidade.");

            if(breed == pattern.breed)
                throw new Error("Selecione uma raça.");

            const data: DataSearch = {
                breed, city, uf, uid, page: 1
            };

            // Envia a requisição de busca
            const result = await searchAnimals(data, uid, token);
            const cdata: Array<CardElement> = [];

            // Atualiza variável de estado para render dos cartões
            result.data?.data.pets.forEach(item => {
                cdata.push({
                    text: `${item.name}\n${item.breedName}\n${item.description}`,
                    urlPhoto: `${getPhotoURL(item.photo)}`,
                    pet: item
                })
            });
            setCards(cdata);

        } catch(error: any) {
            simpleAlert("Atenção", error.message);
        } finally {
            setLoading(false);
        }
    }

    // Controla a abertura do modal de detalhes
    function showDetail(id: string) {
        setModalVisible(true);
        setSelectAnimal(id);
    }

    // Sequência para atualização das cidades disponíveis
    async function loadCity(state: string) {
        const code = ufs.find(item => item.label == state);
        const result = await getCityByUF(code?.code as number);

        try {
            // Busca cidades
            setLoading(true);
            const item = ufs.find(item => item.label == state);
            const result = await getCityByUF(item?.code as number);
            if(!result.success)
                throw new Error(result.message);

            // Atualiza variável de estado
            const data: Array<string> = [pattern.city];
            result.data?.forEach(item => data.push(item.nome));
            setCities(data);

        } catch(error: any) {
            simpleAlert("Atenção", error.message);
        } finally {
            setLoading(false);
        }
    }

    // Gerencia o render do select de estado
    async function clickUF(text: string) {
        loadCity(text);
        setUF(text);
    }

    // Carrega dados de raças, estados e cidades
    async function init() {
        try {
            // Carrega credenciais
            setLoading(true);
            const credentials = await getCredentials();
            if(!credentials.success)
                throw new Error(credentials.message);

            const id = credentials.data?.uid as string;
            const jwt = credentials.data?.token as string;

            // Carrega estados
            const states = await getUFs();
            if(!states.success)
                throw new Error(states.message);

            const data: Array<UF> = [{ label: pattern.uf, code: -1 }];
            states.data?.forEach(item => data.push({ label: item.sigla, code: item.id }));

            // Carrega raças cadastradas
            const result = await getBreeds(id, jwt);
            if(!result.success)
                throw new Error(result.message);

            // Atualiza variáveis de estado
            setUID(id);
            setUFs(data);
            setToken(jwt);
            setCities([pattern.city]);
            setBreeds(result.data?.data.breeds as Array<Breed>);

        } catch(error: any) {
            simpleAlert("Atenção", error.message);
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
            <Header title="Buscar" />

            <SafeAreaView style={global.content}>
                <ScrollView contentContainerStyle={global.scrollContent}>

                    <View style={style.rowCell}>
                        <Picker selectedValue={uf} onValueChange={(value, i) => clickUF(value)}>
                            {ufs.map((item, i) => (
                                <Picker.Item label={item.label} value={item.label} key={`uf-${i}`} />
                            ))}
                        </Picker>
                    </View>

                    <View style={style.rowCell}>
                        <Picker selectedValue={city} onValueChange={(value, i) => setCity(value)}>
                            {cities.map((item, i) => (
                                <Picker.Item label={item} value={item} key={`city-${i}`} />
                            ))}
                        </Picker>
                    </View>

                    <View style={style.rowCell}>
                        <Picker selectedValue={breed} onValueChange={(value, i) => setBreed(value)}>
                            <Picker.Item label={pattern.breed} value={pattern.breed} />
                            {breeds.map((item, i) => (
                                <Picker.Item label={item.name} value={item._id} key={`breed-${i}`} />
                            ))}
                        </Picker>
                    </View>

                    <View style={style.rowCell}>
                        <TouchableOpacity style={style.button} onPress={search}>
                            <Text style={style.buttonText}>Buscar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={style.areaResult}>
                        {cards.map((item, i) => (
                            <Card
                                id={item.pet._id}
                                text={item.text}
                                urlPhoto={item.urlPhoto}
                                buttons={buttons} key={`card-${i}`}
                            />
                        ))}
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={global.containerModal}>
                            <View style={global.contentModal}>
                                <View style={global.modalHeader}>
                                    <Text style={global.modalTitle}>
                                        {cards.find(item => item.pet._id == selectAnimal)?.pet.name}
                                    </Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <AntDesign name="closecircleo" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>

                                <Text>
                                    {cards.find(item => item.pet._id == selectAnimal)?.pet.breedName}
                                    {"\n"}
                                    {cards.find(item => item.pet._id == selectAnimal)?.pet.description}
                                    {"\n\nDono: "}
                                    {cards.find(item => item.pet._id == selectAnimal)?.pet.email}
                                    {"\nContato via whatsapp? "}
                                    {cards.find(item => item.pet._id == selectAnimal)?.pet.shareWhatsapp
                                        ? "Sim\n" + cards.find(item => item.pet._id == selectAnimal)?.pet.whatsapp
                                        : "Não"
                                    }
                                </Text>

                            </View>
                        </View>
                    </Modal>

                </ScrollView>
            </SafeAreaView>

            <TabNavigate elements={navigateElements()} />
        </View>
    );
}
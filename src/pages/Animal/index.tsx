import React from "react";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import {
    View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, Modal,
    TouchableWithoutFeedback, ActivityIndicator, Platform, Keyboard, ScrollView
} from "react-native";

// Folhas de estilos e imagens
import style from "./style";
import global from "../../styles/global";

// Componentes próprios de navegação e exibição
import Header from "../../components/Header";
import { navigateElements } from "../../utils/tabs";
import TabNavigate from "../../components/TabNavigate";

// Gerenciamento de serviços e outras funções de manipulação
import { getBreeds } from "../../services/animals";
import { simpleAlert } from "../../utils/alerts";
import { getCredentials } from "../../services/storage";

export default function Animal() {
    // Tipagem
    type Photo = string | null;
    type Breed = { name: string, id: string };
    type RouteParams = { mode: "add" | "edit" };

    // Sistema de navegação
    const route = useRoute();
    const { mode } = route.params as RouteParams;

    // Máquina de estados
    const [loading, setLoading] = React.useState(false);
    const [listBreeds, setListBreeds] = React.useState([] as Array<Breed>);

    const [name, setName] = React.useState("");
    const [breed, setBreed] = React.useState("");
    const [image, setImage] = React.useState(null as Photo);
    const [description, setDescription] = React.useState("");

    // Busca de imagem
    async function getImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });

        if(!result.cancelled)
            setImage(result.uri);
    }

    // Gerencia a ação de escolha de raça

    // Implementação do modal para cadastro de raça

    // Função de inicialização
    async function init() {
        try {
            // Recupera credenciais de acesso
            setLoading(true);
            const credentials = await getCredentials();
            if(!credentials.success)
                throw new Error(credentials.message);

            const uid = credentials.data?.uid as string;
            const token = credentials.data?.token as string;

            // Busca dados de raças cadastradas
            const result = await getBreeds(uid, token);
            if(!result.success)
                throw new Error(result.message);

            // Prepara dados para variável de estado
            const data: Array<Breed> = [];
            result.data?.data.breeds.forEach(item => {
                data.push({ name: item.name, id: item._id });
            });

            setListBreeds(data);

        } catch(error: any) {
            simpleAlert("Atenção", error.message);
        } finally {
            setLoading(false);
        }
    }
    React.useEffect(() => { init(); }, []);

    return (
        <KeyboardAvoidingView style={global.page} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            {loading && <View style={global.loadingContent}>
                <ActivityIndicator size="large" />
            </View>}
            <Header title={mode == "add" ? "Novo PET" : "Editar PET"} />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={global.content}>
                <ScrollView contentContainerStyle={global.scrollContent}>

                    <View style={style.formElement}>
                        <TextInput
                            onChangeText={text => setName(text)}
                            style={style.input}
                            placeholder="Nome do PET"
                            textAlignVertical="top"
                            value={name}
                        />
                    </View>

                    <View style={style.formElement}>
                        <TextInput
                            multiline
                            textAlignVertical="top"
                            numberOfLines={3}
                            onChangeText={text => setDescription(text)}
                            style={style.input}
                            placeholder="Descrição do PET"
                            value={description}
                        />
                    </View>

                    <View style={style.formElement}>
                        <View style={style.contentSelect}>
                            <Picker selectedValue={breed} onValueChange={(value, i) => setBreed(value)}>
                                {listBreeds.map((item, i) => (
                                    <Picker.Item label={item.name} value={item.id} key={`breed-${i}`} />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={style.formElement}>
                        <TouchableOpacity onPress={getImage} style={style.buttonImage}>
                            <Text style={style.buttonImagemText}>Foto do PET</Text>
                        </TouchableOpacity>

                        {image && <View style={style.contentImage}>
                            <Image source={{ uri: image }} style={style.image} />
                        </View>}
                    </View>

                    <View style={style.formElement}>
                        <TouchableOpacity style={style.buttonExecute}>
                            <Text style={style.buttonExecuteText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                    >
                        <View style={style.containerModal}>
                            <View style={style.contentModal}>
                                <View style={style.modalHeader}>
                                    <Text style={style.modalTitle}>Cadastro de nova raça</Text>
                                    <TouchableOpacity>
                                        <AntDesign name="closecircleo" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>

                                <TextInput
                                    onChangeText={text => setDescription(text)}
                                    style={style.modalInput}
                                    placeholder="Nome da raça"
                                    value={description}
                                />

                                <TouchableOpacity style={style.buttonExecute}>
                                    <Text style={style.buttonExecuteText}>Cadastrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </ScrollView>
            </TouchableWithoutFeedback>

            <TabNavigate elements={navigateElements()} />
        </KeyboardAvoidingView>
    );
}
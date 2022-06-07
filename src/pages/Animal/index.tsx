import React from "react";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import {
    View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Image,
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
    // Tipagem
    type RouteParams = { mode: "add" | "edit" };
    type Photo = string | null;
    type FormData = {};

    // Sistema de navegação
    const route = useRoute();
    const { mode } = route.params as RouteParams;

    // Máquina de estados
    const [loading, setLoading] = React.useState(false);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [breed, setBreed] = React.useState("");
    const [image, setImage] = React.useState(null as Photo);

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

    // Implementação do modal para cadastro de raça

    // Função de inicialização
    async function init() {}
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
                            value={name}
                        />
                    </View>

                    <View style={style.formElement}>
                        <TextInput
                            multiline
                            numberOfLines={3}
                            onChangeText={text => setDescription(text)}
                            style={style.input}
                            placeholder="Nome do PET"
                            value={description}
                        />
                    </View>

                    <View style={style.formElement}>
                        <Picker selectedValue={breed} onValueChange={(value, i) => setBreed(value)}>
                            <Picker.Item label={"Raçudo"} value={"racudo"} />
                            <Picker.Item label={"Chupeta"} value={"chupeta"} />
                        </Picker>
                    </View>

                    <View style={style.formElement}>
                        <TouchableOpacity onPress={getImage}>
                            <Text>Selecione uma foto de perfil para o PET</Text>
                        </TouchableOpacity>

                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View>

                </ScrollView>
            </TouchableWithoutFeedback>

            <TabNavigate elements={navigateElements()} />
        </KeyboardAvoidingView>
    );
}
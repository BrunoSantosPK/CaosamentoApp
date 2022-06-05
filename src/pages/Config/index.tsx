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

// Execuções e serviços
import { simpleAlert } from "../../utils/alerts";
import { getCredentials } from "../../services/storage";
import { getCityByUF, getUFs } from "../../services/ibge";
import { getUserData, updateData, UpdateInputs } from "../../services/user";

export default function Config() {
    // Tipagem
    type UF = { label: string, code: number };

    // Máquina de estado
    const [uid, setUID] = React.useState("");
    const [token, setToken] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [listUF, setListUF] = React.useState([] as Array<UF>);
    const [listCity, setListCity] = React.useState(["Selecione a cidade"] as Array<string>);

    const [uf, setUF] = React.useState("");
    const [name, setName] = React.useState("");
    const [codeUF, setCodeUF] = React.useState(0);
    const [whatsapp, setWhatsapp] = React.useState("");
    const [city, setCity] = React.useState("Selecione a cidade");
    const [shareWhatsapp, setShareWhatsapp] = React.useState(true);

    // Define a função para salvar dados do usuário
    async function save() {
        try {
            // Valida inputs
            setLoading(true);
            if(name.length < 6)
                throw new Error("Informe um nome com pelo menos 6 caracteres.");

            if(shareWhatsapp && (whatsapp.length < 10 || whatsapp.length > 11))
                throw new Error("Informe DDD + número de telefone.");

            if(uf == "Selecione o estado")
                throw new Error("Selecione um estado para prosseguir.");

            if(city == "Selecione a cidade")
                throw new Error("Selecione uma cidade para prosseguir.");

            // Envia solicitação de atualização
            const data: UpdateInputs = { shareWhatsapp, uf, name, city, uid };
            if(shareWhatsapp) data.whatsapp = whatsapp;
            const result = await updateData(data, token, uid);

            // Verifica sucesso
            if(!result.success)
                throw new Error(result.message);

            // Informa ao usuário que o processo foi finalizado
            simpleAlert("Sucesso", "Seus dados foram atualizados");

        } catch(error: any) {
            simpleAlert("Opa", error.message);
        } finally {
            setLoading(false);
        }
    }

    // Função para carregamento de cidades
    async function loadCity(code: number) {
        try {
            // Carrega dados das cidades pelo ibge
            setLoading(true);
            const result = await getCityByUF(code);
            if(!result.success)
                throw new Error(result.message);

            // Atualiza estado para armazenamento
            const cities: Array<string> = ["Selecione a cidade"];
            result.data?.forEach(item => cities.push(item.nome));
            setListCity(cities);

        } catch(error: any) {
            simpleAlert("Alerta", error.message);
        } finally {
            setLoading(false);
        }
    }

    // Funções de renderização das listas de estado e cidades
    async function renderUF(code: number) {
        const element = listUF.find(item => item.code == code);
        
        setUF(element?.label as string);
        setCodeUF(code);
        await loadCity(code);
    }

    // Função de inicialização
    async function init() {
        try {
            // Carrega credenciais
            setLoading(true);
            const credentials = await getCredentials();
            if(!credentials.success)
                throw new Error(credentials.message);

            // Recupera dados do usuário
            const uid = credentials.data?.uid as string;
            const token = credentials.data?.token as string;
            
            const result = await getUserData(uid, token);
            if(!result.success)
                throw new Error(result.message);

            // Recupera registro de estados
            const ufs: Array<UF> = [{ label: "Selecione o estado", code: -1 }];
            const ibge = await getUFs();
            if(!ibge.success)
                throw new Error(ibge.message);

            ibge.data?.forEach(item => ufs.push({ label: item.sigla, code: item.id }));

            // Atualiza variáveis de controle
            setUID(uid);
            setListUF(ufs);
            setToken(token);

            // Atualiza variáveis do formulário
            if(result.data?.data.user.name != undefined)
                setName(result.data?.data.user.name);

            if(result.data?.data.user.shareWhatsapp != undefined)
                setShareWhatsapp(result.data?.data.user.shareWhatsapp);

            if(result.data?.data.user.whatsapp != undefined)
                setWhatsapp(result.data?.data.user.whatsapp);

            if(result.data?.data.user.uf != undefined)
                renderUF(ufs.find(item => item.label == result.data?.data.user.uf)?.code as number);

            if(result.data?.data.user.city != undefined)
                setCity(result.data?.data.user.city);

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
            <Header title="Seus dados" />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={global.content}>
                <ScrollView contentContainerStyle={global.scrollContent}>

                    <View style={style.formRow}>
                        <Text>Nome do usuário</Text>
                        <TextInput
                            onChangeText={text => setName(text)}
                            style={style.input}
                            placeholder="Seu nome"
                            value={name}
                        />
                    </View>
                    
                    <View style={style.formRow}>
                        <Text>Estado</Text>
                        <View style={style.border}>
                            <Picker selectedValue={codeUF} onValueChange={(code, i) => renderUF(code)}>
                                {listUF.map((item, i) => (
                                    <Picker.Item label={item.label} value={item.code} key={`select-uf-${i}`} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    
                    <View style={style.formRow}>
                        <Text>Cidade</Text>
                        <View style={style.border}>
                            <Picker selectedValue={city} onValueChange={(city, i) => setCity(city)}>
                                {listCity.map((item, i) => (
                                    <Picker.Item label={item} value={item} key={`select-city-${i}`} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    
                    <View style={style.formRow}>
                        <Text>Compartilhar número</Text>
                        <View style={style.border}>
                            <Picker selectedValue={shareWhatsapp} onValueChange={(value, i) => setShareWhatsapp(value)}>
                                <Picker.Item label="Sim" value={true} />
                                <Picker.Item label="Não" value={false} />
                            </Picker>
                        </View>
                    </View>

                    {shareWhatsapp && <View style={style.formRow}>
                        <Text>Número whatsapp</Text>
                        <TextInput
                            onChangeText={text => setWhatsapp(text)}
                            placeholder="DDD + número"
                            keyboardType="numeric"
                            style={style.input}
                            value={whatsapp}
                        />    
                    </View>}

                    <View style={style.formRow}>
                        <TouchableOpacity style={style.button} onPress={save}>
                            <Text style={style.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </TouchableWithoutFeedback>

            <TabNavigate elements={navigateElements()} />

        </KeyboardAvoidingView>
    );
}
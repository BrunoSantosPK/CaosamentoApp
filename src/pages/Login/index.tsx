import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator, Platform, Keyboard } from "react-native";

import global from "../../styles/global";
import style from "./style";

import logo from "../../../assets/logo.png";

import { getUFs, getCityByUF } from "../../services/ibge";
import * as auth from "../../services/auth";

export default function Login() {
    // Máquina de estado
    const [pass, setPass] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mode, setMode] = React.useState("login");

    // Gerencia a máquina de estado
    function changeState(origin: "login" | "new" | "reset") {
        if(origin == mode)
            setMode("login");
        else
            setMode(origin);
    }

    // Gerencia a ação da página
    async function execute() {}

    async function init() {
        //
    }
    React.useEffect(() => { init(); }, []);

    return (
        <KeyboardAvoidingView style={style.loginContent} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <Image source={logo} style={style.logo} />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={style.formContent}>
                    <Text style={style.pageTitle}>
                        {mode == "login" ? "Entrando" : mode == "new" ? "Novo Cadastro" : "Nova Senha"}
                    </Text>
                    
                    <TextInput
                        onChangeText={text => setEmail(text)}
                        style={style.input}
                        placeholder="e-mail"
                        value={email}
                    />
                    <TextInput
                        onChangeText={text => setPass(text)}
                        secureTextEntry={true}
                        style={style.input}
                        placeholder="senha"
                        value={pass}
                    />

                    <TouchableOpacity style={style.buttonExecute} onPress={execute}>
                        <Text style={style.buttonExecuteText}>
                            {mode == "login" ? "Entrar" : mode == "new" ? "Cadastrar" : "Enviar"}
                        </Text>
                    </TouchableOpacity>

                    <View style={style.contentLink}>
                        <TouchableOpacity onPress={() => changeState("new")}>
                            <Text>{mode == "new" ? "Fazer login" : "Criar cadastro"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => changeState("reset")}>
                            <Text>{mode == "reset"? "Fazer login" : "Esqueci a senha"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    );
}
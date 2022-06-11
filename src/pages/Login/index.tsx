import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
    View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,
    TouchableWithoutFeedback, ActivityIndicator, Platform, Keyboard
} from "react-native";

// Folhas de estilos e imagens
import style from "./style";
import global from "../../styles/global";
import logo from "../../../assets/logo.png";

// Customizações
import * as auth from "../../services/user";
import { simpleAlert } from "../../utils/alerts";
import { setCredentials, getCredentials } from "../../services/storage";

export default function Login() {
    // Máquina de estado
    const navigate = useNavigation();
    type ModeState = "login" | "new" | "reset";
    const [pass, setPass] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [repeatPass, setRepeatPass] = React.useState("");
    const [mode, setMode] = React.useState("login" as ModeState);

    // Gerencia a máquina de estado
    function changeState(origin: ModeState) {
        if(origin == mode)
            setMode("login");
        else
            setMode(origin);
    }

    // Gerencia a ação da página
    async function execute() {
        try {
            // Valida os inputs, de acordo com o modo da página
            setLoading(true);
            if(mode == "login" && (pass == "" || email == ""))
                throw new Error("Preencha e-mail e senha para realizar login.");

            if(mode == "reset" && email == "")
                throw new Error("Preencha o e-mail para fazer a troca da senha.");

            if(mode == "new" && (pass == "" || email == "" || repeatPass == ""))
                throw new Error("Os campos e-mail, senha e repetição de senha devem ser preenchidos.");

            // Define callback para limpar inputs
            const clearInputs = () => {
                setPass("");
                setEmail("");
                setRepeatPass("");
            };

            // Faz a requisição, de acordo com o modo
            let result, uid, token;
            switch(mode) {
                case "login":
                    result = await auth.login(email, pass);
                    if(!result.success)
                        throw new Error(result.message);

                    // Salva credenciais de acesso
                    uid = result.data?.data.user.uid as string;
                    token = result.data?.data.user.token as string;
                    
                    result = await setCredentials(uid, token, email, pass);
                    if(!result.success)
                        throw new Error(result.message);

                    // Navegação de página
                    navigate.reset({
                        index: 0,
                        routes: [{ name: "Home" as never }]
                    });

                    break;

                case "reset":
                    // Requisição de reset de senha
                    result = await auth.reset(email);
                    if(!result.success)
                        throw new Error(result.message);

                    // Informa ao usuário conclusão da operação
                    simpleAlert("Sucesso", "Acesse seu e-mail para prosseguir com a criação de nova senha. Verifique também a caixa de spam.");

                    break;

                case "new":
                    // Requisição para criar novo usuário
                    result = await auth.newUser(email, pass, repeatPass);
                    if(!result.success)
                        throw new Error(result.message);

                    // Informa ao usuário conclusão do processo
                    simpleAlert("Sucesso", "Você já está cadastrado, clique em 'Fazer login' para entrar.");

                    break;
            }

            // Limpa os inputs
            clearInputs();

        } catch(error: any) {
            simpleAlert("Atenção", error.message);
        } finally {
            setLoading(false);
        }
    }

    // Função de inicialização da página
    async function init() {
        const credenciais = await getCredentials();
        if(credenciais.success)
            setEmail(credenciais.data?.email as string);

        // teste
        setEmail("user@user.com.br");
        setPass("lambari");
    }
    React.useEffect(() => { init(); }, []);

    return (
        <KeyboardAvoidingView style={style.loginContent} behavior={Platform.OS == "ios" ? "padding" : "height"}>

            {loading && <View style={global.loadingContent}>
                <ActivityIndicator size="large" />
            </View>}

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
                    {(["login", "new"].includes(mode)) && <TextInput
                        onChangeText={text => setPass(text)}
                        secureTextEntry={true}
                        style={style.input}
                        placeholder="senha"
                        value={pass}
                    />}
                    {(mode == "new") && <TextInput
                        onChangeText={text => setRepeatPass(text)}
                        secureTextEntry={true}
                        style={style.input}
                        placeholder="repita senha"
                        value={repeatPass}
                    />}

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
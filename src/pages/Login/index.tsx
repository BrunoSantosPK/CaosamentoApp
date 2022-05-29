import React from "react";
import { View, Text, Image } from "react-native";

import global from "../../styles/global";
import style from "./style";

import logo from "../../../assets/logo.png";

import { getUFs, getCityByUF } from "../../services/ibge";
import * as auth from "../../services/auth";

export default function Login() {

    async function init() {
        //
    }
    React.useEffect(() => { init(); }, []);

    return (
        <View style={style.loginContent}>
            <Image source={logo} style={style.logo} />

            <View style={style.formContent}>
                <Text>Tela de login</Text>
            </View>
        </View>
    );
}
import React from "react";
import { View, Image } from "react-native";

import style from "./style";

import logo from "../../../assets/logo.png";

export default function Header() {
    return (
        <View style={style.content}>
            <Image source={logo} style={style.contentLogo} />
        </View>
    );
}
import React from "react";
import { View, Image, Text } from "react-native";

import style from "./style";
import logo from "../../../assets/logo.png";

type Props = {
    title: string
};

export default function Header({ title="Bem-vindo" }: Props) {
    return (
        <View style={style.content}>
            <Image source={logo} style={style.contentLogo} />
            <Text style={style.contentText}>{title}</Text>
        </View>
    );
}
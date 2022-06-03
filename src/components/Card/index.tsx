import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import style from "./style";

type Props = {
    text: string,
    urlPhoto: string,
    buttons: Array<CardButton>
};

export type CardButton = {
    label: string,
    callback: () => void
};

export default function Card({ text="", urlPhoto="", buttons=[] }: Props) {
    return (
        <View style={style.content}>
            <View style={style.principalRow}>
                <Image source={{ uri: urlPhoto }} style={style.photo} />
                <Text style={style.text}>{text}</Text>
            </View>

            <View style={style.buttonsRow}>
                {buttons.map((item, i) => (
                    <TouchableOpacity onPress={item.callback} key={`card-button-${i}`}>
                        <Text style={style.buttonText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
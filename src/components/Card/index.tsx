import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import style from "./style";

const logo = "https://s2.glbimg.com/6josynSDrf8psyn4_4X14OavmxY=/e.glbimg.com/og/ed/f/original/2022/02/25/border-collie-pexels-alotrobo-3523317.jpg";
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie mauris ac quam luctus facilisis. Duis faucibus fermentum quam sit amet facilisis. Aenean ut ligula sit amet elit sollicitudin interdum non non dui. ";

export default function Card() {
    return (
        <View style={style.content}>
            <View style={style.principalRow}>
                <Image source={{ uri: logo }} style={style.photo} />
                <Text style={style.text}>{text}</Text>
            </View>
            <View style={style.buttonsRow}>
                <TouchableOpacity>
                    <Text style={style.buttonText}>Deletar</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={style.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={style.buttonText}>Detalhes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
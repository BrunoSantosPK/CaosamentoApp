import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import style from "./style";

type Props = {
    elements?: Array<TabElement>,
    height?: number
};

export type TabElement = {
    icon: React.ComponentProps<typeof MaterialIcons>["name"]
    callback: () => void
};

export default function TabNavigate({ elements=[] }: Props) {
    return (
        <View style={style.content}>
            {elements.map((item, i) => (
                <TouchableOpacity style={style.areaIcon} onPress={item.callback}>
                    <MaterialIcons name={item.icon} size={35} color="black" />
                </TouchableOpacity>
            ))}
        </View>
    );
}
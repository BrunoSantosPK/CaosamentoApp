import { TabElement } from "../components/TabNavigate";
import { useNavigation } from "@react-navigation/native";

export function navigateElements(): Array<TabElement> {
    const nav = useNavigation();
    const items: Array<TabElement> = [
        { icon: "pets", callback: () => nav.navigate("Home" as never) },
        { icon: "search", callback: () => nav.navigate("Search" as never) },
        { icon: "account-circle", callback: () => nav.navigate("Config" as never) }
    ];

    return items;
}
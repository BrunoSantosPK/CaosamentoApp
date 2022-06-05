import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Login from "./pages/Login";
import Home from "./pages/Home";
import Config from "./pages/Config";
import Search from "./pages/Search";

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Config" component={Config} />
                <AppStack.Screen name="Search" component={Search} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
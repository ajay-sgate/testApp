import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Dimens, Fonts, Screen } from "../constants/appConstants";
import { useSelector } from "react-redux";
import { darkMode } from "../redux/Selectors/setting";

const s = StyleSheet.create({
    box: {
        alignItems: "center",
        height: Screen.height * 0.8,
        justifyContent: "center"
    },
     /* @ts-ignore */
    txt: (theme: boolean) => ({
        color:theme?Colors.white: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: Dimens.f16,
        paddingHorizontal:20,
        textAlign:'center'
    })
});
const EmptyComponent = (props: any) => {
    const themes = useSelector(darkMode) as any;

    const { title } = props;
    return (
        <View style={s.box}>
            <Text style={s.txt(themes)}>{title}</Text>
        </View>
    );
};
export default EmptyComponent;

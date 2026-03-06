import React from 'react'
import c from '../../styles'
import Label from '../Label/text'
import { Image, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Colors, Fonts, ImageView } from '../../constants/appConstants'

interface HeaderProps {
    title?: string,
    onBack?: any
}

export default function Header({ title, onBack }: HeaderProps): JSX.Element {
    return (
        <View style={onBack ?s.headerBackStyle :s.headerStyle}>
            {onBack ?
                <Icon onPress={onBack} name={'chevron-left'} style={s.iconStyle} solid size={16}/>
                :
                <Image
                    resizeMode='center'
                    style={s.logoStyle}
                    source={ImageView.splashLogo} />
            }
            <Label style={s.titleStyle} value={title} />
        </View>
    )
}

const s = StyleSheet.create({
    headerBackStyle: {
        alignItems:'center',
        backgroundColor: Colors.acent,
        height: 60,
        justifyContent:'center',
        paddingHorizontal: 12
    },
    headerStyle: {
        ...c.flexRowSpaceBetween,
        backgroundColor: Colors.acent,
        height: 60,
        paddingHorizontal: 12
    },
    iconStyle:{
        color:Colors.white,
        left:16,
        position:'absolute'
    },
    logoStyle: {
        height: 31,
        width: 70,
    },
    titleStyle: {
        color: Colors.white,
        fontFamily: Fonts.semiBold,
        fontSize: 18,
        textAlign: 'center',
    },
})

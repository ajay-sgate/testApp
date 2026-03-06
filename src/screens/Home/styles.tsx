import { StyleSheet } from 'react-native';
import c from '../../styles';
import { Colors, Dimens, Fonts } from '../../constants/appConstants';

export const styles = StyleSheet.create({
    btnStyle: {
        borderRadius: 8,
        paddingHorizontal: 7,
        paddingVertical: 4
    },
    camImgStyle: {
        borderRadius: 8,
        height: 80,
        marginTop: 10,
        width: 80
    },
    closeStyle: {
        left: 70,
        position: 'absolute',
        zIndex: 999
    },
    /* @ts-ignore */
    dotStyle: (theme: boolean) => ({
        color: !theme ? Colors.acent : Colors.white,
        paddingHorizontal: 8,
    }),
    flexRow: {
        ...c.flexRow,
        gap: 16,
        marginVertical: 4,
        paddingHorizontal: 12
    },
    fontStyle: {
        fontSize: 12
    },
    iconStyle: {
        backgroundColor: Colors.dark,
        borderRadius: 10,
        height: 38,
        width: 38
    },
    imageStyle: {
        backgroundColor: Colors.white,
        height: 22,
        marginLeft: 10,
        width: 22,
    },
    itemButtonFlexRow: {
        ...c.flexRow,
        gap: 10,
        marginTop: 2
    },
    itemFlexRow: {
        ...c.flexRow,
        paddingVertical: 1
    },
    rowViewStyle: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    swipeStyle: {
        marginVertical: 40,
        paddingHorizontal: 36
    },
    text1: {
        color: Colors.green,
        fontFamily: Fonts.medium,
        fontSize: Dimens.f14,
        textDecorationLine:'underline'
    },
    text2: {
        color: Colors.text2,
        fontFamily: Fonts.medium,
        fontSize: Dimens.f14,
        textDecorationLine:'underline'
    },
    text3: {
        color: Colors.red,
        fontFamily: Fonts.medium,
        fontSize: Dimens.f14,
        textDecorationLine:'underline'

    },
    /* @ts-ignore */
    textMedium: (theme: boolean) => ({
        color: !theme ? Colors.listTextColor : Colors.white,
        fontFamily: Fonts.medium,
        fontSize: Dimens.f14
    }),
    /* @ts-ignore */
    textMediumFlex: (theme: boolean) => ({
        color: !theme ? Colors.listTextColor : Colors.white,
        fontFamily: Fonts.medium,
        fontSize: Dimens.f14,
        textAlign: 'left',
        width: '76%',
        // backgroundColor:'red'
    }),
    /* @ts-ignore */
    titleStyle: (theme: boolean) => ({
        marginTop: 80,
        color: !theme ? Colors.acent : Colors.white
    }),
    uploadFile: {
        alignItems: 'center',
        backgroundColor: Colors.fillUpload,
        borderRadius: 8,
        elevation: 2,
        height: 56,
        justifyContent: 'center',
    }
});

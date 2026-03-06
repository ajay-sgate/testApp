import { StyleSheet } from 'react-native';
import { Colors, Dimens, Fonts } from '../constants/appConstants';

const c = StyleSheet.create({
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        elevation: 2,
        height: 56,
        justifyContent: 'center'
    },
    cell: {
        borderRadius: 12,
        height: 44,
        justifyContent: "center",
        marginRight: 0,
        width: 48
    },
    errorStyle: {
        color: Colors.red,
        fontSize: 13,
        paddingTop: 8,
    },
    flex1: {
        flex: 1,
    },
    flex1Acent: (theme: boolean) => ({
        backgroundColor:theme?"#232938": Colors.acent,
        flex: 1,
    }),
    flex1AcentCenter: {
        alignItems: 'center',
        backgroundColor: Colors.acent,
        flex: 1,
        justifyContent: 'center'
    },
    flex1Primary: {
        backgroundColor: Colors.primary,
        flex: 1,
    },
    flex1PrimaryCenter: {
        alignItems: 'center',
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: 'center'
    },
    flex1Secondary: {
        backgroundColor: Colors.secondary,
        flex: 1,
    },
    flex1SecondaryCenter: {
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        flex: 1,
        justifyContent: 'center'
    },
    flex1White: (theme: boolean) => ({
        backgroundColor: !theme ? Colors.white : Colors.acentLow,
        flex: 1,
    }),
    flexCenter: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    flexRow: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    flexRowCenter: {
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    flexRowSpaceBetween: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8,
        paddingHorizontal: 10
    },
    flexWrap: {
        flex: 1,
        flexWrap: 'wrap'
    },
    h40: {
        height: 40
    },
    img18: {
        height: 18,
        width: 18
    },
    img22: {
        height: 22,
        width: 22,
    },
    img20: {
        height: 20,
        tintColor: Colors.white,
        width: 20
    },
    itemStyle: (theme: boolean) => ({
        borderBottomWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderColor: !theme ? Colors.acent : Colors.whiteDull
    }),
    logoStyle: {
        height: 36,
        left: 12,
        top: 20,
        width: 78,
    },
    margin8: {
        margin: 8
    },
    marginH24: {
        marginHorizontal: 24
    },
    marginTop10: { marginTop: 10 },
    markerIconStyle: {
        color: Colors.red,
    },
    modalRoot: {
        alignItems: 'center',
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: 'center'
    },
    otpMStyle: (theme: boolean) => ({
        color: !theme ? Colors.text_gray : Colors.whiteDull,
        fontSize: Dimens.f14,
        textAlign: 'center',
    }),
    otpWpStyle:{
        color: Colors.secondary,
        fontSize: Dimens.f14,
        marginVertical:20,
        textAlign: 'center',
    },
    otpNStyle: (theme: boolean) => ({
        fontSize: Dimens.f14,
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: !theme ? Colors.text_gray : Colors.white,
    }),
    phoneIconStyle: {
        color: Colors.secondary,
        left: 16
    },
    rootCenter: {
        alignItems: 'center',
        color: Colors.white,
        flex: 1,
        justifyContent: 'center'
    },
    tabPadding: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBold: (theme: boolean) => ({
        color: !theme ? Colors.acent : Colors.white,
        fontFamily: Fonts.bold,
        fontSize: Dimens.f16,
    }),
    textMedium: (theme: boolean) => ({
        color:!theme? Colors.black:Colors.white,
        fontFamily: Fonts.medium,
        fontSize: Dimens.f16
    }),
    textRegular: {
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: Dimens.f16
    },
    textSemi: (theme: boolean) => ({
        color: !theme ? Colors.black : Colors.white,
        fontFamily: Fonts.semiBold,
        fontSize: Dimens.f16
    }),
    line: {
        height: 1,
        backgroundColor: Colors.secondary,
        marginHorizontal: 10
    }
});


export default c;

import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/appConstants';

export const s = StyleSheet.create({
    buttonStyle:{
        alignItems: 'center',
        alignSelf:'center',
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        bottom:20,
        elevation: 2,
        height: 56,
        justifyContent: 'center',
        position:'absolute',
        width:'90%'
    }
});

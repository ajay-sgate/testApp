import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../constants/appConstants';

const borderWidth = 0;
const margin = 1;
const maxContainerHeight = 100;
const Styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
    borderRadius: maxContainerHeight / 2,
    borderRightWidth: 0,
    borderWidth,
    margin,
  },
  containerRTL: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    borderLeftWidth: 0,
    borderRadius: maxContainerHeight / 2,
    borderWidth,
    margin,
  },
  endTitle: {
    color:Colors.text_gray,
    fontFamily:Fonts.semiBold,
    fontSize:14,
    position: 'absolute',
    width:110,
    zIndex:99
  },
  icon: {
    alignItems: 'center',
    borderRadius: maxContainerHeight / 2,
    borderWidth: 2,
    justifyContent: 'center',
    marginVertical: -borderWidth,
  },
  swipeContainer: {
    borderRadius: 100 / 2,
    justifyContent: 'center',
    margin: 5,
  },
  title: {
    alignSelf: 'center',
    color:Colors.white,
    fontFamily:Fonts.semiBold,
    fontSize:18,
    position: 'absolute'
  },
});

export default Styles;
export { borderWidth, margin };

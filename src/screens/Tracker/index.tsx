import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, EmptyComponent, Header, HomeSkeleton, Title } from '../../components'
import { useFocusEffect } from '@react-navigation/native';
import PrefManager from '../../utils/prefManager';
import { Colors, ImageView, Storage_Key, Strings } from '../../constants/appConstants';
import { showPopupMessage } from '../../utils/helpers';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import { getCompleteBatchAction } from '../../redux/Actions/Home';
import { completeBatch, completeBatchItems, completeBatchLoading } from '../../redux/Selectors/home';
import { FlatList, Image, Linking, Platform, RefreshControl, View } from 'react-native';
import c from '../../styles';
import { darkMode } from '../../redux/Selectors/setting';
import useInternetConnected from '../../hook/useInternetConnected';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { styles } from "../Home/styles";
export default function Track() {

  const dispatch = useDispatch() as any;
  const getCompleteBatch = (request: any) => dispatch(getCompleteBatchAction(request))
  const completeBatchData = useSelector(completeBatch) as any;
  const completeBatchList = useSelector(completeBatchItems) as any;

  const loading = useSelector(completeBatchLoading) as any;
  const themes = useSelector(darkMode) as any;
  const [name, setName] = useState<any>("")
  const isConnected = useInternetConnected() as boolean;
  const scheme: any = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
  const latLng: any = `${28.5275548},${77.0445156}`;
  const label: string = 'Custom Label';
  const openMap = () => Linking.openURL(`${scheme}${latLng}(${label})`);
  const keyExtractor = useCallback((item: any, i: number) => `${i}-${item.id}`, []);

  useFocusEffect(
    React.useCallback(() => {
      PrefManager.getValue(Storage_Key.userData).then(data => {
        if (data) {
          setName((JSON.parse(data)?.first_name ?? '') + ' ' + (JSON.parse(data)?.last_name ?? ''))
        } else {
          showPopupMessage('Error', Strings.smWrongID, true)
        }
      })
    }, [])
  );
  useEffect(() => {
    PrefManager.getValue(Storage_Key.userData).then(data => {
      if (data) {
        pullDown(JSON.parse(data)?.id ?? 0)
        setName((JSON.parse(data)?.first_name ?? '') + ' ' + (JSON.parse(data)?.last_name ?? ''))
      } else {
        showPopupMessage('Error', Strings.smWrongID, true)
      }
    })

  }, [])

  const pullDown = (id: any) => {
    const formData = {
      driverId: id
    }
    //  new FormData();
    // formData.append('auth_key', Config.AUTH_KEY);
    // formData.append('driverId', id);

    getCompleteBatch(formData)
  }

  const onRefresh = () => {
    PrefManager.getValue(Storage_Key.userData).then(data => {
      if (data) {
        pullDown(JSON.parse(data)?.id ?? 0)
      }
    })
  }

  const refreshControl = () => {
    return (
      <RefreshControl
        refreshing={false}
        onRefresh={onRefresh}
        titleColor={Colors.acent} />
    )
  };
  const renderItem: any = useCallback(({ item, index }: any) => {
    return (
      <View style={[c.itemStyle(themes), { borderTopWidth: index == 0 ? 1 : 0 }]}>
        <Image source={ImageView.car} style={styles.iconStyle} />
        <View>
          <View style={styles.itemFlexRow}>
            <Title style={c.textSemi(themes)}>{item.shipment_type == '1'?'Pickup':item.shipment_type == '1'?'Delivery':''}</Title>
            <Icon name={'circle'} style={styles.dotStyle(themes)} solid size={5} />
            <Title style={styles.textMedium(themes)}>{item?.awb_no ?? ''}</Title>

            {item.action_status == "1" &&
              <Image resizeMode='contain' source={ImageView.deliverd} style={styles.imageStyle} />
            }

            {item.action_status == "2" &&
              <Image resizeMode='contain' source={ImageView.resch} style={styles.imageStyle} />
            }

            {item.action_status == "3" &&
              <Image resizeMode='contain' source={ImageView.close} style={styles.imageStyle} />
            }
            {item.action_status == "4" &&
              <Image resizeMode='contain' source={ImageView.refuse} style={styles.imageStyle} />
            }

          </View>

          <View style={styles.itemFlexRow}>
            <Title style={styles.textMedium(themes)}>{item?.cust_name ?? ''}</Title>
            <Icon name={'circle'} style={styles.dotStyle(themes)} solid size={5} />
            <Title style={styles.textMedium(themes)}>{item?.cust_mobile ?? ''}</Title>
            <Icon name={"phone-volume"} onPress={() => openPhone(item.cust_mobile)} style={c.phoneIconStyle} solid size={15} />
          </View>

          <View style={styles.itemFlexRow}>
            <Title style={styles.textMediumFlex(themes)}>{item?.cust_address ?? ''}</Title>
            <Icon name={"location-dot"} onPress={()=>openMap()} style={c.markerIconStyle} solid size={15} />
          </View>
          <BottonView item={item} index={index} />
        </View>
      </View>
    );
  }, [themes]);

  const BottonView = ({ item, index }: any): JSX.Element => {
    const text1 = item.action_status == "1" ? "Deliverd" : "Reached"
    const text2 = item.action_status == "2" ? "Rescheduled" : 'Reschedule'
    const text3 = item.action_status == "3" ? "Canceled" : 'Cancel'
    const text4 = item.action_status == "4" ? "Refused" : 'Refuse'
    const buttonStyle = [styles.btnStyle, { backgroundColor: themes ? Colors.acent : Colors.btnGray }]
    return (
      <View style={styles.itemButtonFlexRow}>
        <Button
          title={text1}
          textStyle={styles.fontStyle}
          color={Colors.whiteDull}
          style={buttonStyle}
          disabled={true}
        />

        <Button
          title={text2}
          textStyle={styles.fontStyle}
          color={Colors.whiteDull}
          style={buttonStyle}
          disabled={true}
        />

        <Button
          title={text4}
          textStyle={styles.fontStyle}
          color={Colors.whiteDull}
          style={buttonStyle}
          disabled={true}
        />
        
        <Button
          title={text3}
          textStyle={styles.fontStyle}
          color={Colors.whiteDull}
          style={buttonStyle}
          disabled={true}
        />
      </View>
    )
  }

  return (
    <Container light={false} style={c.flex1White(themes)}>
      <Header title={`Welcome ${name ? name : 'user'}`} />
      {completeBatchData.message == "No Batch assigned." ?
        <EmptyComponent title={completeBatchData?.message ?? ''} />
        :
        <FlatList
          data={completeBatchList?.BatchData?.batchDetails.length > 0 ?  completeBatchList?.BatchData?.batchDetails: []}
          renderItem={renderItem}
          style={c.flex1}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps={'handled'}
          removeClippedSubviews={true}
          refreshControl={refreshControl()}
          ListEmptyComponent={(loading && !isConnected) ? <HomeSkeleton /> : <EmptyComponent title={completeBatchData?.message ?? ''} />}
        />
      }

    </Container>
  )
}
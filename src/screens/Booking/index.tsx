import React, { useState } from 'react'
import { Container, Header } from '../../components'
import { useFocusEffect } from '@react-navigation/native';
import PrefManager from '../../utils/prefManager';
import { showPopupMessage } from '../../utils/helpers';
import { Storage_Key, Strings } from '../../constants/appConstants';
export default function Booking() {
  const [name, setName] = useState<any>("")

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
  return (
    <Container>
      <Header title={`Welcome ${name ? name : 'user'}`} />
    </Container>
  )
}
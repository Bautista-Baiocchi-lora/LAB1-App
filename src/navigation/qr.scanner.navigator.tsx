import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Button} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import GuardiaRegistrationFeedbackScreen from '../screens/guarida/guardia.registration.feedback.screen';
import PropietarionRegistrationFeedbackScreen from '../screens/propietario/prop.registration.feedback.screen';
import PropietarioFormScreen from '../screens/propietario/propietario.form.screen';

const Stack = createStackNavigator();

const QRScannerNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Scanner">
      <Stack.Screen name="Escanear QR" component={ScannerScreen} />
      <Stack.Screen
        name="propietario/register"
        component={PropietarioFormScreen}
        options={{title: 'Propietario'}}
      />
      <Stack.Screen
        name="Propietario Registration Feedback"
        component={PropietarionRegistrationFeedbackScreen}
        options={{title: '', headerLeft: null}}
      />
      <Stack.Screen
        name="guardia/registration"
        component={GuardiaRegistrationFeedbackScreen}
      />
    </Stack.Navigator>
  );
};

const ScannerScreen = ({navigation}) => {
  const onRead = (event) => {
    let qrData = JSON.parse(event.data);
    navigation.navigate(qrData.path, {
      message: qrData.message,
      id: qrData.id,
    });
  };

  return (
    <QRCodeScanner onRead={onRead} bottomContent={bottomContent(navigation)} />
  );
};

const bottomContent = (navigation) => (
  <Button type="clear" title="Cerrar" onPress={navigation.goBack} />
);

export default QRScannerNavigator;
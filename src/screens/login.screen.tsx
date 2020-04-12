import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {saveToken} from '.././jwt.service';
import {Action} from '../storage/dispatch.actions';

const validator = new Validator();

const axios = require('axios').default;

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  function logIn() {
    if (!validator.isEmail(email) || validator.isEmpty(password)) {
      setMessage('Email o Contrasena invalidad');
    } else {
      axios({
        method: 'post',
        url: `http://192.168.0.88:3500/auth/login`,
        data: {email, password, mid: DeviceInfo.getMacAddressSync()},
      })
        .then((response) => response.data)
        .then((cookie) => {
          dispatch({type: Action.STORE_COOKIE, cookie});
          saveToken(cookie.token);
        });
    }
  }

  return (
    <View>
      <Input
        placeholder=" Email"
        onChangeText={setEmail}
        autoCapitalize="none"
        leftIcon={<Icon name="envelope" size={24} color="black" />}
      />
      <Input
        placeholder=" Contrasena"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={setPassword}
        errorMessage={message}
        leftIcon={<Icon name="lock" size={24} color="black" />}
      />
      <Button title="Ingresar" type="clear" onPress={logIn} />
      <Button
        title="Registrar"
        type="clear"
        onPress={() => navigation.navigate('register')}
      />
    </View>
  );
}

export default LoginScreen;

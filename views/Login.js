import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import {useUser} from '../hooks/ApiHooks';
import {Button, Text} from '@rneui/base';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterForm from '../components/RegisterForm';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const [toggleForm, setToggleForm] = useState(true);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      // if no token available, do nothing
      if (userToken === null) return;
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('checkToken', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {toggleForm ? <LoginForm /> : <RegisterForm />}
        <Text>
          {toggleForm
            ? 'No account yet? Please register.'
            : 'Already have an account? Please login.'}{' '}
        </Text>
        <Button
          title={toggleForm ? 'Register' : 'Login'}
          onPress={() => {
            setToggleForm(!toggleForm);
          }}
        />
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;

import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);

  const logIn = async () => {
    console.log('Login button pressed');
    setIsLoggedIn(true);
    try {
      await AsyncStorage.setItem('userToken', 'abc123');
    } catch (error) {
      console.error('error in storing token', error);
    }
  };

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken === 'abc123') {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('no valid token available');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.Login}>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Login: {
    paddingBottom: 10,
    fontSize: 25,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;

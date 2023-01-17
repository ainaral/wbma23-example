import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import {MainContext} from '../contexts/MainContext';

const Profile = () => {
  const {setIsLoggedIn} = useContext(MainContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Profile}>Profile</Text>
      <Button
        title="Logout!"
        onPress={async () => {
          console.log('Loggin out!');
          setIsLoggedIn(false);
          try {
            await AsyncStorage.clear();
          } catch (error) {
            console.error('clearing asyncstorage failed', error);
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  Profile: {
    paddingBottom: 10,
    fontSize: 25,
  },
});

export default Profile;

import React from 'react';
import {Card, Button, Text, Input} from '@rneui/themed';
import {useUser} from '../hooks/ApiHooks';
import {Controller, useForm} from 'react-hook-form';

const RegisterForm = (props) => {
  // const {setIsLoggedIn} = useContext(MainContext);
  // const {postLogin} = useAuthentication();
  const {postUser, checkUsername} = useUser();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: '', email: '', full_name: ''},
    mode: 'onBlur',
  });

  const register = async (registerData) => {
    console.log('Registering', registerData);
    try {
      if (!checkUser) return;
      const registerResult = await postUser(registerData);
      console.log('registration result', registerResult);
    } catch (error) {
      console.error('register', error);
      // TODO: notify user about failed login attempt
    }
  };

  const checkUser = async (username) => {
    const userAvailable = await checkUsername(username);
    console.log('checkUser', userAvailable);
    return userAvailable || 'Username is already taken';
  };

  return (
    <Card>
      <Card.Title>Registration form</Card.Title>
      <Controller
        control={control}
        rules={{required: true, minLength: 3, validate: checkUser}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="username"
      />
      {/* TODO: Fix error messages for RNE components */}
      {errors.username?.type === 'required' && <Text>is required</Text>}
      {errors.username?.type === 'minLength' && (
        <Text>min length is 3 characters</Text>
      )}
      <Controller
        control={control}
        rules={{required: true, minLength: 5}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && <Text>Password (min. 5 chars) is required .</Text>}
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      {errors.email?.type === 'required' && <Text>is required</Text>}

      <Controller
        control={control}
        rules={{minLength: 5}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            autoCapitalize="words"
          />
        )}
        name="full_name"
      />
      {errors.full_name?.type === 'minLength' && <Text>min length is 3</Text>}

      <Button title="Register!" onPress={handleSubmit(register)} />
    </Card>
  );
};

export default RegisterForm;

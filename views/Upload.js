import PropTypes from 'prop-types';
import {Button, Card, Input} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useCallback, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';
import {appId} from '../utils/variables';

const Upload = ({navigation}) => {
  const [mediafile, setMediaFile] = useState({});
  const [loading, setLoading] = useState(false);
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger,
    setValue,
  } = useForm({
    defaultValues: {title: '', description: ''},
    mode: 'onChange',
  });

  const uploadFile = async (data) => {
    // TODO: create form data and post it
    setLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const filename = mediafile.uri.split('/').pop();
    let fileExt = filename.split('.').pop();
    if (fileExt === 'jpg') fileExt = 'jpeg';
    const mimeType = mediafile.type + '/' + fileExt;
    formData.append('file', {
      uri: mediafile.uri,
      name: filename,
      type: mimeType,
    });
    console.log('form data', formData);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postMedia(
        formData,
        await AsyncStorage.getItem('userToken')
      );
      const appTag = {file_id: result.file_id, tag: appId};
      const tagResult = await postTag(appTag, token);
      console.log('tag result', tagResult);

      Alert.alert('Uploaded', 'File id: ' + result.file_id, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            // update 'update' state in context
            setUpdate(!update);
            // TODO: navigate to home
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.log('file upload failed', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const pickFile = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      console.log(result);

      if (!result.canceled) {
        setMediaFile(result.assets[0]);
        // validate form
        trigger();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    setMediaFile({});
    setValue('title', '');
    // setValue('description', '');
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log('leaving');
        reset();
      };
    }, [])
  );

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <Card>
          <Card.Image
            source={{uri: mediafile.uri || 'https://placekitten.com/g/200/300'}}
          />
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'is required'},
              minLength: {
                value: 3,
                message: 'Title min length is 3 characters.',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.title && errors.title.message}
              />
            )}
            name="title"
          />
          <Controller
            control={control}
            rules={{
              minLength: {
                value: 5,
                message: 'Description min length is 5 characters',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.description && errors.description.message}
              />
            )}
            name="description"
          />
          <Button title="Pick a file" onPress={pickFile} />
          <Button
            disabled={!mediafile.uri || errors.title || errors.description}
            title="Upload"
            onPress={handleSubmit(uploadFile)}
          />
          <Button title={'Reset'} onPress={reset} type="outline" />
          {loading && <ActivityIndicator size="large" />}
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;

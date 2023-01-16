import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + 'media');
      const json = await response.json();
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      );

      setMediaArray(media);
    } catch (error) {
      console.error('List, loadMedia', error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return {mediaArray};
};

const useAuthentication = () => {
  const postLogin = async () => {
    // TODO: post login to api
    // https://media.mw.metropolia.fi/wbma/docs/#api-Authentication-PostAuth
  };
  return {postLogin};
};

// https://media.mw.metropolia.fi/wbma/docs/#api-User
const useUser = () => {
  const checkUser = async () => {
    // call https://media.mw.metropolia.fi/wbma/docs/#api-User-CheckUserName
  };
  return {checkUser};
};

export {useMedia, useAuthentication, useUser};

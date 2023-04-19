import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {User} from '../Models/user';
import {baseAddress} from '../../settings';

export interface authContextInterface {
  loginWithDetails: Function;
  getAccessToken: Function;
  loggedIn: boolean;
  user: User | undefined;
  isCheckingLogInStatus: boolean;
  logOut: () => void;

  accessToken: string | undefined;
  refreshToken: string | undefined;
}

const AuthContext = createContext({});

const AuthProvider = (children: any) => {
  const [isCheckingLogInStatus, setIsCheckingLogInStatus] =
    useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [accessTokenExpiry, setAccessTokenExpiry] = useState<
    number | undefined
  >(undefined);
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    undefined,
  );
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  let timer: ReturnType<typeof setTimeout> | null = null;

  const checkExpiry = (expiry: number) => {
    try {
      const currentTime = new Date().getTime() / 1000;
      return currentTime < expiry;
    } catch {
      console.error('Error Checking Expiry');
      return false;
    }
  };
  useEffect(() => {
    initializeAuth();
  }, []);
  const initializeAuth = async () => {
    try {
      const storageRefreshToken: string | null = await AsyncStorage.getItem(
        'refreshToken',
      );
      const storageRefreshTokenExpiry: string | null =
        await AsyncStorage.getItem('refreshTokenExpiry');
      const parsedRefreshTokenExpiry: number | undefined =
        storageRefreshTokenExpiry && !isNaN(parseInt(storageRefreshTokenExpiry))
          ? parseInt(storageRefreshTokenExpiry)
          : undefined;
      const refreshTokenIsValid = checkExpiry(
        parsedRefreshTokenExpiry ? parsedRefreshTokenExpiry : 0,
      );
      // console.log(storageRefreshToken);
      // console.log(refreshTokenIsValid);
      if (storageRefreshToken && refreshTokenIsValid) {
        await exchangeRefreshToken(storageRefreshToken);
      }
      setIsCheckingLogInStatus(false);
    } catch (err) {
      console.error(err);

      Alert.alert(
        'SOMETHING WRONG WITH LOCAL STORAGE',
        'Happen at getInitialUser, please log in again',
        [
          {
            text: 'OK',
            onPress: () => {
              setIsCheckingLogInStatus(false);
              clearAuthAsyncStorage();
              setLoggedIn(false);
            },
          },
        ],
      );
    }
  };

  useEffect(() => {
    if (accessToken && refreshToken) setLoggedIn(true);
  }, [accessToken, refreshToken, setRefreshToken, setAccessToken]);

  //check the auth when initializing app
  //this useeffect will run initial to check if user is existed in asyncstorage
  //+Existed => continue to check the other conditions to log user in app
  //+NOT existed=> user has to log in

  const clearAuthAsyncStorage = async () => {
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('refreshTokenExpiry');
    setRefreshToken(undefined);
    setAccessToken(undefined);
    setLoggedIn(false);
    setUser(undefined);
  };
  interface LoginDetails {
    user: string;
    password: string;
  }
  const exchangeRefreshToken = async (storageRefreshToken?: string) => {
    // console.log('EXCHNSGE RF TOKEN');
    const useRefreshToken = storageRefreshToken
      ? storageRefreshToken
      : refreshToken;
    if (!useRefreshToken) {
      console.error('exchangeRefreshToken: No useRefreshToken');
      clearAuthAsyncStorage();
      setLoggedIn(false);
      setUser(undefined);
      return false;
    }

    // setIsCheckingLogInStatus(true);
    try {
      const requestBody: any = {
        grant_type: 'refresh_token',
        client_id: 'b5Y0MqZdwi3NMdaEcJSJWIPSGBm3hr0NTMQT4RUK',
        client_secret:
          'TDOIue9kSmQUXV9JVe4cUHWcRnN7CZdflDGuNir4khFrhwI43pBpYbn3ZM4w2xfY4TK91QApEGT91oeDcz8UVOjYIOVVAKsb2KgzOwYTLwE3AzZdeI5Jh6RnOijeb3tp',
        refresh_token: useRefreshToken,
      };
      let formBody: string[] = [];
      for (let property in requestBody) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(requestBody[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      const formBodyStr: string = formBody.join('&');
      const response = await axios.post(
        'http://' + baseAddress + '/token/',
        formBodyStr,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: '*/*',
          },
        },
      );

      //all tokens are returned
      if (
        response?.data?.accessToken &&
        response?.data?.refreshToken &&
        response?.data?.user
      ) {
        let date = new Date();

        //set refresh token time in second + 26days in second because the refresh token will get deleted in 1 month since the time it's got generated by back end
        let refreshTokenExpire: number =
          Math.floor(date.getTime() / 1000) + 2246400;

        //UPDATE STATE
        setAccessToken(response?.data?.accessToken);
        setAccessTokenExpiry(Math.floor(date.getTime() / 1000) + 3000);
        setRefreshToken(response?.data?.refreshToken);

        setUser(response?.data?.user as User);

        //set all the token information in async storage for using app next time
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        await AsyncStorage.setItem(
          'refreshTokenExpiry',
          refreshTokenExpire.toString(),
        );
        return response?.data?.accessToken;
      } else {
        console.log('FAILED TO EXCHANGE TOKEN');
        console.log('RESULT FAILED:', response.data);
        console.log('RESULT STATUS:', response.status);
        throw response;
      }
    } catch (error: any) {
      console.log(error);
      //log in again
      setLoggedIn(false);
      setUser(undefined);
      //remove all async storage
      clearAuthAsyncStorage();
      setIsCheckingLogInStatus(false);

      return false;
    }
  };

  const loginWithDetails = async (login: LoginDetails) => {
    try {
      const requestBody: any = {
        grant_type: 'password',
        client_id: 'b5Y0MqZdwi3NMdaEcJSJWIPSGBm3hr0NTMQT4RUK',
        client_secret:
          'TDOIue9kSmQUXV9JVe4cUHWcRnN7CZdflDGuNir4khFrhwI43pBpYbn3ZM4w2xfY4TK91QApEGT91oeDcz8UVOjYIOVVAKsb2KgzOwYTLwE3AzZdeI5Jh6RnOijeb3tp',
        username: login.user,
        password: login.password,
      };
      let formBody: string[] = [];
      for (let property in requestBody) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(requestBody[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      const formBodyStr: string = formBody.join('&');
      const response = await axios.post(
        'http://' + baseAddress + '/token/',
        formBodyStr,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: '*/*',
          },
        },
      );
      console.log('RESPONSE:', response?.data);
      if (
        response?.data?.accessToken &&
        response?.data?.refreshToken &&
        response?.data?.user
      ) {
        let date = new Date();
        console.log('RESPONSE:', response?.data?.user);
        //set refresh token time in second + 26days in second because the refresh token will get deleted in 1 month since the time it's got generated by back end
        let refreshTokenExpire: number =
          Math.floor(date.getTime() / 1000) + 2246400;

        //set all the token information in async storage for using app next time
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        await AsyncStorage.setItem(
          'refreshTokenExpiry',
          refreshTokenExpire.toString(),
        );
        //UPDATE STATE
        setAccessToken(response.data.accessToken);
        setAccessTokenExpiry(Math.floor(date.getTime() / 1000) + 3000);
        setRefreshToken(response.data.refreshToken);

        //set user state and async
        setUser(response.data.user as User);

        setIsCheckingLogInStatus(false);

        return true;
      } else throw 'unknown error';
    } catch (error: any) {
      clearAuthAsyncStorage();
      setLoggedIn(false);
      setUser(undefined);
      setIsCheckingLogInStatus(false);
      return false;
    }
  };
  const getAccessToken = async () => {
    if (accessToken && accessTokenExpiry && checkExpiry(accessTokenExpiry)) {
      return accessToken;
    }
    const exchangeResult = await exchangeRefreshToken();
    if (exchangeResult) {
      return exchangeResult;
    }
    return undefined;
  };

  //this useeffect will automatically exchange the refresh token in the background prior to the access token expiry
  useEffect(() => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    if (refreshToken) {
      timer = setTimeout(() => {
        exchangeRefreshToken();
      }, 3000000);
    }
  }, [refreshToken, setRefreshToken]);
  const authContextValue: authContextInterface = {
    loginWithDetails,
    getAccessToken,
    loggedIn,
    user,
    isCheckingLogInStatus,
    logOut: clearAuthAsyncStorage,

    accessToken,
    refreshToken,
  };
  return <AuthContext.Provider value={authContextValue} {...children} />;
};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth};

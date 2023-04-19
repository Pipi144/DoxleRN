import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Platform,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {Button, VStack} from '@react-native-material/core';
import {colors} from '../../../utils/constants';
import {
  RootLoginScreen,
  StyledAnimatedErrorText,
  StyledErrorMessageContainer,
  StyledLoadingMaskScreen,
  StyledLoginFormButton,
  StyledLoginTextInput,
  StyledLoginTextInputContainer,
  StyledLoginTitleText,
  StyledMagicLinkText,
  StyledVersionText,
} from './StyledComponentLogin';
import {
  Extrapolation,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOutDown,
  FlipInXDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';
import {TextInputEmailIconButton} from './LoginIcons';
import {
  INotificationContext,
  useNotification,
} from '../../../Providers/NotificationProvider';
import {NotifierRoot} from 'react-native-notifier';
import Notification, {
  getContainerStyleWithTranslateY,
} from '../GeneraComponents/Notification/Notification';
import {authContextInterface, useAuth} from '../../../Providers/AuthProvider';
import LoadingDoxleIconWithText from '../../../Utilities/AnimationScreens/LoadingDoxleIconWithText/LoadingDoxleIconWithText';

function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentInputType, setcurrentInputType] = useState<
    'email' | 'password'
  >('email');
  const [errorText, seterrorText] = useState<string | undefined>(undefined);
  const [isLoading, setisLoading] = useState<boolean>(false);
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //************* Orientation PROVIDER*************** */
  const {deviceSize} = useOrientation() as IOrientation;
  //*********************************************** */
  //########### NOTIFICATION PROVIDER ############
  const {notifierLoginRef} = useNotification() as INotificationContext;
  //###############################################
  //###################AUTH PROVIDER #####################
  const {loginWithDetails} = useAuth() as authContextInterface;
  //######################################################
  const handleTextInputChange = (
    inputType: 'email' | 'password',
    value: string,
  ) => {
    if (inputType === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  const handleClickEmailInputBtn = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!email) handleShowErrorText('Email is empty, Please fill up!!!');
    else if (reg.test(email) === false)
      handleShowErrorText(
        'Email format incorrect, please input the right email!!!',
      );
    else {
      setcurrentInputType('password');
    }
  };
  const handlePressLoginBtn = async () => {
    if (!password)
      handleShowErrorText('Password blank, please enter pasword...');
    else {
      Keyboard.dismiss();
      setisLoading(true);
      try {
        const result = await loginWithDetails({
          user: email,
          password: password,
        });

        if (result) {
          setisLoading(false);
          return;
        }
        //if password wrong => show error password
        else {
          setisLoading(false);

          notifierLoginRef.current?.showNotification({
            title: 'WRONG EMAIL OR PASSWORD!',
            description: 'Please Enter Your Email Or Password Again',
            Component: Notification,
            queueMode: 'next',
            componentProps: {
              type: 'error',
            },
            containerStyle: getContainerStyleWithTranslateY,
          });
        }
      } catch (err: any) {
        // setnotificationMessage({
        //   messageText: 'Something Wrong, Please try again',
        //   messageType: 'error',
        // });
        notifierLoginRef.current?.showNotification({
          title: 'SOMETHING WRONG!',
          description: 'SERVER ERROR! Please try again',
          Component: Notification,
          queueMode: 'immediate',
          componentProps: {
            type: 'error',
          },
          containerStyle: getContainerStyleWithTranslateY,
        });
      }
    }
  };
  //$$$$$$$$$$$$$$$$$$ HANDLE ANIMATION $$$$$$$$$$$

  const handleShowErrorText = (errorMsg: string) => {
    seterrorText(errorMsg);
    const trigger = setTimeout(() => {
      seterrorText(undefined);
    }, 2000);
  };

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <RootLoginScreen
      entering={FlipInXDown.delay(1000).duration(500)}
      themeColor={THEME_COLOR}>
      <View style={styles.loginForm}>
        <StyledLoginTitleText themeColor={THEME_COLOR}>
          Login
        </StyledLoginTitleText>

        {currentInputType === 'email' && (
          <StyledLoginTextInputContainer
            entering={FadeInLeft}
            themeColor={THEME_COLOR}
            deviceWidth={deviceSize.deviceWidth}>
            <StyledLoginTextInput
              placeholder="Email"
              value={email}
              onChangeText={value => handleTextInputChange('email', value)}
            />
            <StyledLoginFormButton
              icon={props => <TextInputEmailIconButton {...props} />}
              onPress={handleClickEmailInputBtn}
            />
          </StyledLoginTextInputContainer>
        )}

        {currentInputType === 'password' && (
          <StyledLoginTextInputContainer
            entering={FadeInRight}
            themeColor={THEME_COLOR}
            deviceWidth={deviceSize.deviceWidth}>
            <StyledLoginTextInput
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={value => handleTextInputChange('password', value)}
            />
            <StyledLoginFormButton
              icon={props => <TextInputEmailIconButton {...props} />}
              onPress={handlePressLoginBtn}
            />
          </StyledLoginTextInputContainer>
        )}
      </View>

      <StyledMagicLinkText>Login via magic link</StyledMagicLinkText>
      <StyledErrorMessageContainer>
        {errorText && (
          <StyledAnimatedErrorText
            entering={FadeInDown.duration(500)}
            exiting={FadeOutDown.duration(500)}>
            {errorText}
          </StyledAnimatedErrorText>
        )}
      </StyledErrorMessageContainer>

      <StyledVersionText themeColor={THEME_COLOR}>
        version 1.2
      </StyledVersionText>
      {isLoading && (
        <StyledLoadingMaskScreen>
          <LoadingDoxleIconWithText message="Login...Please Wait!" />
        </StyledLoadingMaskScreen>
      )}

      <NotifierRoot ref={notifierLoginRef} />
    </RootLoginScreen>
  );
}

const styles = StyleSheet.create({
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default Login;

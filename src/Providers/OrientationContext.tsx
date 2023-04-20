import {Dimensions} from 'react-native';
import {useEffect, useState, useContext} from 'react';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type TDeviceModel = 'iPhone14Pro';
export interface IOrientation {
  deviceSize: IDeviceSize;
  isPortraitMode?: boolean;
  // deviceModel: string | undefined;
}
export interface IDeviceSize {
  deviceWidth: number;
  deviceHeight: number;
  insetTop: number;
  insetBottom: number;
}

const OrientationContext = React.createContext({});

const OrientationProvider = (children: any) => {
  //****************Handle Get Orientation informtion************** */
  //oritentation mode enum:
  // UNKNOWN: 0
  // PORTRAIT_UP: 1
  // PORTRAIT_DOWN: 2
  // LANDSCAPE_LEFT: 3
  // LANDSCAPE_RIGHT :4
  //=> to check the orientation just check the number return=> portrait (1/2), landscape (3/4)
  //!PT-@@@@@ IOS only support portrait right side, both landscape side... but portrait upside down will get error
  const [isPortraitMode, setIsPortraitMode] = useState<boolean>(
    Dimensions.get('window').width > Dimensions.get('window').height
      ? false
      : true,
  ); //true: portrait, false: landscape

  const [deviceSize, setDeviceSize] = useState<IDeviceSize>({
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Dimensions.get('window').height,
    insetTop: useSafeAreaInsets().top,
    insetBottom: useSafeAreaInsets().bottom,
  });

  // const [deviceModel, setdeviceModel] = useState<string | undefined>(undefined);
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDeviceSize({
          ...deviceSize,
          deviceWidth: window.width,
          deviceHeight: window.height,
        });
        if (window.width > window.height) setIsPortraitMode(false);
        else setIsPortraitMode(true);
      },
    );
    return () => subscription?.remove();
  });

  // useEffect(() => {
  //   getDeviceModel();
  // }, []);

  // const getDeviceModel = async () => {
  //   try {
  //     const result = await DeviceInfo.getDeviceId();
  //     if (result) setdeviceModel(result);
  //   } catch (error) {
  //     console.error('FAIL TO GET MODEL');
  //     return false;
  //   }
  // };
  //******************************************************* */
  const orientationContextValue: IOrientation = {
    deviceSize,
    isPortraitMode,
    // deviceModel,
  };
  return (
    <OrientationContext.Provider
      value={orientationContextValue}
      {...children}
    />
  );
};

const useOrientation = () => useContext(OrientationContext);

export {OrientationProvider, useOrientation};

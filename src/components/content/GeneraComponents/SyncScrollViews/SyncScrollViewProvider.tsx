import {createContext, useContext} from 'react';

import {SharedValue, useSharedValue} from 'react-native-reanimated';

// ------------------------------------------------------------
export interface ISyncScrollViewProps {
  activeScrollView: SharedValue<number>;
  activeFlatlist: SharedValue<number>;
  offsetFlatlistPercent: SharedValue<number>;
  offsetPercent: SharedValue<number>;
}

const SyncedScrollViewContext = createContext({});
const SyncScrollViewProvider = (children: any) => {
  const activeScrollView = useSharedValue(0);
  const offsetPercent = useSharedValue(0);
  const activeFlatlist = useSharedValue(0);
  const offsetFlatlistPercent = useSharedValue(0);
  const syncScrollViewsValue: ISyncScrollViewProps = {
    activeScrollView,
    offsetPercent,
    activeFlatlist,
    offsetFlatlistPercent,
  };
  return (
    <SyncedScrollViewContext.Provider
      value={syncScrollViewsValue}
      {...children}
    />
  );
};

const useSyncScrollView = () => useContext(SyncedScrollViewContext);
export {SyncScrollViewProvider, useSyncScrollView};

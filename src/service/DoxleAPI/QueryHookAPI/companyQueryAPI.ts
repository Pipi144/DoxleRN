import {useQuery} from '@tanstack/react-query';
import {baseAddress} from '../../../../settings';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IRetrieveCompanyListQueryProp {
  showNotification?: (
    message: string,
    messageType: 'success' | 'error',
    extraMessage?: string,
  ) => void;
  onSuccessCb?: Function;
  onErrorCb?: Function;
  accessToken: string | undefined;
}
const useRetrieveCompanyList = ({
  showNotification,
  onSuccessCb,
  accessToken,
  onErrorCb,
}: IRetrieveCompanyListQueryProp) => {
  let actionTimelineQKey = ['company-list'];

  let actionTimelineUrl = 'http://' + baseAddress + '/company/';

  const actionTimelineQuery = useQuery({
    queryKey: actionTimelineQKey,
    queryFn: async () => {
      const asyncCompany: string =
        (await AsyncStorage.getItem('currentCompanyId')) ?? '';
      return axios.get(actionTimelineUrl, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'User-Company': asyncCompany,
        },
        params: {ordering: 'name'},
      });
    },
    enabled: accessToken !== undefined,
    retry: 1,
    staleTime: 0,
    onSuccess: result => {
      if (onSuccessCb) onSuccessCb();
    },
    onError: () => {
      if (showNotification)
        showNotification('SOMETHING WRONG!', 'error', 'Fail To Get Company');
      if (onErrorCb) onErrorCb();
    },
  });

  return actionTimelineQuery;
};

const CompanyQueryAPI = {
  useRetrieveCompanyList,
};

export default CompanyQueryAPI;

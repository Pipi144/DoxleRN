//!--------------> QUERY KEYS <-----------------
//* "docket-detail" => retrieve detail of docket
//* "docket-status" => retrieve docket status list
//* ["fullDocket-list"] => retrieve docket list (can add more filter to this array such as watching, ball in court and project, all added details should be id of it)
//!<--------------------------------------------

import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

import axios from 'axios';
import {Company} from '../../../Models/company';
import {baseAddress} from '../../../../settings';
import {ISimpleProject} from '../../../Models/project';

const useRetrieveDocketDetail = (
  accessToken: string | undefined,
  company: Company | undefined,
  docketId: string,
  showNotification?: (
    message: string,
    messageType: 'success' | 'error',
    extraMessage?: string,
  ) => void,
) => {
  const qKey = ['docket-detail', docketId];
  let docketURL = `http://${baseAddress}/actions/` + docketId + '/';

  const docketQuery = useQuery(
    qKey,
    () =>
      axios.get(docketURL, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'User-Company': company!.companyId,
        },
      }),
    {
      enabled: company !== undefined && accessToken !== undefined,
      retry: 1,
      staleTime: 4 * 60 * 1000,
      onError: () => {
        if (showNotification)
          showNotification(
            'SOMETHING WRONG',
            'error',
            'fail to get docket detail',
          );
      },
    },
  );
  return docketQuery;
};

export interface IFullDocketDetailQueryFilterProp {
  project?: ISimpleProject | undefined;
  watching?: string; //userId array string
  ballInCourt?: string;
}
const useRetrieveFullDetailDocketList = (
  accessToken: string | undefined,

  filter: IFullDocketDetailQueryFilterProp,
  company: Company | undefined,
  showNotification?: (
    message: string,
    messageType: 'success' | 'error',
    extraMessage?: string,
  ) => void,
) => {
  const {project, watching, ballInCourt} = filter;
  const qKey = ['fullDocket-list'];
  let docketURL = `http://${baseAddress}/actions/?page=1`;
  let filterParam: any = {};
  if (project) {
    qKey.push(project.projectId);
    filterParam.project = project.projectId;
  }
  if (watching) {
    filterParam.watching = watching;
    qKey.push(watching);
  }
  if (ballInCourt) {
    filterParam.ballInCourt = ballInCourt;
  }
  const docketQuery = useInfiniteQuery(
    qKey,
    ({pageParam = docketURL}) =>
      axios.get(pageParam, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'User-Company': company!.companyId,
        },
        params: filterParam,
      }),
    {
      enabled: company !== undefined && accessToken !== undefined,
      retry: 1,
      staleTime: 10 * 60 * 1000,
      getNextPageParam: prevData => prevData.data?.next,
      onError: () => {
        if (showNotification)
          showNotification(
            'SOMETHING WRONG',
            'error',
            'fail to get docket list',
          );
      },
    },
  );
  return docketQuery;
};

const useRetrieveDocketStatusList = (
  accessToken: string | undefined,
  company: Company | undefined,
  showNotification?: (
    message: string,
    messageType: 'success' | 'error',
    extraMessage?: string,
  ) => void,
) => {
  const qKey = ['docket-status'];
  let docketURL = `http://${baseAddress}/actions/status/`;
  if (company) qKey.push(company.companyId);
  const docketQuery = useQuery(
    qKey,
    () =>
      axios.get(docketURL, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'User-Company': company!.companyId,
        },
        params: {
          company: company?.companyId,
        },
      }),
    {
      enabled: company !== undefined && accessToken !== undefined,
      retry: 1,
      staleTime: 10 * 60 * 1000,
      onError: () => {
        if (showNotification)
          showNotification(
            'SOMETHING WRONG',
            'error',
            'fail to get docket detail',
          );
      },
    },
  );
  return docketQuery;
};
const DocketQuery = {
  useRetrieveDocketDetail,
  useRetrieveFullDetailDocketList,
  useRetrieveDocketStatusList,
};

export default DocketQuery;

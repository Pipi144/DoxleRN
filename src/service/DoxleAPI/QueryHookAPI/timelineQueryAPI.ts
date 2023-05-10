//!---------> QUERY KEYS <--------
//! ["docketTimeline"] => retrieve docket timeline list,
//!custom add currentBaseStartDateParams  and currentDateRangeLengthParam , if passed these filters in the queryKey to retrieve data, make sure it must be passed whenever doing any mutation related to this queryKey if planning to use setQueryData to update the data to react query
//!<------------------------------

import axios from 'axios';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {baseAddress} from '../../../../settings';

import {Company} from '../../../Models/company';
import {TDateISO, TDateISODate} from '../../../Models/dateFormat';
import {INewDocket} from '../../../Models/docket';

//################### FOR REACT QUERY ###############
export interface DocketTimelineUpdateBody {
  docketName?: string;
  startDate?: TDateISODate | null;
  endDate?: TDateISODate | null;
  commenced?: TDateISO | null;
  completed?: TDateISO | null;
  project?: string;
}
const updateTimelineAPI = async (
  docketPk: string,
  accessToken: string,
  {
    docketName,
    startDate,
    endDate,
    commenced,
    completed,
    project,
  }: DocketTimelineUpdateBody,
) => {
  const body: any = {};
  if (docketName !== undefined) body.docketName = docketName;
  if (startDate !== undefined) body.start_date = startDate;
  if (endDate !== undefined) body.end_date = endDate;
  if (commenced !== undefined) body.commenced = commenced;
  if (completed || completed === null) body.completed = completed;
  if (project) body.project = project;
  return axios.patch(
    'http://' + baseAddress + '/dockets/' + docketPk + '/',
    body,
    {
      headers: {Authorization: 'Bearer ' + accessToken},
    },
  );
};
const addTimelineAPI = async (
  accessToken: string,
  company: Company | undefined,
  newTimeline: INewDocket,
) => {
  return axios.post('http://' + baseAddress + '/dockets/', newTimeline, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'User-Company': company?.companyId || '',
    },
  });
};

const deleteTimelineAPI = async (
  docketPk: string,
  accessToken: string,
  company: Company | undefined,
) => {
  return axios.delete('http://' + baseAddress + '/dockets/' + docketPk + '/', {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'User-Company': company?.companyId || '',
    },
  });
};
export interface ITimelineDocketUpdateQueryProps {
  docketPk: string;
  accessToken: string;
  updateBody: DocketTimelineUpdateBody;
  currentBaseStartDateParams: string; //!important=> used to overwrite cache data of react query
  currentDateRangeLengthParam: number; //!important=> used to overwrite cache data of react query
}
export interface ITimelineDocketAddQueryProps {
  newTimeline: INewDocket;
  accessToken: string;
  company: Company | undefined;
  currentBaseStartDateParams: string; //!important=> used to overwrite cache data of react query
  currentDateRangeLengthParam: number; //!important=> used to overwrite cache data of react query
}
export interface ITimelineDocketDeleteQueryProps {
  docketPk: string;
  accessToken: string;
  company: Company | undefined;
}

interface ITimelineDocketRetrieveQueryProps {
  baseStartDate: string;
  dateRangeLength: number;
  accessToken: string | undefined;
  company: Company | undefined;
  showNotification?: (
    message: string,
    messageType: 'success' | 'error',
    extraMessage?: string,
  ) => void;
}
interface IuseUpdateTimelineDocketProp {
  showNotification?: (
    message: string,
    messageType: 'success' | 'error',
    extraMessage?: string,
  ) => void;
  onSuccessCb?: Function;
}

const useRetrieveTimelineDocket = ({
  baseStartDate,
  dateRangeLength,
  accessToken,
  company,
  showNotification,
}: ITimelineDocketRetrieveQueryProps) => {
  let actionTimelineQKey = ['docketTimeline', baseStartDate, dateRangeLength];

  let actionTimelineUrl = `http://${baseAddress}/dockets/timeline/?start=${baseStartDate}&days=${dateRangeLength}`;

  const actionTimelineQuery = useQuery({
    queryKey: actionTimelineQKey,
    queryFn: () =>
      axios.get(actionTimelineUrl, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'User-Company': company!.companyId,
        },
      }),
    enabled: accessToken !== undefined && company !== undefined,
    retry: 1,
    staleTime: 0,
    onError: () => {
      if (showNotification)
        showNotification('SOMETHING WRONG!', 'error', 'Fail to fetch dockets');
    },
  });

  return actionTimelineQuery;
};
const useUpdateTimelineDocket = ({
  showNotification,
  onSuccessCb,
}: IuseUpdateTimelineDocketProp) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ITimelineDocketUpdateQueryProps) =>
      updateTimelineAPI(data.docketPk, data.accessToken, data.updateBody),
    onSuccess: (result, variables, context) => {
      if (showNotification)
        showNotification(
          'UPDATED DATA',
          'success',
          'SUCCESSFULLY UPDATED DATA',
        );
      if (onSuccessCb) onSuccessCb();

      queryClient.setQueryData(
        [
          'docketTimeline',
          variables.currentBaseStartDateParams,
          variables.currentDateRangeLengthParam,
        ],
        (old: any) =>
          old
            ? {
                ...old,
                data: old.data.map((docket: INewDocket) => {
                  if (docket.docketPk === variables.docketPk) {
                    return result.data;
                  } else return docket;
                }),
              }
            : old,
      );
    },
    onError: (error, variables, context) => {
      if (showNotification)
        showNotification(
          'SOMETHING WRONG!',
          'error',
          'Fail To Update Action Timeline',
        );

      console.log('ERROR:', error);
    },
  });
  const mutate = (data: ITimelineDocketUpdateQueryProps) =>
    mutation.mutate(data);
  return {...mutation, mutate: mutate};
};

const useAddTimelineDocket = (
  showNotification?: (
    message: string,
    messageType: 'success' | 'error',
    extraMessage?: string,
  ) => void,
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ITimelineDocketAddQueryProps) =>
      addTimelineAPI(data.accessToken, data.company, data.newTimeline),
    onSuccess: (result, variables, context) => {
      if (showNotification)
        showNotification('Item Added', 'success', 'SUCCESSFULLY UPDATED DATA');
      console.log(result);
      queryClient.setQueryData(
        [
          'docketTimeline',
          variables.currentBaseStartDateParams,
          variables.currentDateRangeLengthParam,
        ],
        (old: any) =>
          old
            ? {
                ...old,
                data: [...old.data, result.data],
              }
            : old,
      );
    },
    onError: (error, variables, context) => {
      if (showNotification)
        showNotification(
          'SOMETHING WRONG!',
          'error',
          'Fail To Add Action Timeline',
        );
    },
  });
  const mutate = (data: ITimelineDocketAddQueryProps) => mutation.mutate(data);
  return {...mutation, mutate: mutate};
};

const useDeleteTimelineDocket = (
  showNotification?: (
    message: string,
    messageType: 'success' | 'error',
    extraMessage?: string,
  ) => void,
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ITimelineDocketDeleteQueryProps) =>
      deleteTimelineAPI(data.docketPk, data.accessToken, data.company),
    onSuccess: (result, variables, context) => {
      if (showNotification)
        showNotification(
          'DELETED DATA',
          'success',
          'SUCCESSFULLY DELETED DATA',
        );

      return queryClient.invalidateQueries(['docketTimeline']);
    },
    onError: (error, variables, context) => {
      if (showNotification)
        showNotification(
          'SOMETHING WRONG!',
          'error',
          'Fail To Delete Action Timeline',
        );
    },
  });
  const mutate = (data: ITimelineDocketDeleteQueryProps) =>
    mutation.mutate(data);
  return {...mutation, mutate: mutate};
};

const TimelineQueryAPI = {
  useUpdateTimelineDocket,
  useAddTimelineDocket,
  useDeleteTimelineDocket,
  useRetrieveTimelineDocket,
};

export default TimelineQueryAPI;

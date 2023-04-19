//!---------> QUERY KEYS <--------
//* "docketTimeline" => retrieve action list

//!<------------------------------

import axios from 'axios';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {baseAddress} from '../../../../settings';
import {
  NewTimelineDocket,
  TimelineDocket,
} from '../../../Models/DocketTimelineModel';
import {Company} from '../../../Models/company';

//################### FOR REACT QUERY ###############
export interface DocketTimelineUpdateBody {
  subject?: string;
  startDate?: string;
  endDate?: string;
  commenced?: string | null;
  completed?: string | null;
  project?: string;
}
const updateTimelineAPI = async (
  actionId: string,
  accessToken: string,
  {
    subject,
    startDate,
    endDate,
    commenced,
    completed,
    project,
  }: DocketTimelineUpdateBody,
) => {
  const body: any = {};
  if (subject) body.subject = subject;
  if (startDate) body.start_date = startDate;
  if (endDate) body.end_date = endDate;
  if (commenced) body.commenced = commenced;
  if (completed || completed === null) body.completed = completed;
  if (project) body.project = project;
  return axios.patch(
    'http://' + baseAddress + '/actions/timeline/' + actionId + '/',
    body,
    {
      headers: {Authorization: 'Bearer ' + accessToken},
    },
  );
};
const addTimelineAPI = async (
  accessToken: string,
  company: Company | undefined,
  newTimeline: NewTimelineDocket,
) => {
  return axios.post(
    'http://' + baseAddress + '/actions/timeline/add/',
    newTimeline,
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'User-Company': company?.companyId || '',
      },
    },
  );
};

const deleteTimelineAPI = async (
  actionId: string,
  accessToken: string,
  company: Company | undefined,
) => {
  return axios.delete(
    'http://' + baseAddress + '/actions/timeline/' + actionId + '/',
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'User-Company': company?.companyId || '',
      },
    },
  );
};
export interface ITimelineDocketUpdateQueryProps {
  actionId: string;
  accessToken: string;
  updateBody: DocketTimelineUpdateBody;
  currentBaseStartDateParams: string; //!important=> used to overwrite cache data of react query
  currentDateRangeLengthParam: number; //!important=> used to overwrite cache data of react query
}
export interface ITimelineDocketAddQueryProps {
  newTimeline: NewTimelineDocket;
  accessToken: string;
  company: Company | undefined;
  currentBaseStartDateParams: string; //!important=> used to overwrite cache data of react query
  currentDateRangeLengthParam: number; //!important=> used to overwrite cache data of react query
}
export interface ITimelineDocketDeleteQueryProps {
  actionId: string;
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

  let actionTimelineUrl = `http://${baseAddress}/actions/timeline/?start=${baseStartDate}&days=${dateRangeLength}`;

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
        showNotification('SOMETHING WRONG!', 'error', 'Fail to fetch actions');
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
      updateTimelineAPI(data.actionId, data.accessToken, data.updateBody),
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
                data: old.data.map((action: TimelineDocket) => {
                  if (action.actionId === variables.actionId) {
                    return result.data;
                  } else return action;
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
      deleteTimelineAPI(data.actionId, data.accessToken, data.company),
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

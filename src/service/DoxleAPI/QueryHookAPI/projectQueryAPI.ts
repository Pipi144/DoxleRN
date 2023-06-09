//!-------- > QUERY KEYS < -----------
//* ["projects-timeline", companyId] => require "projects-timeline" and pass in companyId to retrieve projects for timeline
//!-----------------------------------

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {Company} from '../../../Models/company';
import {baseAddress} from '../../../../settings';
import {ISimpleProjectTimeline} from '../../../Models/project';

const useRetrieveProjectTimelineQuery = (
  company: Company | undefined,
  accessToken: string | undefined,
  showNotification?: (
    message: string,
    messageType: 'success' | 'error',
    extraMessage?: string,
  ) => void,
) => {
  const qKey = ['projects-timeline', company?.companyId];
  const projectQuery = useQuery(
    qKey,
    () => {
      let getParams = {company: company?.companyId};
      return axios.get('http://' + baseAddress + '/project/timeline', {
        headers: {
          Authorization: 'Bearer ' + 'accessToken',
        },
        params: getParams,
      });
    },
    {
      enabled: company !== undefined && accessToken !== undefined,
      retry: 1,
      staleTime: 5 * (60 * 100),
      onError: () => {
        if (showNotification)
          showNotification(
            'SOMETHING WRONG',
            'error',
            'fail to fetch projects',
          );
      },
    },
  );
  return projectQuery;
};
interface IUpdateProjectQueryProps {
  accessToken: string | undefined;
  updateData: {
    siteAddress?: string;
    contractPrice?: number;
    budget?: number;
    startDate?: string;
    endDate?: string;
    projectPrefix?: string;
    ownerIsCompany?: boolean;

    ownerName?: string;
    ownerAbn?: string;
    ownerEmail?: string;
    ownerPhone?: string;
    trackingId?: string | null;
  };
}

const useUpdateProjectQuery = (
  projectId: string,
  company: Company | undefined,
  showNotification?: (
    message: string,
    messageType: 'success' | 'error',
    extraMessage?: string,
  ) => void,
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({accessToken, updateData}: IUpdateProjectQueryProps) => {
      let body: any = {};
      if (updateData.siteAddress) {
        body.siteAddress = updateData.siteAddress;
      }
      if (updateData.contractPrice) {
        body.contractPrice = updateData.contractPrice;
      }
      if (updateData.budget) {
        body.budget = updateData.budget;
      }
      if (updateData.startDate) {
        body.startDate = updateData.startDate;
      }
      if (updateData.endDate) {
        body.endDate = updateData.endDate;
      }
      if (updateData.ownerName) {
        body.ownerName = updateData.ownerName;
      }
      if (updateData.ownerAbn) {
        body.ownerAbn = updateData.ownerAbn;
      }
      if (updateData.ownerEmail) {
        body.ownerEmail = updateData.ownerEmail;
      }
      if (updateData.ownerPhone) {
        body.ownerPhone = updateData.ownerPhone;
      }
      if (updateData.projectPrefix) {
        body.projectPrefix = updateData.projectPrefix;
      }
      if (updateData.trackingId) {
        body.trackingId = updateData.trackingId;
      }
      return axios.patch(
        'http://' + baseAddress + '/project/' + projectId + '/',
        body,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'User-Company': company?.companyId || '',
          },
        },
      );
    },
    onSuccess: (result, variables, context) => {
      if (showNotification) showNotification('Project Updated', 'success');
      console.log('EDIT PROJECT RESULT:', result);
      return queryClient.setQueryData(
        ['projects-timeline', company?.companyId || ''],
        (old: any) =>
          old
            ? {
                ...old,
                results: (old.results as ISimpleProjectTimeline[]).map(
                  project => {
                    if (project.projectId === result.data.projectId)
                      return result.data;
                    else return project;
                  },
                ),
              }
            : old,
      );
    },
    onError: (error, variables, context) => {
      if (showNotification)
        showNotification('SOMETHING WRONG!', 'error', 'Fail To update spec');
    },
  });
  const mutate = (data: IUpdateProjectQueryProps) => mutation.mutate(data);
  return {...mutation, mutate};
};

const ProjectQueryAPI = {
  useUpdateProjectQuery,
  useRetrieveProjectTimelineQuery,
};

export default ProjectQueryAPI;

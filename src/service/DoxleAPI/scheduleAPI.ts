import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const baseAddress = "http://app.doxle.com/api2/";
const currentCompanyId = "c074feca-fd03-4620-88b4-efedc1235ad1"; //use this one to pass in along with header for the key "User-Company"
const accessToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4MjNkMWE0MTg5ZjI3NThjYWI4NDQ4ZmQ0MTIwN2ViZGZhMjVlMzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZG94bGUtYnVpbGQtOTg1NjYiLCJhdWQiOiJkb3hsZS1idWlsZC05ODU2NiIsImF1dGhfdGltZSI6MTY4MTQyMjk4OSwidXNlcl9pZCI6Im5PVmtMVzVONXVjOFo4bTRBd2VXSm5MTlZwdjIiLCJzdWIiOiJuT1ZrTFc1TjV1YzhaOG00QXdlV0puTE5WcHYyIiwiaWF0IjoxNjgxNDIyOTg5LCJleHAiOjE2ODE0MjY1ODksImVtYWlsIjoiZGF2aWRsaWthbGRvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJkYXZpZGxpa2FsZG9AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.PJyuM9Tn1ggbtWCPQLwJOSGH2TvbOCkworv2EHR6huqVtpz-X__orKxl4Z6gi7S9NHdsHXLvWrmnzXzOuLW_T34EII5GKp_CVwYUArrTqiUOrNNKoFOjtPP-mFMnTufh1PI5n-O5Bc1-dCI3Zlpt8ENghoc6_r6eyXxLvhcUceFEqw3-0U4doqSotMI9AydFQB5yJ7byzmwG2P70Oc8l5yM1uy1NxaBO8M0d4UtPV9p83-gZenvKrhRfEW62SwH0B8GPElI8WyVCzplN3KEZlpdRKJ5HWYO8VulB5X-mEBYVMnFKacncduMpxpTgTos-SKL6nCs_fE5wYXbbQY882A";
//################### FOR REACT QUERY ###############
export interface ActionTimelineUpdateBody {
  subject?: string;
  startDate?: string;
  endDate?: string;
  commenced?: string | null;
  completed?: string | null;
  project?: string;
}

export interface NewTimelineActions {
  actionId: string;
  subject: string;
  startDate: string;
  endDate: string;
  company: string;
  project?: string;
  actionIdStr: string;
  status: string;
  message?: string;
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
  }: ActionTimelineUpdateBody
) => {
  const body: any = {};
  if (subject) body.subject = subject;
  if (startDate) body.start_date = startDate;
  if (endDate) body.end_date = endDate;
  if (commenced) body.commenced = commenced;
  if (completed || completed === null) body.completed = completed;
  if (project) body.project = project;
  return axios.patch(
    "http://" + baseAddress + "/actions/timeline/" + actionId + "/",
    body,
    {
      headers: { Authorization: "Bearer " + accessToken },
    }
  );
};
const addTimelineAPI = async (
  accessToken: string,
  newTimeline: NewTimelineActions
) => {
  return axios.post(
    "http://" + baseAddress + "/actions/timeline/add/",
    newTimeline,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
        "User-Company": currentCompanyId,
      },
    }
  );
};

const deleteTimelineAPI = async (actionId: string, accessToken: string) => {
  return axios.delete(
    "http://" + baseAddress + "/actions/timeline/" + actionId + "/",
    {
      headers: {
        Authorization: "Bearer " + accessToken,
        "User-Company": currentCompanyId,
      },
    }
  );
};
export interface ITimelineActionUpdateQueryProps {
  actionId: string;
  accessToken: string;
  updateBody: ActionTimelineUpdateBody;
}
export interface ITimelineActionAddQueryProps {
  newTimeline: NewTimelineActions;
  accessToken: string;
}
export interface ITimelineActionDeleteQueryProps {
  actionId: string;
  accessToken: string;
}
interface IuseUpdateTimelineActionsProp {
  showNotification?: (
    message: string,
    messageType: "success" | "error",
    extraMessage?: string
  ) => void;
  onSuccessCb?: Function;
}
const useUpdateTimelineActions = ({
  showNotification,
  onSuccessCb,
}: IuseUpdateTimelineActionsProp) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ITimelineActionUpdateQueryProps) =>
      updateTimelineAPI(data.actionId, data.accessToken, data.updateBody),
    onSuccess: (result, variables, context) => {
      if (showNotification)
        showNotification(
          "UPDATED DATA",
          "success",
          "SUCCESSFULLY UPDATED DATA"
        );
      if (onSuccessCb) onSuccessCb();
      return queryClient.invalidateQueries(["actionTimeline"]);
    },
    onError: (error, variables, context) => {
      if (showNotification)
        showNotification(
          "SOMETHING WRONG!",
          "error",
          "Fail To Update Action Timeline"
        );
    },
  });
  const mutate = (data: ITimelineActionUpdateQueryProps) =>
    mutation.mutate(data);
  return { ...mutation, mutate: mutate };
};

const useAddTimelineActions = (
  showNotification?: (
    message: string,
    messageType: "success" | "error",
    extraMessage?: string
  ) => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ITimelineActionAddQueryProps) =>
      addTimelineAPI(data.accessToken, data.newTimeline),
    onSuccess: (result, variables, context) => {
      if (showNotification)
        showNotification("Item Added", "success", "SUCCESSFULLY UPDATED DATA");
      return queryClient.invalidateQueries(["actionTimeline"]);
    },
    onError: (error, variables, context) => {
      if (showNotification)
        showNotification(
          "SOMETHING WRONG!",
          "error",
          "Fail To Add Action Timeline"
        );
    },
  });
  const mutate = (data: ITimelineActionAddQueryProps) => mutation.mutate(data);
  return { ...mutation, mutate: mutate };
};

const useDeleteTimelineActions = (
  showNotification?: (
    message: string,
    messageType: "success" | "error",
    extraMessage?: string
  ) => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ITimelineActionDeleteQueryProps) =>
      deleteTimelineAPI(data.actionId, data.accessToken),
    onSuccess: (result, variables, context) => {
      if (showNotification)
        showNotification(
          "DELETED DATA",
          "success",
          "SUCCESSFULLY DELETED DATA"
        );
      return queryClient.invalidateQueries(["actionTimeline"]);
    },
    onError: (error, variables, context) => {
      if (showNotification)
        showNotification(
          "SOMETHING WRONG!",
          "error",
          "Fail To Delete Action Timeline"
        );
    },
  });
  const mutate = (data: ITimelineActionDeleteQueryProps) =>
    mutation.mutate(data);
  return { ...mutation, mutate: mutate };
};
const ScheduleAPI = {
  useUpdateTimelineActions,
  useAddTimelineActions,
  useDeleteTimelineActions,
};

export default ScheduleAPI;

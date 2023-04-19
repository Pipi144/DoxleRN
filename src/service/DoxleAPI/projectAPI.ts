import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {ISimpleProjectTimeline} from '../../components/content/DocketTimeline/ActionTimelineModel';

const baseAddress = 'http://app.doxle.com/api2/';
const currentCompanyId = 'c074feca-fd03-4620-88b4-efedc1235ad1'; //use this one to pass in along with header for the key "User-Company"
const accessToken =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4MjNkMWE0MTg5ZjI3NThjYWI4NDQ4ZmQ0MTIwN2ViZGZhMjVlMzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZG94bGUtYnVpbGQtOTg1NjYiLCJhdWQiOiJkb3hsZS1idWlsZC05ODU2NiIsImF1dGhfdGltZSI6MTY4MTQzNjMxMSwidXNlcl9pZCI6ImVsMGJwZ0RsUmhOdWhsR3IwT0t5SHo2c2NBNjIiLCJzdWIiOiJlbDBicGdEbFJoTnVobEdyME9LeUh6NnNjQTYyIiwiaWF0IjoxNjgxNDQxMzMwLCJleHAiOjE2ODE0NDQ5MzAsImVtYWlsIjoicGV0ZXJ0cDE0NEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJwZXRlcnRwMTQ0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.J-CeNtNiHLzD3bMsPtYAKz5KtTfWv4DwZnTqVrs83TzLyPbazjFETcuA-MfRwVc0DQ3XeRgtm35LvUYToP4nj7Vcxi45idF_09t5mErxI7n7PrUud8rvc6PLSsciK9Igwqsl9eQ1vA9sLZou3cFTNYuJeRXrDhlLGmwNxrqOxOi4PUwioXb-jeRWe_ChuLqp5tZrln-eYkw-Wju3ZAMBVy2bZCyAjicxjBRsbK2XUh2k3ORs0r5JcJ8KHiF-VA9nafRrch9BGTnkPTXDIVvtIbM5lfZx2xU5C90Dzi0fXuyFWatdtu35jZgSMLPXxGvNe_PZEe52mo0Gl8z080iF8w';
const url = 'app.doxle.com/api2';
interface GetParams {
  company?: string;
  ordering?: string;
}
const getAllProjectTimelineAPI = async () => {
  let getParams: GetParams = {company: currentCompanyId};

  return axios
    .get('http://' + url + '/project/timeline/', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      params: getParams,
    })
    .then(res => {
      console.log(res.data);
      return res.data;
    });
};

let actionTimelineQKey = ['allProjectTimeline'];

const useGetAllProjectTimeline = (
  showNotification?: (
    message: string,
    messageType: 'success' | 'error',
    extraMessage?: string,
  ) => void,
) => {
  const allProjectTimelineQuery = useQuery<ISimpleProjectTimeline[], Error>({
    queryKey: actionTimelineQKey,
    queryFn: () => getAllProjectTimelineAPI(),
    enabled: accessToken !== undefined,
    retry: 1,
    staleTime: Infinity,
    onError: error => {
      showNotification('SOMETHING WRONG!', 'error', 'Fail to fetch actions');

      console.log('ERROR', error);
    },
  });
  return allProjectTimelineQuery;
};
const ProjectAPI = {
  useGetAllProjectTimeline,
};

export default ProjectAPI;

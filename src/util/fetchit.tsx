import { API_ENDPOINT } from 'src/conf';

type httpmethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function fetchit<B, R>(
  route: string,
  method: httpmethod,
  body: B | undefined,
  onSuccess: (ret: R) => void,
  onFailure?: (reason: any) => void,
) {
  const fetchCall = fetch(`${API_ENDPOINT}/${route}`, {
    body: body && JSON.stringify(body),
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
    },
    method,
  }).then(res => res.json().then((ret: R) => onSuccess(ret)));
  if (!!onFailure) {
    fetchCall.catch((reason: any) => onFailure(reason));
  }
}

export default fetchit;

import { API_ENDPOINT } from 'src/conf';

type httpmethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function fetchit<T>(
  route: string,
  method: httpmethod,
  onSuccess: (t: T) => void,
  onFailure?: (reason: any) => void,
) {
  const fetchCall = fetch(`${API_ENDPOINT}/${route}`, {
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
    },
    method,
  }).then(res => res.json().then((t: T) => onSuccess(t)));
  if (!!onFailure) {
    fetchCall.catch((reason: any) => onFailure(reason));
  }
}

export default fetchit;

import { API_ENDPOINT } from '../conf';

type httpmethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function fetchit<B, R>(
  controller: AbortController,
  route: string,
  method: httpmethod,
  body: B | undefined,
  onSuccess?: (ret: R) => void,
  onFailure?: (reason: any) => void,
) {
  let fetchCall = fetch(`${API_ENDPOINT}${route}`, {
    body: body && JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
    method,
    signal: controller.signal,
  }).then(res => res.json());
  if (!!onSuccess) {
    fetchCall = fetchCall.then((ret: R) => onSuccess(ret));
  }
  if (!!onFailure) {
    fetchCall = fetchCall.catch((reason: any) => onFailure(reason));
  } else { // Not handling the error, so it shouldn't go anywhere
    fetchCall = fetchCall.catch((reason: any) => {
      return;
    });
  }
  return fetchCall;
}

export default fetchit;

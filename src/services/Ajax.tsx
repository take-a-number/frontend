
interface IAjaxSettings {
  method?: string,
  responseType?: XMLHttpRequestResponseType,
  data?: object,
  username?: string,
  password?: string
}

/**
 * A substitute for jQuery's ajax method.
 * @param url the url to which to submit the request
 * @param settings options associated with the request
 * @return Promise<object> Promise for success and failure, both given objects from the server
 */
const ajax = (url: string, settings: IAjaxSettings = {}) => {
  return new Promise<object>((resolve, reject) => {
    // add default method
    settings.method = (settings.method || 'GET').toUpperCase();

    let xhr = new XMLHttpRequest();
    xhr.open(settings.method, url, true, settings.username, settings.password);

    if (settings.responseType) {
      xhr.responseType = settings.responseType;
    }

    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.addEventListener('load', e => {
      let response = JSON.parse(xhr.response);
      return (xhr.status >= 200 && xhr.status < 300) ?
        resolve(xhr.response) :
        reject(xhr.response)
    });
    xhr.addEventListener('error', e => reject(JSON.parse(xhr.response)));

    if (settings.data) {
      xhr.send(JSON.stringify(settings.data));
    } else {
      xhr.send();
    }
  });
};

export {ajax};

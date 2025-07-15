import { handleFetchError } from './errorhandler';

interface FetchData {
  url: string;
  method?: string;
  body?: BodyInit | null;
  token?: string | null;
  image?: boolean;
  abortSignal?: AbortSignal | null;
  credentials?: RequestCredentials;
  isFormData?: boolean;
}

export const fetchUtil = async (data: FetchData) => {
  const {
    url,
    method = 'GET',
    body = null,
    token = null,
    image = false,
    abortSignal = null,
    credentials = 'same-origin',
    isFormData = false,
  } = data;
  let headers: Record<string, string> = {};

  if (!image && !isFormData) {
    headers = { 'Content-Type': 'application/json' };
  }
  if (isFormData) {
    headers = { Accept: '*/*', 'Accept-Encoding': 'gzip, deflate, br' };
  }

  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }

  // const config = window.electron.getConfig();

  // return fetch(`${config.mainBaseURL}${url}`, {
  return fetch(`${url}`, {
    method,
    headers,
    body,
    credentials,
    ...(abortSignal && { signal: abortSignal }),
 }).then(handleFetchError);
};
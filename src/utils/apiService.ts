import { fetchUtil } from './fetchUtil';
import { appendQueryParams } from './urlUtils';
// import useAuthStore from '../store/Auth';

interface RequestOptions {
  url?: string;
  params?: Record<string, any>;
  isAuthorized?: boolean;
  abortSignal?: AbortSignal | null;
  body?: Record<string, any>;
  isFormData?: boolean;
  isParamsNotEncoded?: boolean;
}

export const Get = async ({
  url = '',
  params = {},
  isAuthorized = true,
  abortSignal = null,
}: RequestOptions) => {
  let token = null;
  if (isAuthorized) {
    //token = useAuthStore.getState().token;
  }
  return fetchUtil({
    url: Object.keys(params).length > 0 ? appendQueryParams(url, params) : url,
    token,
    abortSignal,
  })
    .then((res) => {
      const { result } = res;
      return Promise.resolve(result ? result : res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const Post = async ({
  url = '',
  body = {},
  params = {},
  isAuthorized = true,
  abortSignal = null,
  isFormData = false,
}: RequestOptions) => {
  let token = null;
  if (isAuthorized) {
    //token = useAuthStore.getState().token;
    // token = cookies.get("access_token");
  }

 // token = `yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicmVjZXB0aW9uIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiODYxNyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjUiLCJleHAiOjE3NDY0NTIyNzgsImlzcyI6IjFJai9FWDR6bGEzcmtNU2cvYW82TGRmaE5GWUFLRzQ1L3U1cWdsd2plZHBmMzlESm83VUhoRlNxZVUvazhFZ203ajlCaW1PT2thU21nc082Rnh4NERBPT0iLCJhdWQiOiIxSWovRVg0emxhM3JrTVNnL2FvNkxkZmhORllBS0c0NS91NXFnbHdqZWRwZjM5REpvN1VIaEZTcWVVL2s4RWdtN2o5QmltT09rYVNtZ3NPNkZ4eDREQT09In0.eBfNqmCQOuhGFwkpyIVPCUxm6PzlYscH4S4nEXvsZ8o`
  return fetchUtil({
    url: Object.keys(params).length > 0 ? appendQueryParams(url, params) : url,
    token,
    body: isFormData ? (body as any) : JSON.stringify(body),
    method: 'POST',
    abortSignal,
    isFormData,
  })
    .then((res) => {
      const { result } = res;
      return Promise.resolve(result ? result : res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const Put = async ({
  url = '',
  params = {},
  body = {},
  isAuthorized = true,
  abortSignal = null,
  isParamsNotEncoded = false,
}: RequestOptions) => {
  let token = null;

  if (isAuthorized) {
    //token = useAuthStore.getState().token;
  }

  return fetchUtil({
    url:
      Object.keys(params).length > 0
        ? appendQueryParams(url, params, isParamsNotEncoded)
        : url,
    token,
    body: JSON.stringify(body),
    method: 'PUT',
    abortSignal,
  })
    .then((res) => {
      const { data } = res;
      return Promise.resolve(data ? data : res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const Delete = async ({
  url = '',
  isAuthorized = true,
  abortSignal = null,
  body = {},
}: RequestOptions) => {
  let token = null;

  if (isAuthorized) {
    //token = useAuthStore.getState().token;
  }

  return fetchUtil({
    url,
    token,
    method: 'DELETE',
    abortSignal,
    body: JSON.stringify(body),
  })
    .then((res) => {
       if (res && res.status === 204 || res==null) {
      return Promise.resolve(null); // or return any default
    }
      const { data } = res;
      return Promise.resolve(data ? data : res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};


export const DeleteById = async ({
  url = '',
  params = {},
  isAuthorized = true,
  abortSignal = null,
}: RequestOptions) => {
  let token = null;

  if (isAuthorized) {
    //token = useAuthStore.getState().token;
  }

  return fetchUtil({
    // url,
      url: Object.keys(params).length > 0 ? appendQueryParams(url, params) : url,
    token,
    method: 'DELETE',
    abortSignal,
  })
    .then((res) => {
      const { data } = res;
      return Promise.resolve(data ? data : res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};


export const Patch = async ({
  url = '',
  body = {},
  isAuthorized = true,
  abortSignal = null,
}: RequestOptions) => {
  let token = null;

  if (isAuthorized) {
    //token = useAuthStore.getState().token;
  }

  return fetchUtil({
    url,
    token,
    body: JSON.stringify(body),
    method: 'PATCH',
    abortSignal,
  })
    .then((res) => {
      const { data } = res;
      return Promise.resolve(data ? data : res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
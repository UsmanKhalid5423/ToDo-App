import StatusCodes from '../constants/StatusCodes';
//import { AUTH_ROUTES } from '../routes';
//import useAuthStore from '../store/Auth';

export const handleFetchError = async (res: any) => {
  //const setUserData = useAuthStore.getState().setUserData;
  //const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;
  //const setToken = useAuthStore.getState().setToken;

  if (
    res.status >= StatusCodes.BAD_REQUEST &&
    res.status < StatusCodes.CONNECTION_TIMED_OUT
  ) {
    console.log(res, 'Error while fetching');
    if (
      res.status === StatusCodes.UNAUTHORIZED ||
      res.status === StatusCodes.FORBIDDEN
    ) {
      // localStorage.clear();
      sessionStorage.clear();
      //setUserData(null);
      //setIsLoggedIn(false);
      //setToken('');

      //window.location.href = AUTH_ROUTES.LOGIN;
    } else {
      const response = await res.clone().json();
      console.error(`${response.title || 'Your Session has been Expired!'}`);
    }

    const response = await res?.clone()?.json();
    const errRes = {
      ...response,
      status: res.status,
    };
    throw errRes;
  }
  // return res.json();
  console.log('res',res)

  return res && res.status !== 204 ? res.json() : null;

};
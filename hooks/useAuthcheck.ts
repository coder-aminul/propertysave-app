import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { userLoggedIn } from '~/store/auth/authSlice';

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authCheck, setAuthCheck] = useState(false);

  useEffect(() => {
    const localAuth = SecureStore?.getItem('auth');
    const userinfo = SecureStore.getItem('user');
    // const clearauth = () => {
    //   setTimeout(() => {
    //     localStorage.clear();
    //     dispatch(userLoggedOut());
    //     location.reload();
    //   }, 10800000);
    // };
    // clearauth();
    if (localAuth) {
      dispatch(
        userLoggedIn({
          accessToken: localAuth,
          authStatus: true,
        })
      );
    }
    setAuthCheck(true);
  }, [dispatch, setAuthCheck]);
  return authCheck;
};

import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { accessToken } = useSelector((state: any) => state.auth);
  if (accessToken) {
    return true;
  } else {
    return false;
  }
};

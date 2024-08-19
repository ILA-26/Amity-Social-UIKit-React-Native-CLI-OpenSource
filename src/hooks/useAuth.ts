import { useContext } from 'react';

import { AuthContext } from '../providers/auth-provider';
import type { AuthContextInterface } from '../types/auth.interface';

const useAuth = (): AuthContextInterface => {
  const {
    login,
    logout,
    client,
    isConnecting,
    isConnected,
    error,
    sessionState,
    apiRegion,
    avatarImgUrl,
  } = useContext(AuthContext);

  return {
    error,
    login,
    client,
    logout,
    isConnecting,
    isConnected,
    sessionState,
    apiRegion,
    avatarImgUrl,
  };
};

export default useAuth;

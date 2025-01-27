import * as React from 'react';
import useAuth from '../hooks/useAuth';
import AmitySocialUIKitV4Navigator from '../v4/ila-26/routes/AmitySocialUIKitV4Navigator';

export interface SocialNavigatorProps {
  AppsTab?: () => React.ReactNode;
}

export default function SocialNavigator() {
  const { isConnected } = useAuth();

  return <>{isConnected && <AmitySocialUIKitV4Navigator />}</>;
}

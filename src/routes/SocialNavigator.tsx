/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import type { RootStackParamList } from './RouteParamList';
import useAuth from '../hooks/useAuth';
import Explore from '../screens/Explore';
import CategoryList from '../screens/CategorytList';
import CommunityList from '../screens/CommunityList';
import CommunityHome from '../v4/screen/CommunityHome';
import { CommunitySetting } from '../screens/CommunitySetting/index';
import CommunityMemberDetail from '../screens/CommunityMemberDetail/CommunityMemberDetail';
import PostDetail from '../screens/PostDetail';
import CreatePost from '../screens/CreatePost';
import UserProfile from '../v4/screen/UserProfile/UserProfile';
import { EditProfile } from '../screens/EditProfile/EditProfile';
import UserProfileSetting from '../v4/screen/UserProfileSetting/UserProfileSetting';
import CommunitySearch from '../screens/CommunitySearch';
import AllMyCommunity from '../screens/AllMyCommunity';
import CreateCommunity from '../screens/CreateCommunity';
import PendingPosts from '../screens/PendingPosts';
import type { MyMD3Theme } from '../providers/amity-ui-kit-provider';
import { useTheme } from 'react-native-paper';
import { Image, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { closeIcon } from '../svg/svg-xml-list';
import { useStyles } from '../routes/style';
import BackButton from '../components/BackButton';
import CancelButton from '../components/CancelButton';
import CloseButton from '../components/CloseButton';
import EditCommunity from '../screens/EditCommunity/EditCommunity';
import VideoPlayerFull from '../screens/VideoPlayerFullScreen';
import CreatePoll from '../screens/CreatePoll/CreatePoll';
import ReactionListScreen from '../screens/ReactionListScreen/ReactionListScreen';
import CreateStoryScreen from '../v4/screen/CreateStory/CreateStoryScreen';
import Home from '../screens/Home';
import AmitySocialUIKitV4Navigator from '../v4/ila-26/routes/AmitySocialUIKitV4Navigator';
import UserPendingRequest from '../v4/screen/UserPendingRequest/UserPendingRequest';
import FollowerList from '../v4/screen/FollowerList/FollowerList';
import CreateLivestream from '../screens/CreateLivestream/CreateLivestream';
import LivestreamPlayer from '../screens/LivestreamPlayer';

export default function SocialNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { isConnected } = useAuth();
  const theme = useTheme() as MyMD3Theme;

  const styles = useStyles();
  return (
    <NavigationContainer independent={true}>
      {isConnected && (
        <Stack.Navigator
          initialRouteName="AmitySocialUIKitV4Navigator"
          screenOptions={{
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: 'white',
            },
            headerTitleStyle: {
              color: theme.colors.base,
            },
          }}
        >
          <Stack.Screen
            name="AmitySocialUIKitV4Navigator"
            component={AmitySocialUIKitV4Navigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import type { RootStackParamList } from './RouteParamList';
import useAuth from '../../hooks/useAuth';
import Explore from '../../../screens/Explore';
import CategoryList from '../../../screens/CategorytList';
import CommunityList from '../../../screens/CommunityList';
import CommunityHome from '../../screen/CommunityHome';
import { CommunitySetting } from '../../../screens/CommunitySetting/index';
import CommunityMemberDetail from '../../../screens/CommunityMemberDetail/CommunityMemberDetail';
import AmitySocialHomePage from '../PublicApi/pages/AmitySocialHomePage/AmitySocialHomePage';
import PostDetail from '../../screen/PostDetail';
import CreatePost from '../../screen/CreatePost';
import UserProfile from '../../screen/UserProfile/UserProfile';
import { EditProfile } from '../../../screens/EditProfile/EditProfile';
import UserProfileSetting from '../../../screens/UserProfileSetting/UserProfileSetting';
import CommunitySearch from '../../../screens/CommunitySearch';
import AllMyCommunity from '../../../screens/AllMyCommunity';
import CreateCommunity from '../../../screens/CreateCommunity';
import PendingPosts from '../../../screens/PendingPosts';
import type { MyMD3Theme } from '../../../providers/amity-ui-kit-provider';
import { Text, useTheme } from 'react-native-paper';
import { Image, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { closeIcon } from '../../../svg/svg-xml-list';
import { useStyles } from '../../../routes/style';
import BackButton from '../../../components/BackButton';
import EditCommunity from '../../../screens/EditCommunity/EditCommunity';
import VideoPlayerFull from '../../../screens/VideoPlayerFullScreen';
import PostTypeChoiceModal from '../../../components/PostTypeChoiceModal/PostTypeChoiceModal';
import CreatePoll from '../../../screens/CreatePoll/CreatePoll';
import ReactionListScreen from '../../../screens/ReactionListScreen/ReactionListScreen';
import CreateStoryScreen from '../../screen/CreateStory/CreateStoryScreen';
import Toast from '../../../components/Toast/Toast';
import AmitySocialGlobalSearchPage from '../../PublicApi/Pages/AmitySocialGlobalSearchPage/AmitySocialGlobalSearchPage';
import UserPendingRequest from '../../screen/UserPendingRequest/UserPendingRequest';
import FollowerList from '../../screen/FollowerList/FollowerList';
import CancelButton from '../../component/CancelButton';
import AmityMyCommunitiesSearchPage from '../../PublicApi/Pages/AmityMyCommunitiesSearchPage/AmityMyCommunitiesSearchPage';
import CreateLivestream from '../../../screens/CreateLivestream/CreateLivestream';
import PostTargetSelection from '../../screen/PostTargetSelection';
import StoryTargetSelection from '../../PublicApi/Pages/AmityStoryTargetSelectionPage/AmityStoryTargetSelectionPage';
import EditPost from '../../screen/EditPost/EditPost';

export const HeaderContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <View
      style={{
        height: 56,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  );
};

export default function AmitySocialUIKitV4Navigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const theme = useTheme() as MyMD3Theme;

  const styles = useStyles();
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: 'white',
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.base,
          },
        }}
      >
        <Stack.Screen
          name="HomeAmity"
          component={AmitySocialHomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AmitySocialGlobalSearchPage"
          component={AmitySocialGlobalSearchPage}
          options={{
            headerShown: false, // Remove the back button
          }}
        />
        <Stack.Screen
          name="AmityMyCommunitiesSearchPage"
          component={AmityMyCommunitiesSearchPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CategoryList"
          component={CategoryList}
          options={({}) => ({
            title: 'Category',
          })}
        />
        <Stack.Screen
          name="CommunityHome"
          component={CommunityHome}
          options={({
            navigation,
            route: {
              params: { communityName, communityId, isModerator },
            },
          }: any) => ({
            header: () => {
              return (
                <HeaderContainer>
                  <BackButton
                    goBack
                    // onPress={() => {
                    //   navigation.navigate('Main');
                    // }}
                  />
                  <Text
                    style={{
                      fontWeight: '700',
                      alignItems: 'center',
                      fontSize: 16,
                    }}
                  >
                    {communityName}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      // Handle button press here
                      navigation.navigate('CommunitySetting', {
                        communityId: communityId,
                        communityName: communityName,
                        isModerator: isModerator,
                      });
                    }}
                  >
                    <Image
                      source={require('../../assets/icon/threeDot.png')}
                      style={styles.dotIcon}
                    />
                  </TouchableOpacity>
                </HeaderContainer>
              );
            },
          })}
        />
        <Stack.Screen
          name="PendingPosts"
          component={PendingPosts}
          options={{ title: 'Pending Posts' }}
        />
        <Stack.Screen
          name="CommunitySearch"
          component={CommunitySearch}
          options={{
            headerShown: false, // Remove the back button
          }}
        />
        <Stack.Screen
          name="CommunityMemberDetail"
          component={CommunityMemberDetail}
          options={{
            header: () => {
              return (
                <HeaderContainer>
                  <BackButton goBack />
                  <Text
                    style={{
                      fontWeight: '700',
                      alignItems: 'center',
                      fontSize: 16,
                    }}
                  >
                    Member
                  </Text>
                  <View style={{ height: 56, width: 20 }}></View>
                </HeaderContainer>
              );
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CommunitySetting"
          component={CommunitySetting}
          options={({
            navigation,
            route: {
              params: { communityName },
            },
          }: any) => ({
            header: () => (
              <HeaderContainer>
                <BackButton goBack />
                <Text
                  style={{
                    fontWeight: '700',
                    alignItems: 'center',
                    fontSize: 16,
                  }}
                >
                  {communityName}
                </Text>
                <View style={{ height: 56, width: 26 }}></View>
              </HeaderContainer>
            ),
          })}
        />
        <Stack.Screen name="CreateCommunity" component={CreateCommunity} />
        <Stack.Screen name="CommunityList" component={CommunityList} />
        <Stack.Screen
          name="AllMyCommunity"
          component={AllMyCommunity}
          options={({
            navigation,
          }: {
            navigation: NativeStackNavigationProp<any>;
          }) => ({
            header: () => {
              return (
                <NavigationContainer>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}
                    style={styles.btnWrap}
                  >
                    <SvgXml
                      xml={closeIcon(theme.colors.base)}
                      width="15"
                      height="15"
                    />
                  </TouchableOpacity>
                </NavigationContainer>
              );
            },
          })}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditPost"
          component={EditPost}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreatePoll"
          component={CreatePoll}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            headerShown: true,
            header: () => (
              <HeaderContainer>
                <BackButton goBack />
              </HeaderContainer>
            ),
          }}
        />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen
          name="EditCommunity"
          component={EditCommunity}
          options={() => ({
            header: () => (
              <HeaderContainer>
                <CancelButton />
                <Text
                  style={{
                    fontWeight: '700',
                    alignItems: 'center',
                    fontSize: 16,
                  }}
                >
                  Edit Profile
                </Text>
                <View style={{ height: 56, width: 56 }}></View>
              </HeaderContainer>
            ),
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="UserProfileSetting"
          component={UserProfileSetting}
        />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayerFull}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserPendingRequest"
          component={UserPendingRequest}
          options={{
            title: 'Follow Requests',
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="FollowerList"
          component={FollowerList}
          options={({
            route: {
              params: { displayName },
            },
          }: any) => ({
            header: () => (
              <HeaderContainer>
                <BackButton />
                <Text
                  style={{
                    fontWeight: '700',
                    alignItems: 'center',
                    fontSize: 16,
                  }}
                >
                  {displayName}
                </Text>
                <View style={{ height: 56, width: 20 }}></View>
              </HeaderContainer>
            ),
          })}
        />
        <Stack.Group
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        >
          <Stack.Screen
            name="ReactionList"
            component={ReactionListScreen}
            options={{
              headerShown: true,
              headerLeft: () => <BackButton />,
              header: () => (
                <HeaderContainer>
                  <BackButton goBack />
                  <Text
                    style={{
                      fontWeight: '700',
                      alignItems: 'center',
                      fontSize: 16,
                    }}
                  >
                    Reactions
                  </Text>
                  <View style={{ height: 56, width: 20 }}></View>
                </HeaderContainer>
              ),
            }}
          />
          <Stack.Screen name="CreateStory" component={CreateStoryScreen} />
          <Stack.Screen
            name="PostTargetSelection"
            component={PostTargetSelection}
          />
          <Stack.Screen
            name="StoryTargetSelection"
            component={StoryTargetSelection}
          />
          <Stack.Screen
            name="CreateLivestream"
            component={CreateLivestream}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
      <PostTypeChoiceModal />
      <Toast />
    </>
  );
}

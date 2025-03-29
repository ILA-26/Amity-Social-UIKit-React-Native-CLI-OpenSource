import { CommunityRepository } from '@amityco/ts-sdk-react-native';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { MyMD3Theme } from '~/providers/amity-ui-kit-provider';
import FloatingButton from '../../../../../components/FloatingButton';
import Explore from '../../../../../screens/Explore';
import NewsFeedLoadingComponent from '../../../../component/NewsFeedLoadingComponent/NewsFeedLoadingComponent';
import { ComponentID, ElementID, PageID } from '../../../../enum/enumUIKitID';
import { useUiKitConfig } from '../../../../hook';
import { useBehaviour } from '../../../../providers/BehaviourProvider';
import CustomSocialTab from '../../../components/CustomSocialTab/CustomSocialTab';
import {
  default as AmityEmptyNewsFeedComponent,
  default as AmityNewsFeedComponent,
} from '../../Components/AmityNewsFeedComponent/AmityNewsFeedComponent';
import AmitySocialHomeTopNavigationComponent from '../../Components/AmitySocialHomeTopNavigationComponent/AmitySocialHomeTopNavigationComponent';

import externalSlice from '../../../../../redux/slices/externalSlice';

LogBox.ignoreAllLogs(true);

const AmitySocialHomePage = () => {
  const theme = useTheme() as MyMD3Theme;
  const { AmitySocialHomePageBehaviour } = useBehaviour();

  const [newsFeedTab] = useUiKitConfig({
    page: PageID.social_home_page,
    component: ComponentID.WildCardComponent,
    element: ElementID.newsfeed_button,
    keys: ['text'],
  }) as string[];
  const [exploreTab] = useUiKitConfig({
    page: PageID.social_home_page,
    component: ComponentID.WildCardComponent,
    element: ElementID.explore_button,
    keys: ['text'],
  }) as string[];
  // const [myCommunitiesTab] = useUiKitConfig({
  //   page: PageID.social_home_page,
  //   component: ComponentID.WildCardComponent,
  //   element: ElementID.my_communities_button,
  //   keys: ['text'],
  // }) as string[];

  const [activeTab, setActiveTab] = useState<string>(newsFeedTab);
  const [myCommunities, setMyCommunities] = useState<Amity.Community[]>(null);
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = CommunityRepository.getCommunities(
      { membership: 'member', limit: 20 },
      ({ data, error, loading }) => {
        if (error) return;
        setPageLoading(loading);
        if (!loading) setMyCommunities(data);
      }
    );
    return () => unsubscribe();
  }, []);

  const onTabChange = useCallback(
    (tabName: string) => {
      if (AmitySocialHomePageBehaviour.onChooseTab)
        return AmitySocialHomePageBehaviour.onChooseTab(tabName);
      setActiveTab(tabName);
    },
    [AmitySocialHomePageBehaviour]
  );

  const onPressExploreCommunity = useCallback(() => {
    onTabChange(exploreTab);
  }, [exploreTab, onTabChange]);

  const renderNewsFeed = () => {
    if (pageLoading) return <NewsFeedLoadingComponent />;
    if (activeTab === exploreTab) return <Explore />;
    if (!myCommunities?.length)
      return (
        <AmityEmptyNewsFeedComponent
          pageId={PageID.social_home_page}
          onPressExploreCommunity={onPressExploreCommunity as any}
        />
      );
    if (activeTab === newsFeedTab) {
      return <AmityNewsFeedComponent pageId={PageID.social_home_page} />;
    }
    // if (activeTab === myCommunitiesTab)
    //   return (
    //     // <AmityMyCommunitiesComponent
    //     //   pageId={PageID.social_home_page}
    //     //   componentId={ComponentID.my_communities}
    //     // />

    //     <NavigationContainer independent>
    //       <AppsTab />
    //     </NavigationContainer>
    //   );
    return null;
  };
  const { updatePopUpState } = externalSlice.actions;

  const dispatch = useDispatch();
  const handleOnPressPostBtn = () => {
    dispatch(updatePopUpState(true));
  };
  return (
    <SafeAreaView
      testID="social_home_page"
      accessibilityLabel="social_home_page"
      id="social_home_page"
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: theme.colors.background,
      }}
      edges={['left', 'right']}
    >
      <AmitySocialHomeTopNavigationComponent activeTab={activeTab} />
      <CustomSocialTab
        tabNames={[newsFeedTab, exploreTab]}
        onTabChange={onTabChange}
        activeTab={activeTab}
      />
      {renderNewsFeed()}
      <FloatingButton onPress={handleOnPressPostBtn} isGlobalFeed={false} />
    </SafeAreaView>
  );
};

export default React.memo(AmitySocialHomePage);

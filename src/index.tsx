import { NativeModules, Platform } from 'react-native';
import AmityUiKitProvider from './providers/amity-ui-kit-provider';
import { default as Ila26Social } from './v4/ila-26/routes/AmitySocialUIKitV4Navigator';
import AmityUiKitSocial from './routes/SocialNavigator';
import {
  AmityStoryTabComponent,
  AmityCreateStoryPage,
  AmityDraftStoryPage,
  AmityViewStoryPage,
  AmitySocialHomePage,
  AmitySocialHomeTopNavigationComponent,
  AmityCommunitySearchResultComponent,
  AmitySocialGlobalSearchPage,
  AmityTopSearchBarComponent,
  AmityEmptyNewsFeedComponent,
  AmityGlobalFeedComponent,
  AmityMyCommunitiesComponent,
  AmityNewsFeedComponent,
  AmityPostContentComponent,
  AmityPostDetailPage,
  AmityPostTargetSelectionPageType,
} from './v4';
import { AmityStoryTabComponentEnum } from './v4/PublicApi/types';

const LINKING_ERROR =
  `The package 'amity-react-native-social-ui-kit' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AmityReactNativeSocialUiKit = NativeModules.AmityReactNativeSocialUiKit
  ? NativeModules.AmityReactNativeSocialUiKit
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return AmityReactNativeSocialUiKit.multiply(a, b + 2 + 3);
}
export {
  AmityUiKitProvider,
  AmityUiKitSocial,
  AmityStoryTabComponent,
  AmityStoryTabComponentEnum,
  Ila26Social,
  AmityCreateStoryPage,
  AmityDraftStoryPage,
  AmityViewStoryPage,
  AmitySocialHomePage,
  AmitySocialHomeTopNavigationComponent,
  AmityCommunitySearchResultComponent,
  AmitySocialGlobalSearchPage,
  AmityTopSearchBarComponent,
  AmityEmptyNewsFeedComponent,
  AmityGlobalFeedComponent,
  AmityMyCommunitiesComponent,
  AmityNewsFeedComponent,
  AmityPostContentComponent,
  AmityPostDetailPage,
  AmityPostTargetSelectionPageType,
};

import * as React from 'react';
import {
  CategoryRepository,
  CommunityRepository,
} from '@amityco/ts-sdk-react-native';
import { useState, useEffect, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';

import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useAuth from '../../hooks/useAuth';
import { SvgXml } from 'react-native-svg';
import { communityIcon } from '../../svg/svg-xml-list';

const ACCUEIL = 'Accueil';

export default function Explore() {
  const styles = useStyles();
  const { apiRegion } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [recommendCommunityList, setRecommendCommunityList] = useState<
    Amity.Community[]
  >([]);
  // const [trendingCommunityList, setTrendingCommunityList] = useState<
  //   Amity.Community[]
  // >([]);
  const [categoryList, setCategoryList] = useState<Amity.Category[]>([]);

  const parseOrderFromDescription = useCallback(
    (description: string | undefined): number => {
      if (!description) return Infinity;
      const match = description.match(/<!--order:(\d+)-->/);
      return match ? parseInt(match[1], 10) : Infinity;
    },
    []
  );

  const sortedCommunities = recommendCommunityList.sort((a, b) => {
    return (
      parseOrderFromDescription(a.description) -
      parseOrderFromDescription(b.description)
    );
  });

  const loadRecommendCommunities = () => {
    if (!energieCategoryId) return;
    const unsubscribe = CommunityRepository.getCommunities(
      {
        categoryId: energieCategoryId,
        limit: 6,
      },
      ({ data: recommendCommunities }) => {
        const list = recommendCommunities.sort((a, b) => {
          return (
            parseOrderFromDescription(a.description) -
            parseOrderFromDescription(b.description)
          );
        });
        setRecommendCommunityList(list);
      }
    );
    unsubscribe();
  };

  const energieCategoryId = React.useMemo(
    () => categoryList?.find((item) => item.name === ACCUEIL)?.categoryId,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoryList.length]
  );

  // const loadTrendingCommunities = async () => {
  //   CommunityRepository.getTrendingCommunities(
  //     { limit: 8 },
  //     ({ data, loading, error }) => {
  //       if (error) return;
  //       if (!loading) {
  //         setTrendingCommunityList(data);
  //       }
  //     }
  //   );
  // };
  const loadCategories = async () => {
    CategoryRepository.getCategories(
      { sortBy: 'name', limit: 8 },
      ({ data }) => {
        if (data) {
          data.sort((a, b) => b.name.localeCompare(a.name));
          setCategoryList(data);
        }
      }
    );
  };
  const handleCategoryListClick = () => {
    setTimeout(() => {
      navigation.navigate('CategoryList');
    }, 100);
  };
  const handleCommunityClick = (communityId: string, communityName: string) => {
    setTimeout(() => {
      navigation.navigate('CommunityHome', { communityId, communityName });
    }, 100);
  };
  useEffect(() => {
    loadCategories();
    // loadTrendingCommunities();
    // loadRecommendCommunities();
  }, []);
  useEffect(() => {
    loadRecommendCommunities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryList]);
  const handleCategoryClick = useCallback(
    (categoryId: string, categoryName: string) => {
      setTimeout(() => {
        navigation.navigate('CommunityList', { categoryId, categoryName });
      }, 100);
    },
    [navigation]
  );

  const renderCategoryList = useCallback(() => {
    return (
      <View style={styles.wrapContainer}>
        {categoryList.map((category) => {
          return (
            <TouchableOpacity
              style={styles.rowContainer}
              key={category.categoryId}
              onPress={() =>
                handleCategoryClick(category.categoryId, category.name)
              }
            >
              <Image
                style={styles.avatar}
                source={
                  category.avatarFileId
                    ? {
                        uri: `https://api.${apiRegion}.amity.co/api/v3/files/${category.avatarFileId}/download`,
                      }
                    : require('../../../assets/icon/Placeholder.png')
                }
              />
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.columnText}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }, [apiRegion, categoryList, handleCategoryClick, styles]);

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.recommendContainer}>
        <Text style={styles.title}>Recommandées pour vous</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recommendCommunityList.map((community) => (
            <TouchableOpacity
              key={community.communityId}
              style={styles.card}
              onPress={() =>
                handleCommunityClick(
                  community.communityId,
                  community.displayName
                )
              }
            >
              {community.avatarFileId ? (
                <Image
                style={styles.bg}
                  source={{
                    uri: `https://api.${apiRegion}.amity.co/api/v3/files/${community.avatarFileId}/download`,
                  }}
                />
              ) : (
                <View      style={{...styles.bg, backgroundColor : "#c5c5c5"}} />
              )}
      <View style={{paddingHorizontal : 15, paddingBottom : 6}}>

              <Text style={styles.name}>{community.displayName}</Text>
              <Text style={styles.recommendSubDetail}>
                {community.membersCount} members
              </Text>
      </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View> */}
      <View style={styles.trendingContainer}>
        <Text style={styles.title}>Recommandées pour vous</Text>
        <View>
          {sortedCommunities.map((community, index) => (
            <TouchableOpacity
              key={community.communityId}
              style={styles.itemContainer}
              onPress={() =>
                handleCommunityClick(
                  community.communityId,
                  community.displayName
                )
              }
            >
              {community.avatarFileId ? (
                <Image
                  style={styles.avatar}
                  source={
                    community.avatarFileId
                      ? {
                          uri: `https://api.${apiRegion}.amity.co/api/v3/files/${community.avatarFileId}/download`,
                        }
                      : require('../../../assets/icon/Placeholder.png')
                  }
                />
              ) : (
                <SvgXml
                  xml={communityIcon}
                  style={styles.avatar}
                  width={40}
                  height={40}
                />
              )}

              <View style={styles.trendingTextContainer}>
                <Text style={styles.number}>{index + 1}</Text>
                <View style={styles.memberContainer}>
                  <View style={styles.memberTextContainer}>
                    <Text style={styles.memberText}>
                      {community.displayName}
                    </Text>
                    <Text style={styles.memberCount}>
                      {community.membersCount} members
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.categoriesContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Catégories</Text>
          <TouchableOpacity onPress={handleCategoryListClick}>
            <Image
              source={require('../../../assets/icon/arrowRight.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
        {renderCategoryList()}
      </View>
    </ScrollView>
  );
}

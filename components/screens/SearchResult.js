import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {windowWidth, windowHeight} from '../utils/Dimensions';
import ModalPicker from '../utils/ModalPicker';

const SearchResultScreen = ({route, navigation}) => {
  const {
    searchValue,
    sections,
    articles,
    allSections,
    searchKey,
  } = route.params;
  const [getSections, setSections] = useState('');
  const [getArticle, setArticle] = useState('');
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const changeSearchModalVisibility = bool => {
    setIsSearchModalVisible(bool);
  };

  const storeData = async searchKey => {
    try {
      const jsonValue = JSON.stringify(searchKey);
      await AsyncStorage.setItem('SearchKey', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    console.log('section', sections);
    console.log('search val', searchValue);

    const value = sections.filter(item =>
      searchValue.some(o2 => item.id === o2.chapter_section_id),
    );

    const article = articles.filter(item =>
      value.some(o2 => item.chapter_section_id === o2.id),
    );

    setSections(value);
    setArticle(article);
    storeData(searchKey);
  }, [searchValue, sections, searchKey]);

  const keyExtractor = item => String(item.id);
  console.log('articles', getArticle);

  return (
    <View style={{flex: 1}}>
      <View>
        <Header
          statusBarProps={{
            barStyle: 'light-content',
            translucent: true,
            backgroundColor: '#006400',
          }}
          backgroundColor="#006400">
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="arrow-left"
                size={25}
                color="white"
                onPress={() => navigation.goBack()}
              />
            </TouchableOpacity>
            <View
              style={{
                width: windowWidth - 60,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: 'white',
                  marginTop: -5,
                }}>
                Search Results
              </Text>
            </View>
          </View>
        </Header>
      </View>

      <View style={{flex: 0.92}}>
        <ScrollView style={{flex: 1}}>
          {getSections ? (
            getSections
              .sort((a, b) => {
                return a.id - b.id;
              })
              .map(item => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.container]}
                    onPress={() =>
                      navigation.navigate('SearchArticle', {
                        article: getArticle,
                        articles: articles,
                        sections: sections,
                        items: item,
                        allSections: getSections,
                      })
                    }>
                    <Text style={styles.name}>
                      {item.section_no}{' '}
                      <Text style={{marginLeft: 10}}>{item.section_title}</Text>
                    </Text>
                  </TouchableOpacity>
                );
              })
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: windowHeight / 2 - 70,
              }}>
              <ActivityIndicator size="large" color="#FF0000" />
            </View>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 0.08,
          backgroundColor: '#FF0000',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 0.8,
            alignItems: 'center',
            justifyContent: 'center',
            borderRightWidth: 1,
            borderColor: 'white',
          }}>
          <Text style={{color: 'white', fontSize: 18}}>
            Tap on any Item to Proceed
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => changeSearchModalVisibility(true)}
          style={{flex: 0.2, alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Icon name="search" size={25} color="white" />
            <Text style={{fontSize: 12, color: 'white'}}>Search</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isSearchModalVisible}
        nRequestClose={() => changeSearchModalVisibility(false)}>
        <ModalPicker
          changeModalVisibility={changeSearchModalVisibility}
          articles={articles}
          navigation={navigation}
          sections={sections}
          allSections={allSections}
        />
      </Modal>
    </View>
  );
};

export default SearchResultScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A9CCE3',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#f4f4f6',
    height: 54,
  },
  name: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  pointsContainer: {
    borderRadius: 8,
    backgroundColor: '#44c282',
    padding: 8,
  },
  points: {
    color: 'white',
    fontWeight: 'bold',
  },
});

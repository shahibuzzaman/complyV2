import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import ModalPicker from '../utils/ModalPicker';
import HTML from 'react-native-render-html';
import ShopContext from '../context/shop-context';
import {windowWidth} from '../utils/Dimensions';
import {AddCartContext, CartContext} from '../context/favourite-context';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const ArticleScreen = ({route, navigation}) => {
  const {
    article,
    articles,
    law,
    items,
    sections,
    chapters,
    indexChapter,
    allSections,
    fav,
  } = route.params;
  console.log('bhbh', allSections.length);
  const context = React.useContext(ShopContext);
  const addItems = useContext(AddCartContext);
  const favItems = useContext(CartContext);
  const [currentFont, setCurrentFont] = useState(20);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [index, setIndex] = useState(null);
  const [newArticle, setNewArticle] = useState('');
  const [newSection, setNewSection] = useState('');
  const [prevSection, setPrevSection] = useState('');

  const changeModalVisibility = bool => {
    setIsModalVisible(bool);
  };

  useEffect(() => {
    if (allSections && items && articles && chapters) {
      const index = allSections.findIndex(obj => obj.id === items.id);
      setIndex(index);

      console.log('ooo', items);

      const nextArticle =
        articles && items
          ? articles.filter(item => {
              return item.chapter_section_id === items.id;
            })
          : null;

      setNewArticle(nextArticle);

      const sectionsItems =
        sections && chapters
          ? sections
              .filter(item => {
                if (indexChapter === chapters.length - 1) {
                  return item.law_chapter_id === chapters[indexChapter].id;
                }
                return item.law_chapter_id === chapters[indexChapter + 1].id;
              })
              .map(item => item)
              .sort((a, b) => {
                return parseInt(a.print_serial) - parseInt(b.print_serial);
              })
          : null;

      console.log('next-data', indexChapter);

      const prevSectionsItems =
        sections && chapters
          ? sections
              .filter(item => {
                if (indexChapter === 0) {
                  return item.law_chapter_id === chapters[indexChapter].id;
                }
                return item.law_chapter_id === chapters[indexChapter - 1].id;
              })
              .map(item => item)
              .sort((a, b) => {
                return parseInt(a.print_serial) - parseInt(b.print_serial);
              })
          : null;

      console.log('prev-Data', prevSectionsItems);
      setNewSection(sectionsItems);
      setPrevSection(prevSectionsItems);
    }
  }, [allSections, items, articles, chapters]);

  console.log('fav', favItems.id);
  console.log('fav2', items);

  const favIcon = favItems.filter(x => x.id === items.id);

  console.log('icon', favIcon);

  const keyExtractor = item => String(item.id);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
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
              <Icon2
                name="arrow-left"
                size={25}
                color="white"
                onPress={() =>
                  fav ? navigation.navigate('Details') : navigation.goBack()
                }
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
                adjustsFontSizeToFit
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: currentFont,
                }}
                onTextLayout={e => {
                  const {lines} = e.nativeEvent;
                  if (lines.length > 1) {
                    setCurrentFont(currentFont - 2);
                  }
                }}>
                {law
                  ? law.law_title
                  : fav
                  ? 'Favourite Article'
                  : 'Search Results'}
              </Text>
            </View>
          </View>
        </Header>
      </View>
      <View
        style={{
          flex: 0.08,
          backgroundColor: '#A9CCE3',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <Text
          numberOfLines={2}
          style={{marginLeft: 10, fontSize: 16, fontWeight: 'bold'}}>
          {items.section_no} {items.section_title}
        </Text>
      </View>
      <View style={{flex: 0.84, padding: 10}}>
        {newArticle ? (
          <FlatList
            data={newArticle}
            renderItem={({item}) => (
              <View key={item.id}>
                {item.published_status == 'Y' ? (
                  <ReactNativeZoomableView
                    maxZoom={1.5}
                    minZoom={1}
                    zoomStep={0.5}
                    initialZoom={1}
                    bindToBorders={true}>
                    <HTML
                      source={{
                        html: item.articles
                          .replace(/<p><\/p>/g, '')
                          .replace(/<p>&nbsp;<\/p>/g, ''),
                      }}
                    />
                  </ReactNativeZoomableView>
                ) : null}
              </View>
            )}
            keyExtractor={keyExtractor}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <ActivityIndicator size="large" color="#006400" />
          </View>
        )}
      </View>
      <View
        style={{
          flex: 0.08,
          backgroundColor: '#FF0000',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          disabled={favIcon.length}
          style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => addItems(items)}>
          {favIcon.length ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="heart-o" size={25} color="white" />
              <Text style={{fontSize: 12, color: 'white'}}>Favourite</Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Icon name="heart" size={25} color="white" />
              <Text style={{fontSize: 12, color: 'white'}}>Favourite</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 0.2, alignItems: 'center'}}
          disabled={index === 0 && indexChapter === 0}
          onPress={() => {
            if (index === 0 && indexChapter !== 0) {
              Alert.alert(
                'Want to back to Previous Chapter?',
                'Press "OK" to continue.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate('Article', {
                        article: newArticle,
                        articles: articles,
                        law: law,
                        sections: sections,
                        items: prevSection.slice(-1).pop(),
                        chapters: chapters,
                        allSections: prevSection,
                        indexChapter: indexChapter - 1,
                      });
                    },
                  },
                ],
              );
            } else {
              navigation.navigate('Article', {
                items: allSections[index - 1],
                article: newArticle,
              });
            }
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              name="angle-left"
              size={30}
              color={index === 0 && indexChapter === 0 ? 'green' : 'white'}
            />
            <Text style={{fontSize: 12, color: 'white'}}>Previous</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 0.2, alignItems: 'center'}}
          onPress={() => navigation.navigate('Home')}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="home" size={30} color="white" />
            <Text style={{fontSize: 12, color: 'white'}}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={
            index === allSections.length - 1 &&
            indexChapter === chapters.length - 1
          }
          style={{flex: 0.2, alignItems: 'center'}}
          onPress={() => {
            if (index === allSections.length - 1) {
              Alert.alert(
                'Want to proceed to Next Chapter?',
                'Press "OK" to continue.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate('Article', {
                        article: newArticle,
                        articles: articles,
                        law: law,
                        sections: sections,
                        items: newSection[0],
                        chapters: chapters,
                        allSections: newSection,
                        indexChapter: indexChapter + 1,
                      });
                    },
                  },
                ],
              );
            } else {
              navigation.navigate('Article', {
                items: allSections[index + 1],
                article: newArticle,
                articles: articles,
                allSections: allSections,
                law: law,
                sections: sections,
              });
            }
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              name="angle-right"
              size={30}
              color={
                index === allSections.length - 1 &&
                indexChapter === chapters.length - 1
                  ? 'green'
                  : 'white'
              }
            />
            <Text style={{fontSize: 12, color: 'white'}}>Next</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeModalVisibility(true)}
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
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          nRequestClose={() => changeModalVisibility(false)}>
          <ModalPicker
            changeModalVisibility={changeModalVisibility}
            articles={articles}
            navigation={navigation}
            sections={sections}
            allSections={allSections}
          />
        </Modal>
      </View>
    </View>
  );
};

export default ArticleScreen;

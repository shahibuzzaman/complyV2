import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {Header} from 'react-native-elements';
import Accordion from '../utils/accordion/Accordion';
import {windowWidth} from '../utils/Dimensions';
import Icon from 'react-native-vector-icons/Feather';
import ResponsiveText from '../utils/ResponsiveText';
import ModalPicker from '../utils/ModalPicker';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Compliance.db'});

const ChapterScreen = ({route, navigation}) => {
  const {law, lawArticles, lawChapters, lawSections} = route.params;
  // console.log('lawChapters344', lawArticles);
  const [chapters, setChapters] = useState([]);
  const [sections, setSections] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  const changeSearchModalVisibility = bool => {
    setIsSearchModalVisible(bool);
  };

  const [currentFont, setCurrentFont] = useState(20);

  const law_chapter_get = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM law_chapters', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setChapters(temp);
      });
    });
  };

  const law_section_get = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM chapter_sections', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setSections(temp);
      });
    });
  };

  const law_article_get = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM articles', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setArticles(temp);
      });
    });
  };

  useEffect(() => {
    law_chapter_get();
    law_section_get();
    law_article_get();
  }, []);

  // console.log('kkk', sections);
  // console.log('mmm', articles);
  const chapterItems =
    chapters && law
      ? chapters
          .filter(item => {
            return item.compliance_law_id === law.id;
          })
          .map(item => item)
          .sort((a, b) => {
            return parseInt(a.print_serial) - parseInt(b.print_serial);
          })
      : null;

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
                {law.law_title}
              </Text>
            </View>
          </View>
        </Header>
      </View>

      <View style={{flex: 0.92}}>
        {chapters.length && sections.length && articles.length ? (
          <Accordion
            chapters={chapterItems}
            sections={sections}
            articles={articles}
            navigation={navigation}
            law={law}
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
        <View
          style={{
            flex: 0.8,
            alignItems: 'center',
            justifyContent: 'center',
            borderRightWidth: 1,
            borderColor: 'white',
          }}>
          <Text style={{color: 'white', fontSize: 18}}>
            Tap on any Item to Proced
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
          allSections={sections}
        />
      </Modal>
    </View>
  );
};

export default ChapterScreen;

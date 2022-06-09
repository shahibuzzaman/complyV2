import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Compliance.db'});

import {windowWidth, windowHeight} from './Dimensions';

const ModalPicker = props => {
  const options = ['red', 'blue', 'yellow', 'green'];
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [dbSearchValue, setDbSearchValue] = useState('');
  const [clearButtonVisible, setClearButtonVisible] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [sections, setSections] = useState([]);
  const [articles, setArticles] = useState([]);

  const onPressItem = item => {
    props.changeModalVisibility(false);
  };

  const searchInput = value => {
    if (value) {
      setSearch(value);
      setClearButtonVisible(true);
    }
  };

  const filterFromArticle = () => {
    var data_filter = props.articles.filter(item =>
      item.articles.toLowerCase().includes(`${search.toLowerCase()}`),
    );
    const s_id = uuid.v4();
    if (search !== null) {
      db.transaction(function (tx) {
        tx.executeSql('INSERT INTO search_history ( search_value) VALUES (?)', [
          search,
        ]);
      });
    }
    props.navigation.push('SearchResult', {
      searchValue: data_filter,
      sections: props.sections,
      articles: props.articles,
      allSections: props.allSections,
      searchKey: search,
    });
    props.changeModalVisibility(false);
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('SearchKey');
      if (value !== null) {
        console.log('abcd', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM search_history', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setDbSearchValue(temp);
      });
    });
  }, []);

  // const sortedSearchHistory = dbSearchValue.sort(
  //   (a, b) => b.search_id - a.search_id,
  // );

  // console.log('sVal2', sortedSearchHistory);

  var searchHistory = [
    ...new Map(
      dbSearchValue ? dbSearchValue.map(x => [x.search_value, x]) : null,
    ).values(),
  ];

  return (
    <TouchableOpacity
      onPress={() => props.changeModalVisibility(false)}
      style={styles.container}>
      <TouchableOpacity
        onPress={() => props.changeModalVisibility(true)}
        style={[
          styles.modal,
          {width: windowWidth - 20, height: windowHeight / 3, opacity: 1},
        ]}>
        <View
          style={{
            flex: 0.3,
            marginTop: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: 20,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              backgroundColor: 'gray',
              borderRadius: 10,
            }}>
            <Icon name="search" size={25} style={{marginLeft: 10}} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="white"
              value={search}
              style={{
                marginHorizontal: 10,
                fontSize: 14,
                fontWeight: 'bold',
                color: 'white',
                flex: 1,
              }}
              onChangeText={value => searchInput(value)}
            />
            {search.length ? (
              <TouchableOpacity>
                <Icon
                  name="close-circle-outline"
                  size={25}
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              marginLeft: 10,
              height: 50,
              width: 50,
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#006400',
                width: 50,
                height: 50,
                borderRadius: 100,
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={filterFromArticle}>
              <View
                style={{
                  backgroundColor: '#FF0000',
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  GO
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 0.7}}>
          <ScrollView style={{flex: 1}}>
            {searchHistory.length !== 0 ? (
              searchHistory
                .sort((a, b) => {
                  return b.search_id - a.search_id;
                })
                .slice(0, 20)
                .map(item => {
                  return (
                    <TouchableOpacity
                      key={item.search_id}
                      style={{
                        padding: 10,
                      }}
                      onPress={() => searchInput(item.search_value)}>
                      <Text
                        style={{fontSize: 16, color: 'white', marginLeft: 20}}>
                        {item.search_value}
                      </Text>
                    </TouchableOpacity>
                  );
                })
            ) : (
              <Text style={{textAlign: 'center', color: 'white'}}>
                No history found.
              </Text>
            )}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ModalPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modal: {
    backgroundColor: 'green',
    borderRadius: 10,
  },
  option: {
    alignItems: 'flex-start',
  },
  text: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

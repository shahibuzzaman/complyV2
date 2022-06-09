import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import ShopContext from '../context/shop-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CartContext,
  RemoveCartContext,
  AddCartContext,
} from '../context/favourite-context';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Compliance.db'});

const DetailsScreen = ({navigation}) => {
  const context = React.useContext(ShopContext);
  const [articles, setArticles] = useState([]);
  const [sections, setSections] = useState([]);

  const items = useContext(CartContext);
  const removeItem = useContext(RemoveCartContext);
  const [cartTotal, setCartTotal] = useState(0);
  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);

  const addItems = useContext(AddCartContext);

  console.log('items', items);

  useEffect(async () => {
    try {
      setIsInitiallyFetched(true);
      const value = JSON.parse(await AsyncStorage.getItem('Cart'));
      if (value !== null) {
        addItems(value);

        console.log('val', value);
      }
    } catch (e) {
      // error reading value
    }
  }, []);

  useEffect(async () => {
    try {
      if (isInitiallyFetched) {
        const jsonValue = JSON.stringify(items);
        await AsyncStorage.setItem('Cart', jsonValue);
        console.log('222', jsonValue.length);
      }
    } catch (e) {
      // saving error
    }
  }, [items]);

  var result = [...new Map(items.map(x => [x.id, x])).values()];

  useEffect(() => {
    console.log(context);

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM articles', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setArticles(temp);
      });
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM chapter_sections', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setSections(temp);
      });
    });
  }, [items]);

  // const article =
  //   articles && items
  //     ? articles
  //         .filter(item => {
  //           return item.chapter_section_id === items.id;
  //         })
  //         .map(item => item)
  //     : null;

  const keyExtractor = item => String(item.id);
  return (
    <View style={{flex: 1}}>
      <View>
        <Header
          statusBarProps={{
            barStyle: 'light-content',
            translucent: true,
            backgroundColor: '#006400',
          }}
          backgroundColor="#006400"
          leftComponent={
            <TouchableOpacity>
              <Icon
                name="menu"
                size={25}
                color="white"
                onPress={() => navigation.openDrawer()}
              />
            </TouchableOpacity>
          }
          centerComponent={{
            text: 'Favourites',
            style: {color: '#fff', fontSize: 20},
          }}
          containerStyle={{
            backgroundColor: '#006400',
            justifyContent: 'space-around',
          }}
        />
      </View>

      <View style={{flex: 0.92}}>
        <FlatList
          data={result}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={[styles.container]}
                onPress={() =>
                  navigation.navigate('SearchArticle', {
                    articles: articles,
                    items: item,
                    allSections: result,
                    sections: sections,
                    fav: item,
                  })
                }>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={styles.name}>
                    {item.section_no}{' '}
                    <Text style={{marginLeft: 10}}>{item.section_title}</Text>
                  </Text>
                </View>

                <View style={styles.pointsContainer}>
                  <TouchableOpacity>
                    <Icon
                      name="x"
                      size={20}
                      color="white"
                      onPress={() => removeItem(item)}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={keyExtractor}
        />
      </View>
      <View
        style={{
          flex: 0.08,
          backgroundColor: '#FF0000',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 18}}>
          Tap on any Item to Proceed
        </Text>
      </View>
    </View>
  );
};

export default DetailsScreen;

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
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  pointsContainer: {
    borderRadius: 100,
    backgroundColor: '#FF0000',
    padding: 1,
    flex: 0.06,
  },
  points: {
    color: 'white',
    fontWeight: 'bold',
  },
});

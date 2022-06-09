import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import TrialModal from '../utils/TrialModal';
import SubscribeModal from '../utils/SubscribeModal';
import SubscriptionEndModal from '../utils/SubscriptionEndModal';
import {useNetInfo} from '@react-native-community/netinfo';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Compliance.db'});

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const LawScreen = ({
  navigation,
  laws,
  articles,
  chapters,
  sections,
  dbUser,
  getDateTime,
  setChapters,
  setArticles,
  setSections,
}) => {
  let [allLaws, setAllLaws] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubscribeModalVisible, setIsSubscribeModalVisible] = useState(false);
  const [isSubscribeEndModalVisible, setIsSubscribeEndModalVisible] = useState(
    false,
  );

  const changeModalVisibility = bool => {
    setIsModalVisible(bool);
  };

  const changeSubscribeModalVisibility = bool => {
    setIsSubscribeModalVisible(bool);
  };

  const changeSubscribeEndModalVisibility = bool => {
    setIsSubscribeEndModalVisible(bool);
  };

  // console.log('user', dbUser);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 5000);
  }, []);

  // const compliance_laws_post = laws => {
  //   if (laws !== null) {
  //     db.transaction(function (tx) {
  //       tx.executeSql('DELETE FROM compliance_laws');

  //       for (var i = 0; i < laws.length; i++) {
  //         tx.executeSql(
  //           'INSERT INTO compliance_laws (id, law_title, law_icon, print_serial, published_status) VALUES (?,?,?,?,?)',
  //           [
  //             laws[i].id,
  //             laws[i].law_title,
  //             laws[i].law_icon,
  //             laws[i].print_serial,
  //             laws[i].published_status,
  //           ],
  //         );
  //       }
  //     });
  //   }
  // };

  // const user_post_to_DB = () => {
  //   db.transaction(function (tx) {
  //     tx.executeSql('DELETE FROM users');

  //     tx.executeSql(
  //       'INSERT INTO users (id, user_name, mobile_no, email_address) VALUES (?,?,?,?)',
  //       [user.id, user.user_name, user.mobile_no, user.email_address],
  //     );
  //   });
  // };

  const compliance_law_get = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM compliance_laws', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setAllLaws(temp);
      });
    });
  };

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

  // useEffect(() => {
  //   if (laws !== null) {
  //     compliance_laws_post(laws);
  //   }
  // }, [laws]);

  useEffect(() => {
    // console.log('user333', dbUser[0].trial_registration_date);

    var expire_date = new Date(dbUser[0].expire_date).getTime();
    var trial_registration_date = new Date(
      dbUser[0].trial_registration_date,
    ).getTime();
    var dateToday = new Date(getDateTime.date).getTime();
    var Difference_In_Expire_Time = Math.round(expire_date - dateToday);
    var Difference_In_Trial_Time = Math.round(
      dateToday - trial_registration_date,
    );
    var Difference_In_Expire_Days =
      Difference_In_Expire_Time / (1000 * 3600 * 24).toString();
    var Difference_In_Trial_Days =
      Difference_In_Trial_Time / (1000 * 3600 * 24).toString();

    // console.log('Difference_In_Trial_Days', Difference_In_Trial_Days);
    // console.log('Difference_In_Expire_Days', Difference_In_Expire_Days);

    if (dbUser.length !== 0 && !loading) {
      if (
        dbUser[0].is_trial == 0 &&
        dbUser[0].status === 'Y' &&
        Difference_In_Expire_Days >= '0'
      ) {
        compliance_law_get();
        law_chapter_get();
        law_section_get();
        law_article_get();
      } else if (
        dbUser[0].status === 'Y' &&
        Difference_In_Expire_Days < '0' === true
      ) {
        changeSubscribeEndModalVisibility(true);
      } else if (
        dbUser[0].status === 'N' &&
        Difference_In_Trial_Days > '7' === true
      ) {
        changeSubscribeModalVisibility(true);
      } else {
        changeModalVisibility(true);
        compliance_law_get();
        law_chapter_get();
        law_section_get();
        law_article_get();
        setDataLoading(false);
      }
    }

    // user_post_to_DB();
  }, [dbUser, loading]);

  const keyExtractor = item => String(item.id);

  console.log('lawdatata', allLaws);

  if (allLaws.length === 0 && !loading) {
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="red" />
    </View>;
  }
  return (
    <SafeAreaView>
      <View style={{margin: 5}}>
        <FlatList
          data={allLaws.sort((a, b) => {
            return parseInt(a.print_serial) - parseInt(b.print_serial);
          })}
          initialNumToRender={allLaws.length}
          renderItem={({item}) => (
            <View>
              {item.published_status == 'Y' ? (
                <TouchableOpacity
                  style={{
                    height: 60,
                    backgroundColor: '#008000',
                    marginBottom: 5,
                    flex: 1,
                    flexDirection: 'row',
                    borderRadius: 5,
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.65,
                    elevation: 4,
                  }}
                  onPress={() =>
                    navigation.push('LawChapter', {
                      law: item,
                      lawArticles: articles,
                      lawChapters: chapters,
                      lawSections: sections,
                    })
                  }>
                  <View style={{flex: 0.2}}>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 5,
                        marginTop: 3,
                        marginBottom: 3,
                        marginRight: 5,
                        backgroundColor: 'white',
                        shadowColor: '#000',
                        borderRadius: 5,
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                      }}>
                      {Object.keys(item.law_icon).length !== 0 ? (
                        <Image
                          style={{height: '100%', width: '100%'}}
                          resizeMode="contain"
                          source={{uri: item.law_icon}}
                        />
                      ) : null}
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 0.8,
                      alignItems: 'baseline',
                      justifyContent: 'center',
                    }}>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={2}
                      style={{
                        marginLeft: 5,
                        marginRight: 5,
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        // color: '#FBB117',
                      }}>
                      {item.law_title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
          keyExtractor={keyExtractor}
        />
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisibility(false)}>
        <TrialModal
          changeModalVisibility={changeModalVisibility}
          navigation={navigation}
          user_id={dbUser[0].id}
        />
      </Modal>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isSubscribeModalVisible}
        nRequestClose={() => changeSubscribeModalVisibility(false)}>
        <SubscribeModal
          changeModalVisibility={changeSubscribeModalVisibility}
          navigation={navigation}
          user_id={dbUser[0].id}
        />
      </Modal>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isSubscribeEndModalVisible}
        nRequestClose={() => changeSubscribeEndModalVisibility(false)}>
        <SubscriptionEndModal
          changeModalVisibility={changeSubscribeEndModalVisibility}
          navigation={navigation}
          user_id={dbUser[0].id}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default LawScreen;

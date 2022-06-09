import React from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';

import List from './List';

const Accordion = ({chapters, sections, articles, navigation, law}) => {
  // console.log('chapter7777', chapters);
  // console.log('chapter123', sections);

  const keyExtractor = item => String(item.id);
  return (
    <ScrollView style={{display: 'flex'}}>
      {chapters
        ? chapters.map(item => {
            return (
              <View key={item.id}>
                {item.published_status == 'Y' ? (
                  <List
                    items={item}
                    sections={sections}
                    navigation={navigation}
                    articles={articles}
                    chapters={chapters}
                    law={law}
                  />
                ) : null}
              </View>
            );
          })
        : null}
    </ScrollView>
  );
};

export default Accordion;

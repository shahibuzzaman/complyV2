import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

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

const ListItem = ({
  items,
  isLast,
  navigation,
  articles,
  sections,
  chapters,
  law,
  allSections,
  indexChapter,
}) => {
  const bottomRadius = isLast ? 8 : 0;

  const [activeContent, setActiveContent] = useState(items.id);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  const article =
    articles && items
      ? articles
          .filter(item => {
            return item.chapter_section_id === activeContent;
          })
          .map(item => item)
      : null;

  // console.log('112233', items);

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() =>
        navigation.navigate('Article', {
          article: article,
          articles: articles,
          law: law,
          sections: sections,
          items: items,
          chapters: chapters,
          allSections: allSections,
          indexChapter: indexChapter,
        })
      }>
      <Text style={styles.name}>
        {items.section_no}{' '}
        <Text style={{marginLeft: 10}}>{items.section_title}</Text>
      </Text>

      {/* <View style={styles.pointsContainer}>
        <Text style={styles.points}>{item.points}</Text>
      </View> */}
    </TouchableOpacity>
  );
};

export default ListItem;

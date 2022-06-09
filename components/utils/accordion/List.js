import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';

import Animated from 'react-native-reanimated';
import {mix, useTransition} from 'react-native-redash/lib/module/v1';
import Chevron from './Chevron';
import ListItem from './ListItem';

const {interpolate} = Animated;
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: 'white',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  items: {
    overflow: 'hidden',
  },
});

const List = ({items, sections, articles, chapters, navigation, law}) => {
  console.log('lll', items);
  console.log('sss', sections);
  const LIST_ITEM_HEIGHT = 54;
  const [open, setOpen] = useState(false);
  const transition = useTransition(open);
  const [indexChapter, setChapterIndex] = useState(null);
  const [newSection, setNewSection] = useState('');

  useEffect(() => {
    if (chapters && items && sections) {
      const index = chapters.findIndex(obj => obj.id === items.id);
      setChapterIndex(index);
      console.log('index', index);

      console.log('ooo', items.id);

      // const sectionsItems =
      //   sections && items
      //     ? sections
      //         .filter(item => {
      //           return item.law_chapter_id === items.id;
      //         })
      //         .map(item => item)
      //         .sort((a, b) => {
      //           return parseInt(a.print_serial) - parseInt(b.print_serial);
      //         })
      //     : null;

      // setNewSection(sectionsItems);

      // const nextArticle =
      //   articles && items
      //     ? articles.filter(item => {
      //         return item.chapter_section_id === items.id;
      //       })
      //     : null;

      // setNewArticle(nextArticle);
    }
  }, [chapters, items, sections]);

  const sectionsItems =
    sections && items
      ? sections
          .filter(item => {
            return item.law_chapter_id === items.id;
          })
          .map(item => item)
          .sort((a, b) => {
            return parseInt(a.print_serial) - parseInt(b.print_serial);
          })
      : null;

  // console.log('uuu', sectionsItems);
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0],
  });

  const height = mix(transition, 0, LIST_ITEM_HEIGHT * sectionsItems.length);
  const keyExtractor = item => String(item.id);

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setOpen(prev => !prev)}>
        <Animated.View style={[styles.container]}>
          <Chevron transition={transition} />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.title}>{items.chapter_no} ::</Text>
            <Text style={styles.title}>{items.chapter_title}</Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, {height}]}>
        {sectionsItems
          ? sectionsItems.map(item => {
              return (
                <View key={item.id}>
                  {item.published_status == 'Y' ? (
                    <ListItem
                      isLast={item.id === sectionsItems.length - 1}
                      items={item}
                      navigation={navigation}
                      articles={articles}
                      sections={sections}
                      chapters={chapters}
                      allSections={sectionsItems}
                      indexChapter={indexChapter}
                      law={law}
                    />
                  ) : null}
                </View>
              );
            })
          : null}
      </Animated.View>
    </View>
  );
};

export default List;

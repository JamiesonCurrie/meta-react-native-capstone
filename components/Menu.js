/*****************************************************************************/
/*****************************************************************************/

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert, StyleSheet
, SectionList, Text, View, SafeAreaView
} from 'react-native';

import { Searchbar } from 'react-native-paper';

import debounce from 'lodash.debounce';

import { API_URL }       from '../utils';
import { themeColours }  from '../styles/styles';

import {
  getMenuItems
, saveMenuItems
, filterByQueryAndCategories
} from '../database';

import Filters       from './Filters';
import MenuItem      from './MenuItem';
import ItemSeparator from './ItemSeparator';

/*****************************************************************************/

const useUpdateEffect = (effect, dependencies = []) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    else {
      return effect();
    }
  }, dependencies);
};

/*****************************************************************************/

const getSectionListData = (data) => {
  const sectionListData = [];

  const sections = data.reduce((a,v) => {
    if (!a[v.category]) {
      a[v.category] = [];
    }
    a[v.category].push({
      id:          v.id
    , name:        v.name
    , price:       v.price
    , description: v.description
    , image:       v.image
    });
    return a;
  }, {});

  const categories = Object.keys(sections) || [];
  for (const category in sections) {
    sectionListData.push({
      title: category
    , data:  [].concat(sections[category])
    });
  }

  return {categories, sectionListData};
};

/*****************************************************************************/

const Menu = () => {
  const [data,             setData]             = useState([]);
  const [searchBarText,    setSearchBarText]    = useState('');
  const [query,            setQuery]            = useState('');
  const [sections,         setSections]         = useState([]);
  const [filterSelections, setFilterSelections] = useState([]);

  const fetchData = async () => {
    let returnData = [];
    try {
      const response = await fetch(API_URL);
      const json     = await response.json();
      returnData     = json.menu.map((v, i) => ({id: i + 1, ...v}));
    }
    catch (e) {
      console.error(e);
    }
    finally {
      return returnData;
    }
  };

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => (
    debounce(lookup, 500)
  ), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });

      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const {sectionListData} = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  useEffect(() => {
    (async () => {
      try {
        let menuItems = await getMenuItems();

        // The application only fetches the menu data once from a remote URL
        // and then stores it into a SQLite database.
        // After that, every application restart loads the menu from the database
        if (!menuItems.length) {
          menuItems = await fetchData();
          saveMenuItems(menuItems);
        }

        menuItems = menuItems.map((v) => {
          v.image = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${v.image}?raw=true`;
          return v;
        });

        const {categories, sectionListData} = getSectionListData(menuItems);
        setSections(categories);
        setData(sectionListData);
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={localStyles.container}>
      <View style={{backgroundColor: themeColours.p1}}>
        <Searchbar
          placeholder='Search'
          placeholderTextColor={themeColours.s4}
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={localStyles.searchBar}
          iconColor={themeColours.s4}
          inputStyle={localStyles.inputText}
          elevation={0}
        />
      </View>
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <SectionList
        style={localStyles.sectionList}
        sections={data}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <MenuItem item={item} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={localStyles.header}>{title}</Text>
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </SafeAreaView>
  );
};

/*****************************************************************************/

const localStyles = StyleSheet.create({
  container: {}
, sectionList: {
    paddingVertical:   24
  , borderColor:       themeColours.s4
  , borderTopWidth:    2
  , borderBottomWidth: 2
  }
, searchBar: {
    flex:              1
  , marginVertical:    24
  , marginHorizontal:  8
  , backgroundColor:   themeColours.s3
  , borderRadius:      0
  , borderColor:       themeColours.s4
  , borderWidth:       1
  , shadowRadius:      0
  , shadowOpacity:     0
  , paddingHorizontal: 8
  }
, inputText: {
    fontSize: 16
  }
, header: {
    fontSize:          14
  , paddingVertical:   8
  , paddingHorizontal: 16
  , marginVertical:    8
  , color:             themeColours.s4
  , backgroundColor:   themeColours.s2
  }
});

/*****************************************************************************/

export default Menu;

/*****************************************************************************/
/*****************************************************************************/
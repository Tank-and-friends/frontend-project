import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {TextField} from '../../components/TextField/TextField';
import TopComponent from '../../components/TopComponent/TopComponent';
import MessageListItem from './components/MessageListItem';
import {
  ConversationInfo,
  SearchAccountResult,
  SenderInfo,
} from '../../models/Message';
import {getListConversations, searchAccount} from '../../apis/MessageApi';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/core';
import {debounce} from 'lodash';
import {getPartnerInfo} from '../../apis/UserApi';

type SectionProps = PropsWithChildren<{}>;

type ParamList = {
  MessageFeaturesStacks: {
    screen: string;
    params: {
      partner: SenderInfo;
    };
  };
};
const MessageScreen = ({}: SectionProps) => {
  const [listConversation, setListConversation] = useState<
    ConversationInfo[] | null
  >();
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchAccountResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchListConversation = () => {
    getListConversations().then(res => {
      setListConversation(res);
    });
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    searchAccount(query).then(res => {
      if (res) {
        setSearchResults(res);
      }
    });
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  useEffect(() => {
    const interval = setInterval(fetchListConversation, 3000);
    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchListConversation();
    }, []),
  );

  const onSearchChange = (text: string) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    Keyboard.dismiss();
  };

  const dismissSearch = () => {
    if (isSearching) {
      clearSearch();
    }
  };

  const handleChooseSearchResult = (parterId: string) => {
    getPartnerInfo(parterId).then(res => {
      if (res) {
        navigation.navigate('MessageFeaturesStacks', {
          screen: 'MessageDetail',
          params: {
            partner: {
              id: parseInt(res.id),
              name: res.name,
              avatar: res.avatar,
            },
          },
        });
        dismissSearch();
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={dismissSearch}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/images/background.png')}
          style={styles.backgroundImage}
          resizeMode="cover">
          <TopComponent title="Tin nhắn" />
          <TextField
            value={searchQuery}
            onChange={onSearchChange}
            prefix={<IonIcons name="search" size={20} />}
            placeholder="Bạn muốn tìm gì ..."
          />

          {isSearching && searchResults.length > 0 && (
            <View style={styles.searchResultsContainer}>
              <FlatList
                data={searchResults}
                renderItem={({item}) => (
                  <Pressable
                    onPress={() => handleChooseSearchResult(item.account_id)}>
                    <View style={{height: 50}}>
                      <Text>{item.first_name + item.last_name}</Text>
                    </View>
                  </Pressable>
                )}
                keyExtractor={({account_id}) => account_id.toString()}
                maxToRenderPerBatch={5}
              />
            </View>
          )}

          <FlatList
            data={listConversation}
            style={styles.listMessage}
            renderItem={({item}) => <MessageListItem item={item} />}
            keyExtractor={({id}) => id.toString()}
          />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  listMessage: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
  searchResultsContainer: {
    position: 'absolute',
    top: 190,
    left: 20,
    right: 20,
    height: 250,
    zIndex: 1000,
    backgroundColor: 'white',
  },
});

export default MessageScreen;

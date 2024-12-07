import AsyncStorage from '@react-native-async-storage/async-storage';
import {ConversationInfo} from '../models/Message';
// import {getDirectImageLink} from '../utils/image';
import axiosInstance from './apiConfig';

const DOMAIN = '/it5023e';

const INFINITE = '10000';

export const getListConversations = async (): Promise<
  ConversationInfo[] | null
> => {
  try {
    const response = await axiosInstance.post(
      `${DOMAIN}/get_list_conversation`,
      {
        token: '3sTYVB',
        index: '0',
        count: INFINITE,
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    // data.avatar = getDirectImageLink(data.avatar);
    console.log('dsfs');
    console.log(response);
    return response.data.conversations;
  } catch (error) {
    return null;
  }
};

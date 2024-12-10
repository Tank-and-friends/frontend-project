import AsyncStorage from '@react-native-async-storage/async-storage';
import {ConversationDetailInfo, ConversationInfo} from '../models/Message';
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
        token: await AsyncStorage.getItem('token'),
        index: '0',
        count: INFINITE,
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    // data.avatar = getDirectImageLink(data.avatar);
    return response.data.conversations;
  } catch (error) {
    return null;
  }
};

export const getDetailConversation = async (
  conversationId: string,
): Promise<ConversationDetailInfo[] | null> => {
  try {
    const response = await axiosInstance.post(`${DOMAIN}/get_conversation`, {
      token: await AsyncStorage.getItem('token'),
      index: '0',
      count: '15',
      conversation_id: conversationId,
      mark_as_read: true,
    });
    return response.data.conversation;
  } catch (error) {
    return null;
  }
};

export const deleteMessage = async (
  messageId: string,
  partnerId: string,
  conversationId: string,
): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(`${DOMAIN}/delete_message`, {
      token: await AsyncStorage.getItem('token'),
      message_id: messageId,
      partner_id: partnerId,
      conversation_id: conversationId,
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

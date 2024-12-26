import {
  ConversationDetailInfo,
  ConversationInfo,
  SearchAccountResult,
} from '../models/Message';
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
        index: '0',
        count: INFINITE,
      },
    );
    return response.data.conversations;
  } catch (error) {
    return null;
  }
};

export const getDetailConversation = async (
  partnerId: string,
): Promise<ConversationDetailInfo[] | []> => {
  try {
    const response = await axiosInstance.post(`${DOMAIN}/get_conversation`, {
      index: '0',
      count: '15',
      partner_id: partnerId,
      mark_as_read: true,
    });
    return response.data.conversation;
  } catch (error) {
    return [];
  }
};

export const deleteMessage = async (
  messageId: string,
  partnerId: string,
): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(`${DOMAIN}/delete_message`, {
      message_id: messageId,
      partner_id: partnerId,
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const searchAccount = async (
  queryString: string,
): Promise<SearchAccountResult[] | null> => {
  try {
    const response = await axiosInstance.post(`${DOMAIN}/search_account`, {
      search: queryString,
      pageable_request: {
        page: '0',
        page_size: INFINITE,
      },
    });
    return response.data.page_content;
  } catch (error) {
    return null;
  }
};

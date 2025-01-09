export type SenderInfo = {
  id: number;
  name: string;
  avatar: string;
};

export type ConversationDetailInfo = {
  message_id: string;
  message: string;
  sender: SenderInfo;
  created_at: Date;
  unread: number;
};

export type ConversationInfo = {
  id: number;
  partner: SenderInfo;
  last_message: {
    message: string;
    sender: SenderInfo;
    created_at: Date;
    unread: number;
  };
};

export interface IMessage {
  sender: {
    id: number;
  };
  id: string;
  content: string;
  receiver: {
    id: number;
  };
}

export type ReceivedMessage = {
  content: string;
  conversation_id: number;
  created_at: Date;
  id: number;
  message_status: 1;
  receiver: SenderInfo;
  sender: SenderInfo;
};

export type SearchAccountResult = {
  account_id: string;
  last_name: string;
  first_name: string;
  email: string;
};

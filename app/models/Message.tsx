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

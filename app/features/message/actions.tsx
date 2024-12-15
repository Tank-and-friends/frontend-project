import {IMessage, ReceivedMessage} from '../../models/Message';

export const getIMessageModel = (con: ReceivedMessage): IMessage => {
  return {
    content: con.content,
    receiver: {
      id: con.receiver.id,
    },
    sender: {
      id: con.sender.id,
    },
  };
};

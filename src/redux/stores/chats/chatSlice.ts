/* eslint-disable no-param-reassign */
import { createAction, createSlice } from '@reduxjs/toolkit';

export const chatReducerPath = 'chat';

export enum WSStatus {
  WS_INITIAL = 'WS_INITIAL',
  WS_CONNECT = 'WS_CONNECT',
  WS_CONNECTING = 'WS_CONNECTING',
  WS_CONNECTED = 'WS_CONNECTED',
  WS_DISCONNECT = 'WS_DISCONNECT',
  WS_DISCONNECTED = 'WS_DISCONNECTED',
}

export interface IMessageData {
  chatId: string;
  userId: string;
  message: string;
  date: string;
}

export type Chat = Record<string, IMessageData[]>;
interface IRowMessagePayload {
  message: string;
}

interface IParsedMessage {
  chatId: string;
  messages: Array<IMessageData>;
}

const SEND_MESSAGE_ACTION_TYPE = 'SEND_MESSAGE';

export const sendMessageAction = createAction(SEND_MESSAGE_ACTION_TYPE, (message: string) => ({
  payload: {
    message,
  },
}));

const wsSlice = createSlice({
  name: chatReducerPath,
  initialState: { default: [] } as Chat,
  reducers: {
    setMessage: (state, { payload: { message } }: { payload: IRowMessagePayload }) => {
      const { chatId, messages }: IParsedMessage = JSON.parse(message);
      const oldMessages = state[chatId] || [];
      state[chatId] = [...oldMessages, ...messages];
    },
  },
});

export const { setMessage } = wsSlice.actions;
export default wsSlice.reducer;

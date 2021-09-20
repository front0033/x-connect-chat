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

export interface IChat {
  messageList: string[];
}

interface IMessagePayload {
  message: string;
}
const SEND_MESSAGE_ACTION_TYPE = 'SEND_MESSAGE';

export const sendMessageAction = createAction(SEND_MESSAGE_ACTION_TYPE, (message: string) => ({
  payload: {
    message,
  },
}));

const wsSlice = createSlice({
  name: chatReducerPath,
  initialState: { messageList: [] } as IChat,
  reducers: {
    setMessage: (state, { payload: { message } }: { payload: IMessagePayload }) => {
      state.messageList = [...state.messageList, message];
    },
  },
});

export const { setMessage } = wsSlice.actions;
export default wsSlice.reducer;

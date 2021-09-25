/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const wsReducerPath = 'ws';

export enum WSStatus {
  WS_INITIAL = 'WS_INITIAL',
  WS_CONNECT = 'WS_CONNECT',
  WS_CONNECTING = 'WS_CONNECTING',
  WS_CONNECTED = 'WS_CONNECTED',
  WS_DISCONNECT = 'WS_DISCONNECT',
  WS_DISCONNECTED = 'WS_DISCONNECTED',
}

export interface IWSState {
  status: WSStatus;
  host: string;
}

const wsSlice = createSlice({
  name: wsReducerPath,
  initialState: { status: WSStatus.WS_INITIAL, host: '' } as IWSState,
  reducers: {
    wsConnect: (state, { payload: { host } }: { payload: Pick<IWSState, 'host'> }) => {
      state.status = WSStatus.WS_CONNECT;
      state.host = host;
    },
    wsConnecting: (state) => {
      state.status = WSStatus.WS_CONNECTING;
    },
    wsConnected: (state) => {
      state.status = WSStatus.WS_CONNECTED;
    },
    wsDisconnect: (state) => {
      state.status = WSStatus.WS_DISCONNECT;
    },
    wsDisconnected: (state) => {
      state.status = WSStatus.WS_DISCONNECTED;
    },
  },
});

export const { wsConnect, wsConnecting, wsConnected, wsDisconnect, wsDisconnected } = wsSlice.actions;
export default wsSlice.reducer;

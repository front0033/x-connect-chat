import { Middleware } from 'redux';
import { wsConnect, wsConnected, wsDisconnect, wsDisconnected } from './wsSlice';
import { sendMessageAction, setMessage } from '../chats/chatSlice';

const wsMiddleWareCreator = (): Middleware => {
  let socket: WebSocket | null = null;

  return (storeAPI) => (next) => (action) => {
    const onOpen = () => {
      storeAPI.dispatch(wsConnected());
    };

    const onClose = () => {
      storeAPI.dispatch(wsDisconnected());
    };

    const onMessage = (event: MessageEvent<string>) => {
      storeAPI.dispatch(setMessage({ message: event.data }));
    };

    switch (action.type) {
      case wsConnect.type:
        if (socket !== null) {
          (socket as WebSocket).close();
        }

        socket = new WebSocket(action.payload.host);

        // websocket handlers
        socket.onmessage = onMessage;
        socket.onclose = onClose;
        socket.onopen = onOpen;

        // eslint-disable-next-line no-console
        console.log('websocket opened');

        break;
      case wsDisconnect.type:
        if (socket !== null) {
          (socket as WebSocket).close();
        }
        socket = null;
        // eslint-disable-next-line no-console
        console.log('websocket closed');
        break;

      case sendMessageAction.type:
        if (socket !== null) {
          // eslint-disable-next-line no-console
          console.log('sending a message - ', action.payload.message);
          (socket as WebSocket).send(action.payload.message);
        }

        break;

      default:
        break;
    }
    return next(action);
  };
};

export default wsMiddleWareCreator;

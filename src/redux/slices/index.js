import {combineReducers} from 'redux';

import noeudsReducer from './noeuds';
import messagesReducer from './messagesByNoeud';
import messageReducer from './singleMessage';

const rootReducer = combineReducers({
  noeuds: noeudsReducer,
  messages: messagesReducer,
  message: messageReducer,
});

export default rootReducer;

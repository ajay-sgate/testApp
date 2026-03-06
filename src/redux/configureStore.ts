import { createStore } from 'redux';
import rootReducer from "./Reducers/rootReducer";
import { applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const whiteList = [
  'settingReducer'
];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList:whiteList,
  blacklist: ['authReducer', 'homeReducer'],
} 

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export {store, persistor};

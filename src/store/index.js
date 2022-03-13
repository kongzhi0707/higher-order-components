import { createStore, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
import counter from './modules/counter';
import todoList from './modules/todoList';
import loading from './modules/loading';
import { persistStore, persistReducer } from 'redux-persist';
//  存储机制，可换成其他机制，当前使用sessionStorage机制
import storageSession from 'redux-persist/lib/storage/session';
import { devToolsEnhancer } from 'redux-devtools-extension'; // redux调试工具

const reducers = combineReducers({
  counter,
  todoList,
  loading,
});

const persistConfig = {
  key: 'root',
  storage: storageSession
  // navigation不会被存入缓存中，其他会，适用于少部分数据需要实时更新
  // blacklist: ['navigation']
  // navigation会存入缓存，其他不会存，适用于大多数数据并不会实时从后台拿数据
  // whitelist: ['navigation']
};
const myPersistReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  myPersistReducer,
  devToolsEnhancer(),
);

export const persistor = persistStore(store);
// const _dispatch = store.dispatch;
// store.dispatch = (type, data) => _dispatch({type, data});
export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import {createSagaMiddleware} from 'redux-saga';
import { persistStore, persistedReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from './reducers';
import rootSaga from './sagas';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userReducer'],
};
const sagaMiddeware = createSagaMiddleware();
const persistedReducer = presistReducer(persistConfig, reducers);
const middleWares = [sagaMiddleware]
const persistedReducer = persistedReducer()

if (__DEV__){
    middleWares.push(logger);
}

export default configureStore = () =>{
    const store = createStore(
        persistedReducer,
        
        compose(applyMiddleware)
    )
}
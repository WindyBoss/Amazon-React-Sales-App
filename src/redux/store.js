import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import logger from 'redux-logger';

import weekReducer from './weeks/weeksSlice';
import monthsReducer from './months/monthsSlice';
import daysReducer from './days/daysSlice';
import skuReducer from './sku/skuSlice';

// import apiService from 'service/apiService';

const rootReducer = combineReducers({
    months: monthsReducer,
    weeks: weekReducer,
    days: daysReducer,
    sku: skuReducer,
});

console.log(daysReducer);

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
        // .concat(apiService.middleware)
        .concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: defaultEnhancers => {
        console.log(defaultEnhancers);
        return defaultEnhancers;
    },
});

// setupListeners(store.dispatch);

export { store };
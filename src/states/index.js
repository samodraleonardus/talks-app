import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import usersReducer from './users/reducer';
import { loadingBarReducer, loadingBarMiddleware } from 'react-redux-loading-bar';
import threadDetailReducer from './threadDetail/reducer';
import threadsReducer from './threads/reducer';
import selectedCategoryReducer from './category/reducer';
import errorMessageReducer from './errorMessage/reducer';
import leaderboardsReducer from './leaderBoardsNew/reducer';
import api from '../utils/api';

const preloadedState = {
  authUser: api.getAuthUser(),
};

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
    threadDetail: threadDetailReducer,
    threads: threadsReducer,
    category: selectedCategoryReducer,
    errorMessage: errorMessageReducer,
    leaderBoardsNew: leaderboardsReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(loadingBarMiddleware()),
});

export default store;


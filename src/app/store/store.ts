import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import navigationReducer from '@/features/reducers/navigation/navigationReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedNavigationReducer = persistReducer(persistConfig, navigationReducer);

export const store = configureStore({
  reducer: {
    navigation: persistedNavigationReducer,
  },
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
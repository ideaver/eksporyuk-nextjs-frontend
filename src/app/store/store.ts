import buyersReducer from "@/features/reducers/buyers/buyersReducer";
import navigationReducer from "@/features/reducers/navigation/navigationReducer";
import productReducer from "@/features/reducers/products/productReducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const navigationPersistConfig = {
  key: "navigation",
  storage,
};

const productPersistConfig = {
  key: "product",
  storage,
};

const buyerPersistConfig = {
  key: "buyer",
  storage,
};

const persistedNavigationReducer = persistReducer(
  navigationPersistConfig,
  navigationReducer
);

const persistedProductReducer = persistReducer(
  productPersistConfig,
  productReducer
);

const persistedBuyerReducer = persistReducer(buyerPersistConfig, buyersReducer);

// rest of the code...
export const store = configureStore({
  reducer: {
    navigation: persistedNavigationReducer,
    product: persistedProductReducer,
    buyer: persistedBuyerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import buyersReducer from "@/features/reducers/buyers/buyersReducer";
import articlesReducer from "@/features/reducers/articles/articlesReducer";
import dashboardReducer from "@/features/reducers/dashboard/dashboardReducer";
import navigationReducer from "@/features/reducers/navigation/navigationReducer";
import productReducer from "@/features/reducers/products/productReducer";
import couponReducer from "@/features/reducers/affiliators/couponReducer";
import rewardReducer from "@/features/reducers/affiliators/rewardReducer";
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

const couponPersistConfig = {
  key: "coupon",
  storage
}
const articlePersistConfig = {
  key: "article",
  storage,
};

const dashboardPersistConfig = {
  key: "dashboard",
  storage,
};

const rewardPersistConfig = {
  key: "reward",
  storage,
};

const persistedNavigationReducer = persistReducer(
  navigationPersistConfig,
  navigationReducer,
);

const persistedProductReducer = persistReducer(
  productPersistConfig,
  productReducer
);

const persistedBuyerReducer = persistReducer(buyerPersistConfig, buyersReducer);

const persistedCouponReducer = persistReducer(couponPersistConfig, couponReducer);
const persistedArticleReducer = persistReducer(
  articlePersistConfig,
  articlesReducer
);

const persistedDashboardReducer = persistReducer(
  dashboardPersistConfig,
  dashboardReducer
);

const persistedRewardReducer = persistReducer(rewardPersistConfig, rewardReducer);

// rest of the code...
export const store = configureStore({
  reducer: {
    navigation: persistedNavigationReducer,
    product: persistedProductReducer,
    buyer: persistedBuyerReducer,
    coupon: persistedCouponReducer,
    article: persistedArticleReducer,
    dashboard: persistedDashboardReducer,
    reward: persistedRewardReducer,
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

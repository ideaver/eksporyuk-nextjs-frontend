import articlesReducer from "@/features/reducers/articles/articlesReducer";
import buyersReducer from "@/features/reducers/buyers/buyersReducer";
import courseReducer from "@/features/reducers/course/courseReducer";
import dashboardReducer from "@/features/reducers/dashboard/dashboardReducer";
import feedbackReducer from "@/features/reducers/feedback/feedbackReducer";
import navigationReducer from "@/features/reducers/navigation/navigationReducer";
import productReducer from "@/features/reducers/products/productReducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import transactionReducer from "@/features/reducers/transaction/transactionReducer";

const navigationPersistConfig = {
  key: "navigation",
  storage,
};

const productPersistConfig = {
  key: "product",
  storage,
};
const coursePersistConfig = {
  key: "course",
  storage,
};

const buyerPersistConfig = {
  key: "buyer",
  storage,
};

const articlePersistConfig = {
  key: "article",
  storage,
};

const dashboardPersistConfig = {
  key: "dashboard",
  storage,
};

const feedbackPersistConfig = {
  key: "feedback",
  storage,
};

const transactionPersistConfig = {
  key: "transaction",
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

const persistedArticleReducer = persistReducer(
  articlePersistConfig,
  articlesReducer
);

const persistedDashboardReducer = persistReducer(
  dashboardPersistConfig,
  dashboardReducer
);

const persistedFeedbackReducer = persistReducer(
  feedbackPersistConfig,
  feedbackReducer
);
const persistedCourseReducer = persistReducer(
  coursePersistConfig,
  courseReducer
);

const persistedTransactionReducer = persistReducer(
  transactionPersistConfig,
  transactionReducer
);

// rest of the code...
export const store = configureStore({
  reducer: {
    navigation: persistedNavigationReducer,
    product: persistedProductReducer,
    buyer: persistedBuyerReducer,
    article: persistedArticleReducer,
    dashboard: persistedDashboardReducer,
    feedback: persistedFeedbackReducer,
    transaction: persistedTransactionReducer,
    course: persistedCourseReducer
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

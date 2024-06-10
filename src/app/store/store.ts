import couponReducer from "@/features/reducers/affiliators/couponReducer";
import rewardReducer from "@/features/reducers/affiliators/rewardReducer";
import announcementReducer from "@/features/reducers/announcement/announcementReducer";
import articlesReducer from "@/features/reducers/articles/articlesReducer";
import buyersReducer from "@/features/reducers/buyers/buyersReducer";
import courseReducer from "@/features/reducers/course/courseReducer";
import deletedCourseReducer from "@/features/reducers/course/deletedCourseReducer";
import dashboardReducer from "@/features/reducers/dashboard/dashboardReducer";
import feedbackReducer from "@/features/reducers/feedback/feedbackReducer";
import followupReducer from "@/features/reducers/followup/followupReducer";
import materialPromotion from "@/features/reducers/materialPromotion/materialPromotion";
import membershipReducer from "@/features/reducers/membership/membershipReducer";
import navigationReducer from "@/features/reducers/navigation/navigationReducer";
import newsReducer from "@/features/reducers/news/newsReducer";
import productReducer from "@/features/reducers/products/productReducer";
import serviceReducer from "@/features/reducers/products/serviceReducer";
import transactionReducer from "@/features/reducers/transaction/transactionReducer";
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
const coursePersistConfig = {
  key: "course",
  storage,
};
const deletedCoursePersistConfig = {
  key: "deletedCourse",
  storage,
};

const buyerPersistConfig = {
  key: "buyer",
  storage,
};

const couponPersistConfig = {
  key: "coupon",
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

const rewardPersistConfig = {
  key: "reward",
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

const servicePersistConfig = {
  key: "service",
  storage,
};

const membershipPersistConfig = {
  key: "membership",
  storage,
};

const followUpPersistConfig = {
  key: "followUp",
  storage,
};

const announcementPersistConfig = {
  key: "announcement",
  storage,
};

const materialPromotionConfig = {
  key: "materialPromotion",
  storage,
};

const newsPersistConfig = {
  key: "news",
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

const persistedCouponReducer = persistReducer(
  couponPersistConfig,
  couponReducer
);
const persistedArticleReducer = persistReducer(
  articlePersistConfig,
  articlesReducer
);

const persistedDashboardReducer = persistReducer(
  dashboardPersistConfig,
  dashboardReducer
);

const persistedRewardReducer = persistReducer(
  rewardPersistConfig,
  rewardReducer
);

const persistedFeedbackReducer = persistReducer(
  feedbackPersistConfig,
  feedbackReducer
);
const persistedCourseReducer = persistReducer(
  coursePersistConfig,
  courseReducer
);
const persistedDeletedCourseReducer = persistReducer(
  deletedCoursePersistConfig,
  deletedCourseReducer
);

const persistedTransactionReducer = persistReducer(
  transactionPersistConfig,
  transactionReducer
);

const persistedServiceReducer = persistReducer(
  servicePersistConfig,
  serviceReducer
);

const persistedMembershipReducer = persistReducer(
  membershipPersistConfig,
  membershipReducer
);
const persistedFollowUpReducer = persistReducer(
  followUpPersistConfig,
  followupReducer
);

const persistedAnnouncementReducer = persistReducer(
  announcementPersistConfig,
  announcementReducer
);

const persistedMaterialPromotionReducer = persistReducer(
  materialPromotionConfig,
  materialPromotion
);

const persistedNewsReducer = persistReducer(newsPersistConfig, newsReducer);

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
    feedback: persistedFeedbackReducer,
    transaction: persistedTransactionReducer,
    service: persistedServiceReducer,
    course: persistedCourseReducer,
    deletedCourse: persistedDeletedCourseReducer,
    memebrship: persistedMembershipReducer,
    followUp: persistedFollowUpReducer,
    announcement: persistedAnnouncementReducer,
    materialPromotion: persistedMaterialPromotionReducer,
    news: persistedNewsReducer,
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

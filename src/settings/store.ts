import { configureStore } from '@reduxjs/toolkit';
import trmReducer from '@/store/trmSlice';

export const store = configureStore({
  reducer: {
    trm: trmReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
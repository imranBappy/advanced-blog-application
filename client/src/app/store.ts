import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authSlice from '../features/auth/authSlice';
import { unauthenticatedMiddleware } from '@/middlewares/upload';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware().concat(apiSlice.middleware), unauthenticatedMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
});


export default store;
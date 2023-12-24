import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = process.env.API_URL2 || `https://advanced-blog-application-lemon.vercel.app`



export const apiSlice = createApi({
    reducerPath: "api",
    
    baseQuery: fetchBaseQuery({
        // baseUrl: process.env.NODE_ENV ==='production' ? baseUrl : 'http://localhost:5000' ,
        // baseUrl: 'http://localhost:5000',
        baseUrl: 'https://advanced-blog-application-lemon.vercel.app',
        prepareHeaders: (headers, { getState, endpoint }):any => {
            let token: any = getState()
            token = token.auth.accessToken;
            if (token) {
                headers.set("authorization", `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Blogs','Blog','DashboardBlogs'],
    endpoints: (builder)=> ({}),
})




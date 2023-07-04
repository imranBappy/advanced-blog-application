import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.API_URL || `https://blog-23.onrender.com`





export const apiSlice = createApi({
    reducerPath: "api",
    
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
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




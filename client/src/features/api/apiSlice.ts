import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";


export const apiSlice = createApi({
    reducerPath: "api",
    
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL || `http://localhost:5000`,
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
    endpoints: (builder) => ({}),
})




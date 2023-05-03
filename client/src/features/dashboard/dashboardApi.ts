import { apiSlice } from '../api/apiSlice';

export const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        dashboardGetBlog: builder.query({
            query: () => `/dashboard/blogs`,
            providesTags:['DashboardBlogs']
        })
    })
})


export const { useDashboardGetBlogQuery}  = dashboardApi
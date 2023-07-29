import { apiSlice } from '../api/apiSlice';


export const dashboarApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        dashboardGetBlog: builder.query({
            query: ({page}) => `/dashboard/blogs?page=${page}`,
            providesTags:['DashboardBlogs']
        })
    })
})

export const { useDashboardGetBlogQuery}  = dashboarApi
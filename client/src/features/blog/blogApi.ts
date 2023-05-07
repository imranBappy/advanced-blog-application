import { apiSlice } from '../api/apiSlice';


export const blogApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postBlog: builder.mutation({
            query: (body) =>( {
                url: '/blog',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Blogs']
        }),
        getBlogs: builder.query({
            query: () => `/blog`,
            providesTags:['Blogs']
        }),
        getBlog: builder.query({
            query: (id) => `/blog/${id}`,
            providesTags:['Blog']
        }),
        updateBlog: builder.mutation({
            query: ({body,id}) => ({
                url: `/blog/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Blogs']
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blog/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['DashboardBlogs'],
        })
    })
})

export const {useDeleteBlogMutation, util:{getRunningQueriesThunk}, useUpdateBlogMutation, usePostBlogMutation, useGetBlogsQuery , useGetBlogQuery}  = blogApi
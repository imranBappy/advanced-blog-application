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
            providesTags: (result, error, id) => {
                return [{type: 'Blog', id:id}]
            }
        }),
        updateBlog: builder.mutation({
            query: ({ id,body }) => ({
                url: `/blog/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: (result, error, arg) => {
                return [{type: 'Blog', id: arg.id}]
            }
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

export const {useDeleteBlogMutation, useUpdateBlogMutation, usePostBlogMutation, useGetBlogsQuery , useGetBlogQuery}  = blogApi
import store from '@/app/store';
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
        getMoreBlogs: builder.query({
            query: ({page}:any) => `/blog?page=${page}`,
            async onQueryStarted({ page }, { dispatch, queryFulfilled }) { 
                try {
                    const result = await queryFulfilled;
                    if (result.data.blogs.length > 0) { 
                        dispatch(blogApi.util.updateQueryData('getBlogs', {}, (draft) => {
                            draft.blogs.push(...result.data.blogs);
                        }))
                    }
                } catch (error) {}
            },
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
        }),
         
    })
})

export const {useDeleteBlogMutation, useUpdateBlogMutation, usePostBlogMutation, useGetBlogsQuery , useGetBlogQuery}  = blogApi
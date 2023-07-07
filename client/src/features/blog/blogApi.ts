import { apiSlice } from '../api/apiSlice';
import { dashboarApi } from '../dashboard/dashboardApi';

export const blogApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postBlog: builder.mutation({
            query: (body) =>( {
                url: '/blog',
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) { 
                try {
                    const result = await queryFulfilled;

                    // getBlogs  cash passimstic update
                    dispatch(blogApi.util.updateQueryData('getBlogs', {}, (draft) => {
                        draft.blogs.unshift(result.data);
                    }));

                    // dashboardGetBlog cash passimstic update
                    dispatch(dashboarApi.util.updateQueryData('dashboardGetBlog', {}, (draft) => {
                        draft.unshift(result.data);
                    }))
                } catch (error) {}
            },
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
          async onQueryStarted({ id,body }, { dispatch, queryFulfilled }) { 
                // cash passimstic update
                try {
                    const result = await queryFulfilled;

                    // update dashboardGetBlog cash
                    dispatch(dashboarApi.util.updateQueryData('dashboardGetBlog', {}, (draft) => { 
                        const index = draft.findIndex((blog: any) => blog._id === result.data._id);
                        draft[index] = result.data;
                    }))

                    //update getBlogs cash
                    dispatch(blogApi.util.updateQueryData('getBlogs', {}, (draft) => {
                        const index = draft.blogs.findIndex((blog:any) => blog._id === result.data._id);
                        draft.blogs[index] = result.data;
                    }))
                    
                    dispatch(blogApi.util.updateQueryData('getBlog', id, (draft) => {
            
                        const {title, content, thumbnail} = result.data;
                        draft.title =title;
                        draft.content = content;
                        draft.thumbnail = thumbnail;
                    }))
                } catch (error) {}
            },
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blog/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) { 
                // cash passimstic update
                try {
                    const result = await queryFulfilled;

                    // update dashboardGetBlog cash
                    dispatch(dashboarApi.util.updateQueryData('dashboardGetBlog', {}, (draft) => { 
                        const index = draft.findIndex((blog: any) => blog._id === result.data._id);
                        draft.splice(index, 1);
                    }))

                    //update getBlogs cash
                    dispatch(blogApi.util.updateQueryData('getBlogs', {}, (draft) => {
                        const index = draft.blogs.findIndex((blog:any) => blog._id === result.data._id);
                        draft.blogs.splice(index, 1);
                    }))
                    

                } catch (error) {}
            },
        }),
         
    })
})

export const {useDeleteBlogMutation, useUpdateBlogMutation, usePostBlogMutation, useGetBlogsQuery , useGetBlogQuery}  = blogApi
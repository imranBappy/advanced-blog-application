import { apiSlice } from '../api/apiSlice';


export const blogApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postComment: builder.mutation({
            query: ({ body, blogId }) => ( {
                url: `/comment/${blogId}`,
                method: 'POST',
                  body:{body:body}
          }),
          invalidatesTags: ['Blog']
        })
    })
})

export const { usePostCommentMutation}  = blogApi
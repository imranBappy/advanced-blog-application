import { toast } from 'react-toastify';
import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';
interface MyApiResponse {
    isAuthintication: Boolean,
    data: any,
    message: String,
    token: String,
}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<MyApiResponse, any>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled,queryRejected , requestId }:any) {
                try {
                    const result = await queryFulfilled;
                    console.log(16, result.data);
                    localStorage.setItem("auth", JSON.stringify(result.data));
                    dispatch(userLoggedIn(result.data));
                } catch (error: any) {
                    toast.error('error.error.data.error')
                    // queryRejected(error);
                }
            },
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/auth",
                method: "POST",
                body,
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled, requestId }:any) {
                try {
                    const result = await queryFulfilled;
                    console.log({ result });
                    localStorage.setItem("auth", JSON.stringify(result.data));
                    dispatch(userLoggedIn(result.data));
                    //  toast.success('Successfully Logedin!')
                } catch (error:any) {
                    toast.error(error.error.data.error)
                }
            },
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation } = authApi;
import {  Middleware } from '@reduxjs/toolkit';
export const unauthenticatedMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
    if (action?.meta?.arg?.endpointName === "postBlog" &&action?.meta?.requestStatus==="pending" ) {
        console.log(action)
    }
    return next(action);
};
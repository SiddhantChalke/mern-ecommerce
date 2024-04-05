import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'
import {BASE_URL} from '../features/constants'

    // create baseQuery w the baseUrl
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
    // create apiSlice 
export const apiSlice = createApi({
    baseQuery,
    // define tagTypes for the API slice, which help organize data in the Redux store.
    tagTypes: ['Product', 'Order', 'User', 'Category'],
    // define endpoints, fn returns an empty object as there are no specific endpoints defined here
    endpoints: ()=>({}),
});




// https://redux-toolkit.js.org/rtk-query/usage/mutations
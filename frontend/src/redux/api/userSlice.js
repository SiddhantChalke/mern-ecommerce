import {apiSlice} from './apiSlice'
import { USERS_URL } from '../features/constants'

// create userSlice by injecting endpoints
export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        // define a login mutation endpoint with login-query.
        login: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            })
        }),
        logout: builder.mutation({
            query: ()=>({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        register: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            })
        }),
        profile: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),
        // define a getUsers query endpoint w it's query
        getUsers: builder.query({
            query:  () =>({
                url: USERS_URL,
            }),
            providesTags: ['User'],  // Provide tags for caching purposes
            keepUnusedDataFor: 5,   // Keep unused data in the cache for 5 secs
        }),

        deleteUser: builder.mutation({
            query: userId =>({
                url: `{USERS_URL}/${userId}`,
                method: 'DELETE',
            })
        }),

        getUserDetails: builder.query({
            query:  (id) =>({
                url: `${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),

        updateUser: builder.mutation({
            query: data => ({
                url: `{USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User']
        })
    })
});

// export the generated hooks and mutations
export const {
    useLoginMutation,
    useLogoutMutation, 
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation

} = userSlice;



// http://localhost:3000/api/users/auth

// Mutations are used to send data updates to the server and apply the changes to the local cache,
// they can also invalidate cached data and force re-fetches.

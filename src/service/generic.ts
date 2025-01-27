import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Items } from '../types/generic'
import { ITEMS_API_HOST } from '../constants/endpoints'

// Define a service using a base URL and expected endpoints
export const genericApi = createApi({
  reducerPath: 'genericApi',
  baseQuery: fetchBaseQuery({ baseUrl: ITEMS_API_HOST }),
  endpoints: (builder) => ({
    getItems: builder.query<Items, void>({
      query: () => `items`,
    })
  }),
})

export const { useGetItemsQuery } = genericApi
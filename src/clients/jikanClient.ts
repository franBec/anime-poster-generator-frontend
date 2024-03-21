import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const jikanClient = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_JIKAN_BASE_URL }),
    endpoints: () => ({}),
})
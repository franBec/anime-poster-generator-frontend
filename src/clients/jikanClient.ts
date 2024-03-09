import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const jikanClient = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4' }),
    endpoints: () => ({}),
})
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const animePosterGeneratorBackendClient = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints: () => ({}),
})
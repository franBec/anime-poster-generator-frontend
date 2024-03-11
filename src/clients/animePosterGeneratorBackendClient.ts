import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const animePosterGeneratorBackendClient = createApi({
    reducerPath: "animePosterGeneratorBackendClient",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints: () => ({}),
})
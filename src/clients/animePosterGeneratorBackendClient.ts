import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MakePosterApiArg, MakePosterApiResponse } from '../../generated/rtk-query/animePosterGeneratorBackendApi'

export const animePosterGeneratorBackendClient = createApi({
    reducerPath: "animePosterGeneratorBackendClient",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints: () => ({}),
})

//created custom endpoint that is able to treat blobs
//based on https://github.com/reduxjs/redux-toolkit/issues/1522#issuecomment-1167482553
const injectedRtkApi = animePosterGeneratorBackendClient.injectEndpoints({
    endpoints: (build) => ({
        makePosterAsBlob: build.mutation<MakePosterApiResponse, MakePosterApiArg>({
            query(args) {
                return {
                    url: `/poster`,
                    method: "POST",
                    body: args.posterContent,
                    responseHandler: async (response) => {
                        const url = window.URL.createObjectURL(await response.blob());
                        window.open(url, '_blank');
                    },
                    cache: "no-cache",
                };
            },
        }),
    }),
    overrideExisting: false,
})

export const { useMakePosterAsBlobMutation } = injectedRtkApi
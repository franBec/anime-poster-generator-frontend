import { combineReducers, configureStore, Reducer, UnknownAction } from '@reduxjs/toolkit'
import { jikanClient } from '@/clients/jikanClient'
import { animePosterGeneratorBackendClient } from '@/clients/animePosterGeneratorBackendClient'

const combinedReducer = combineReducers({
    [jikanClient.reducerPath]: jikanClient.reducer,
    [animePosterGeneratorBackendClient.reducerPath]: animePosterGeneratorBackendClient.reducer
})

const rootReducer: Reducer = (state: RootState, action: UnknownAction) => {
    if (action.type === 'store/reset') {
        return {} as RootState
    }
    return combinedReducer(state, action)
}

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .concat(jikanClient.middleware)
            .concat(animePosterGeneratorBackendClient.middleware)
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
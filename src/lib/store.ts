import { combineReducers, configureStore, Reducer, UnknownAction } from '@reduxjs/toolkit'
import { jikanClient } from '@/clients/jikanClient'

const combinedReducer = combineReducers({
    [jikanClient.reducerPath]: jikanClient.reducer
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
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jikanClient.middleware)
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
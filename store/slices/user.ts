import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import api from '../api'

enum IFamilyTypes {
    ADMIN = 'ADMIN',
    FAMILY = 'FAMILY',
}

enum IStatus {
    ACTIVE = 'ACTIVE',
    DIACTIVE = 'DIACTIVE',
}

export interface IuserType {
    id: string
    code: string
    name: string
    password: string
    created_at: string
    user_type: IFamilyTypes
    status: IStatus
}

export interface IuserState {
    token: string
    error: string
    isLoading: boolean
    user: IuserType
}

const userInitialState: IuserState = {
    error: '',
    token: '',
    isLoading: true,
    user: {
        id: '',
        code: '',
        name: '',
        password: '',
        created_at: '',
        status: IStatus.DIACTIVE,
        user_type: IFamilyTypes.FAMILY,
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        loginStarted: (state, { payload }: PayloadAction<string>) => {
            state.isLoading = false
            state.token = payload
        },
        loginSuccess: (state, { payload }: PayloadAction<IuserType>) => {
            state.error = ''
            state.isLoading = false
            state.user = payload
        },
        loginfailed: (state, { payload }: PayloadAction<string>) => {
            state.error = payload
            state.isLoading = false
        },
        logout: state => {
            state.error = ''
            state.isLoading = false
        },
    },
})

export const {
    loginStarted,
    loginSuccess,
    loginfailed,
    logout,
} = userSlice.actions

export default userSlice.reducer

// export const login = ({
//     code,
//     password,
// }: {
//     code: string
//     password: string
// }) => async dispatch => {
//     try {
//         await api.post('/api/family/login', { code, password })
//         const getCurrent = await api.get('/api/family/me')
//         dispatch(loginStarted(getCurrent.data.data))
//     } catch (error) {
//         dispatch(loginfailed(error))
//     }
// }

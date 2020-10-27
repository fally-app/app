import { createSlice, PayloadAction } from '@reduxjs/toolkit'

enum Gender {
    Male = 'Male',
    Female = 'Female',
}

enum IStatus {
    ACTIVE = 'ACTIVE',
    DIACTIVE = 'DIACTIVE',
}

export interface IuserType {
    id: string
    firstName: string
    lastName: string
    email?: string
    family_id: string
    gender?: Gender
    status: IStatus
    class_level: string
    joined_at: string
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
        firstName: '',
        lastName: '',
        email: '',
        family_id: '',
        status: IStatus.DIACTIVE,
        class_level: '',
        joined_at: '',
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
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

export const { loginSuccess, loginfailed, logout } = userSlice.actions
export default userSlice.reducer

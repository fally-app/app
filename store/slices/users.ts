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
    error: string
    isLoading: boolean
    users: IuserType[]
}

const userInitialState: IuserState = {
    error: '',
    isLoading: true,
    users: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        loadUser: state => {
            state.isLoading = true
        },
        addusers: (state, { payload }: PayloadAction<IuserType[]>) => {
            state.error = ''
            state.isLoading = false
            state.users = payload
        },
        edituser: (state, { payload }: PayloadAction<string>) => {
            state.error = payload
            state.isLoading = false
        },
        deleteuser: state => {
            state.error = ''
            state.isLoading = false
        },
    },
})

export const { loadUser, addusers, edituser, deleteuser } = userSlice.actions
export default userSlice.reducer

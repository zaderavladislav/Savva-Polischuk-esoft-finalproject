import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../services/auth.service';
import type { IUser } from '../models/IUser';
import type { AuthResponse } from '../models/response/AuthResponse';

interface AuthState {
    user: IUser | {};
    isAuth: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: {},
    isAuth: false,
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(payload.email, payload.password);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message || 'Login failed');
        }
    }
);

export const registration = createAsyncThunk(
    'auth/registration',
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await AuthService.registration(payload.email, payload.nickname, payload.password);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message || 'Registration failed');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
        } catch (e: any) {
            return rejectWithValue('Logout failed');
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Registration
            .addCase(registration.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registration.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(registration.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuth = false;
                state.user = {};
            });
    },
});

export default authSlice.reducer; 
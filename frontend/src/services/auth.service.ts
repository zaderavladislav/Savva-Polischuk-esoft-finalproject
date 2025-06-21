import $api from "./api";
import type { AxiosResponse } from "axios";
import type { AuthResponse } from "../models/response/AuthResponse";
import type { IUser } from "../models/IUser";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', {email, password})
    }

    static async registration(email: string, nickname: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/registration', {email, nickname, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/auth/logout')
    }

    static async getProfile(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>('/auth/profile')
    }
} 
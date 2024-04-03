import {
    EmailInput,
    NewPasswordInputWithConfirmation,
    PasswordInputWithConfirmation,
    SignInInput,
    SignUpInput,
    User,
    UserResponse,
    VerificationCodeInput,
} from "shared-types/auth";
import { EmptyResponse, MessageResponse } from "shared-types/utilSchema";
import { api } from "../api";

export const signUp = async (data: SignUpInput) => {
    const res = await api.post("auth/sign_up", { json: data }).json<User>();
    return res;
};

export const signIn = async (data: SignInInput) => {
    const res = await api.post("auth/sign_in", { json: data, credentials: "include" }).json<UserResponse>();
    return res;
};

export const resetPasswordRequest = async (data: EmailInput) => {
    const res = await api.post("auth/reset-password", { json: data }).json<MessageResponse>();
    return res;
};

export const getUser = async () => {
    const res = await api.get("auth/user", { credentials: "include" }).json<UserResponse>();
    return res;
};

export const isAuthenticated = async () => {
    try {
        const res = await api.get("auth/is-authenticated", { credentials: "include" }).json<MessageResponse>();
        return res.message === "Authenticated";
    } catch (err) {
        return false;
    }
};

export const resendVerificationCode = async () => {
    const res = await api
        .post("auth/resend-verification-code", { json: null, credentials: "include" })
        .json<MessageResponse>();
    return res;
};

export const verify = async (data: VerificationCodeInput) => {
    const res = await api.post("auth/verify", { json: data, credentials: "include" }).json<MessageResponse>();
    return res;
};

export const resetPassword = async (data: PasswordInputWithConfirmation, token: string) => {
    const res = await api.post(`auth/reset-password/${token}`, { json: data }).json<MessageResponse>();
    return res;
};

export const signOut = async () => {
    const res = await api.post("auth/sign_out", { json: null, credentials: "include" }).json<EmptyResponse>();
    return res;
};

export const changeEmail = async (data: EmailInput) => {
    const res = await api.post("auth/change-email", { json: data, credentials: "include" }).json<MessageResponse>();
    return res;
};

export const changePassword = async (data: NewPasswordInputWithConfirmation) => {
    const res = await api.post("auth/change-password", { json: data, credentials: "include" }).json<MessageResponse>();
    return res;
};

export const terminateAllSessions = async () => {
    const res = await api.post("auth/terminate", { json: null, credentials: "include" }).json<EmptyResponse>();
    return res;
};

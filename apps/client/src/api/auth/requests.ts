import { EmailInput, SignInInput, SignUpInput, User } from "shared-types/auth";
import { MessageResponse } from "shared-types/utilSchema";
import { api } from "../api";

export const signUp = async (data: SignUpInput) => {
    const res = await api.post("auth/sign_up", { json: data }).json<User>();
    return res;
};

export const signIn = async (data: SignInInput) => {
    const res = await api.post("auth/sign_in", { json: data }).json<User>();
    return res;
};

export const resetPasswordRequest = async (data: EmailInput) => {
    const res = await api.post("auth/reset-password", { json: data }).json<MessageResponse>();
    return res;
};

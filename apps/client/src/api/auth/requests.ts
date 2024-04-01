import { SignInInput, SignUpInput, User } from "shared-types/auth";
import { api } from "../api";

export const signUp = async (data: SignUpInput) => {
    const res = await api.post("auth/sign_up", { json: data }).json<User>();
    return res;
};

export const signIn = async (data: SignInInput) => {
    const res = await api.post("auth/sign_in", { json: data }).json<User>();
    return res;
};

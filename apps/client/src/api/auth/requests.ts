import { SignUpInput, User } from "shared-types/auth";
import { api } from "../api";

export const signUp = async (data: SignUpInput) => {
    const res = await api.post("auth/sign_up", { json: data }).json<User>();
    return res;
};

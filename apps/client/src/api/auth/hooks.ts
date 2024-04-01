import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { HTTPError } from "ky";
import { EmailInput, SignInInput, SignUpInput } from "shared-types/auth";
import { MessageResponse } from "shared-types/utilSchema";
import { toast } from "sonner";
import { resetPasswordRequest, signIn, signUp } from "./requests";

export const useSignUp = () => {
    const navigate = useNavigate({ from: "/sign_up" });
    return useMutation({
        mutationFn: (input: SignUpInput) => signUp(input),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
            }
        },
        onSuccess: async () => {
            toast.success("Account created successfully");
            await navigate({ to: "/sign_in" });
        },
    });
};

export const useSignIn = () =>
    useMutation({
        mutationFn: (input: SignInInput) => signIn(input),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
            }
        },
        onSuccess: () => {
            toast.success("Signed in successfully");
        },
    });

export const useResetPasswordRequest = () => {
    const navigate = useNavigate({ from: "/sign_up" });
    return useMutation({
        mutationFn: (input: EmailInput) => resetPasswordRequest(input),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
            }
        },
        onSuccess: async () => {
            toast.success("Reset password link sent");
            await navigate({ to: "/sign_in" });
        },
    });
};

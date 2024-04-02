import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { HTTPError } from "ky";
import { useContext } from "react";
import { EmailInput, SignInInput, SignUpInput } from "shared-types/auth";
import { MessageResponse } from "shared-types/utilSchema";
import { toast } from "sonner";
import { getUser, resendVerificationCode, resetPasswordRequest, signIn, signUp, verify } from "./requests";
import { UserContext } from "@/context/User";

export const useSignUp = () => {
    const navigate = useNavigate({ from: "/sign_up" });
    return useMutation({
        mutationFn: (input: SignUpInput) => signUp(input),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
            }
            toast.error("Failed to sign up");
        },
        onSuccess: async () => {
            toast.success("Account created successfully");
            await navigate({ to: "/auth/sign_in" });
        },
    });
};

export const useSignIn = () => {
    const navigate = useNavigate({ from: "/sign_in" });
    const queryClient = new QueryClient();
    const { setUser } = useContext(UserContext);
    return useMutation({
        mutationFn: (input: SignInInput) => signIn(input),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
            }
            toast.error("Failed to sign in");
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["user"] });
            await navigate({ to: "/" });
            toast.success("Signed in successfully");
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
        },
    });
};

export const useResetPasswordRequest = () => {
    const navigate = useNavigate({ from: "/sign_up" });
    return useMutation({
        mutationFn: (input: EmailInput) => resetPasswordRequest(input),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
            }
            toast.error("Failed to send reset password link");
        },
        onSuccess: async () => {
            toast.success("Reset password link sent");
            await navigate({ to: "/auth/sign_in" });
        },
    });
};

export const useGetUser = (enabled: boolean) =>
    useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: false,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled,
    });

export const useResendVerificationCode = () =>
    useMutation({
        mutationFn: async () =>
            toast.promise(resendVerificationCode, {
                loading: "Sending...",
                success: "Verification code sent",
                error: "Failed to resend verification code",
            }),
    });

export const useVerify = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: verify,
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
            }
            toast.error("Failed to verify account");
        },
        onSuccess: async () => {
            toast.success("Account verified successfully");
            await navigate({ to: "/" });
        },
    });
};

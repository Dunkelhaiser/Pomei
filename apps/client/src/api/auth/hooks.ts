import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { HTTPError } from "ky";
import { useContext } from "react";
import { EmailInput, PasswordInputWithConfirmation, SignInInput, SignUpInput } from "shared-types/auth";
import { MessageResponse } from "shared-types/utilSchema";
import { toast } from "sonner";
import {
    changeEmail,
    changePassword,
    getUser,
    resendVerificationCode,
    resetPassword,
    resetPasswordRequest,
    signIn,
    signOut,
    signUp,
    terminateAllSessions,
    verify,
} from "./requests";
import { UserContext } from "@/context/User";

export const useSignUp = () => {
    const navigate = useNavigate({ from: "/sign_up" });
    return useMutation({
        mutationFn: (input: SignUpInput) => signUp(input),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
                return;
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
                return;
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
                return;
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
                return;
            }
            toast.error("Failed to verify account");
        },
        onSuccess: async () => {
            toast.success("Account verified successfully");
            await navigate({ to: "/" });
        },
    });
};

export const useResetPassword = (token: string) => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (input: PasswordInputWithConfirmation) => resetPassword(input, token),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
                return;
            }
            toast.error("Failed to reset password");
        },
        onSuccess: async () => {
            toast.success("Password reset successfully");
            await navigate({ to: "/auth/sign_in" });
        },
    });
};

export const useSignOut = () => {
    const queryClient = new QueryClient();
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    return useMutation({
        mutationFn: async () => {
            await signOut();
            await queryClient.invalidateQueries({ queryKey: ["user"] });
            setUser(null);
            localStorage.removeItem("user");
            toast.success("Signed out successfully");
            await navigate({ to: "/auth/sign_in" });
        },
    });
};

export const useChangeEmail = () => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: changeEmail,
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
                return;
            }
            toast.error("Failed to change email");
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Email changed successfully");
        },
    });
};

export const useChangePassword = () => {
    const queryClient = new QueryClient();
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    return useMutation({
        mutationFn: changePassword,
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
                return;
            }
            toast.error("Failed to change password");
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["user"] });
            setUser(null);
            localStorage.removeItem("user");
            toast.success("Password changed successfully");
            await navigate({ to: "/auth/sign_in" });
        },
    });
};

export const useTerminateAllSessions = () => {
    const queryClient = new QueryClient();
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    return useMutation({
        mutationFn: async () => {
            await terminateAllSessions();
            await queryClient.invalidateQueries({ queryKey: ["user"] });
            setUser(null);
            localStorage.removeItem("user");
            toast.success("Terminated all sessions successfully");
            await navigate({ to: "/auth/sign_in" });
        },
    });
};

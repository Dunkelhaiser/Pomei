import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { SignUpInput } from "shared-types/auth";
import { MessageResponse } from "shared-types/utilSchema";
import { toast } from "sonner";
import { signUp } from "./requests";

export const useSignUp = (clearForm?: () => void) =>
    useMutation({
        mutationFn: (input: SignUpInput) => signUp(input),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
            }
        },
        onSuccess: () => {
            toast.success("Account created successfully");
            clearForm?.();
        },
    });

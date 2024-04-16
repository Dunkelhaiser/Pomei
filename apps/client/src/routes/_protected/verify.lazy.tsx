import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, createLazyFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { VerificationCodeInput, verificationCodeSchema } from "shared-types/auth";
import { useResendVerificationCode, useVerify } from "@/api/auth/hooks";
import { UserContext } from "@/context/User";
import Button from "@/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/ui/Form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/ui/OTP";

const Page = () => {
    const form = useForm<VerificationCodeInput>({
        resolver: zodResolver(verificationCodeSchema),
        defaultValues: {
            code: "",
        },
    });

    const { user } = useContext(UserContext);

    const resendVerificationCodeHandler = useResendVerificationCode();
    const verifyHandler = useVerify();

    const onSubmit = (values: VerificationCodeInput) => {
        verifyHandler.mutate(values);
    };

    if (user?.verifiedAt !== null) {
        return <Navigate to="/" />;
    }

    return (
        <Card
            className={`
                mx-auto w-full max-w-sm
                md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
            `}
        >
            <Helmet>
                <title>Pomei - Verify Account</title>
            </Helmet>
            <CardHeader>
                <CardTitle className="text-2xl">Verify Account</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={5} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>Enter the verification code sent to your email.</FormDescription>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={!form.formState.isValid}>
                            Submit
                        </Button>
                    </form>
                </Form>
                <p className="mt-4 text-center text-sm">
                    Didn&apos;t recive the code?{" "}
                    <Button
                        variant="link"
                        size="link"
                        type="button"
                        disabled={resendVerificationCodeHandler.isPending}
                        onClick={() => resendVerificationCodeHandler.mutate()}
                    >
                        Resend
                    </Button>
                </p>
            </CardContent>
        </Card>
    );
};

export const Route = createLazyFileRoute("/_protected/verify")({
    component: Page,
});

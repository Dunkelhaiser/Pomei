import { Link } from "@tanstack/react-router";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { User } from "shared-types/auth";
import { toast } from "sonner";
import { useGetUser } from "@/api/auth/hooks";
import Button from "@/ui/Button";

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isAuthorized: boolean;
    refetchUser: () => Promise<void>;
}

const iUserContextState = {
    user: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setUser: () => {},
    isAuthorized: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    refetchUser: async () => {},
};

export const UserContext = createContext<UserContextType>(iUserContextState);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const localUser = localStorage.getItem("user");
    const initUser = localUser ? (JSON.parse(localUser) as User) : null;
    const [user, setUser] = useState<User | null>(initUser);
    const isAuthorized = useMemo(() => Boolean(user?.id && user.email), [user]);

    const getUserHandler = useGetUser(isAuthorized);

    const refetchUser = useCallback(async () => {
        await getUserHandler.refetch();
        if (getUserHandler.isError) {
            localStorage.removeItem("user");
            setUser(null);
            toast.error("Session expired");
        }
        if (getUserHandler.data) {
            setUser(getUserHandler.data.user);
            localStorage.setItem("user", JSON.stringify(getUserHandler.data.user));
        }
    }, [getUserHandler]);

    useEffect(() => {
        if (getUserHandler.isError) {
            localStorage.removeItem("user");
            setUser(null);
            toast.error("Session expired");
        }
        if (getUserHandler.data) {
            setUser(getUserHandler.data.user);
            localStorage.setItem("user", JSON.stringify(getUserHandler.data.user));
        }
        if (getUserHandler.data?.user.verifiedAt === null) {
            toast.warning("Please verify your email", {
                important: true,
                description: "We have sent you an email with a verification code.",
                action: (
                    <Button variant="ghost" className="text-accent-foreground" size="sm" type="button" asChild>
                        <Link to="/verify">Verify</Link>
                    </Button>
                ),
                dismissible: false,
                duration: Infinity,
            });
        }
    }, [getUserHandler.data, getUserHandler.isError]);

    const values = useMemo(
        () => ({
            user,
            isAuthorized,
            setUser,
            refetchUser,
        }),
        [user, isAuthorized, refetchUser]
    );
    return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
